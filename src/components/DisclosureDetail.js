import React, { useRef, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { imageService } from '../admin/services/imageService';
import './NewsDetail.css';
import Footer from './Footer';
import { dataService } from '../admin/services/dataService';

const useIntersectionObserver = (ref, options = {}) => {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            element.classList.add('animate-fade-in-up');
          }, options.delay || 0);
        }
      },
      {
        threshold: 0.1,
        ...options
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [ref, options.delay]);
};

const DisclosureDetail = ({ language }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [disclosure, setDisclosure] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Refs for animations
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  // Safari detection
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  // Animation setup - different approach for Safari
  useEffect(() => {
    if (!loading && disclosure) {
      const elements = [
        { ref: titleRef, delay: 200 },
        { ref: contentRef, delay: 500 }
      ];

      if (isSafari) {
        // Safari: Simple timeout-based animation
        elements.forEach(({ ref, delay }) => {
          if (ref.current) {
            const element = ref.current;
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            
            setTimeout(() => {
              if (element) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
              }
            }, delay);
          }
        });
      } else {
        // Other browsers: Use CSS animation class
        elements.forEach(({ ref, delay }) => {
          if (ref.current) {
            ref.current.classList.remove('animate-fade-in-up');
            
            const timer = setTimeout(() => {
              if (ref.current) {
                ref.current.classList.add('animate-fade-in-up');
              }
            }, delay);

            return () => clearTimeout(timer);
          }
        });
      }
    }
  }, [loading, disclosure, isSafari]);

  // 공시 데이터 로드
  useEffect(() => {
    const loadDisclosureData = async () => {
      try {
        setLoading(true);
        const result = await dataService.getAllDocuments('disclosure', 'createdAt', 'desc');
        if (result.success) {
          const foundDisclosure = result.data.find(item => item.id === id);
          if (foundDisclosure) {
            setDisclosure(foundDisclosure);
          } else {
            navigate('/disclosure');
          }
        } else {
          navigate('/disclosure');
        }
      } catch (error) {
        navigate('/disclosure');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadDisclosureData();
    }
  }, [id, navigate]);

  // 로딩 중일 때 표시
  if (loading) {
    return (
      <div className="news-detail-page">
        <div style={{ padding: '100px', textAlign: 'center', fontSize: '2rem' }}>
        </div>
      </div>
    );
  }

  if (!disclosure) {
    return null;
  }

  const handleDownload = async (file) => {
    // 파일 URL을 여러 가능한 필드에서 찾기
    const fileUrl = file.url || file.downloadUrl || file.fileUrl || file.path;
    
    if (!fileUrl) {
      return;
    }

    // 모바일 기기 감지
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const fileName = imageService.getOriginalFileName(file.name);

    try {
      if (isMobile) {
        // 모바일: 새 창에서 열기 (브라우저가 다운로드 옵션 제공)
        const newWindow = window.open(fileUrl, '_blank');
        
        // iOS Safari의 경우 추가 처리
        if (isIOS && newWindow) {
          setTimeout(() => {
            if (newWindow && !newWindow.closed) {
              // 팝업이 차단되지 않았으면 아무것도 하지 않음
            } else {
              // 팝업이 차단된 경우 현재 창에서 열기
              window.location.href = fileUrl;
            }
          }, 100);
        }
      } else {
        // PC: 기존 blob 다운로드 방식
        const response = await fetch(fileUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = fileName;
        link.style.display = 'none';
        
        document.body.appendChild(link);
        link.click();
        
        // 정리
        setTimeout(() => {
          document.body.removeChild(link);
          window.URL.revokeObjectURL(blobUrl);
        }, 100);
      }
    } catch (error) {
      
      // Fallback: 새 탭에서 열기
      try {
        window.open(fileUrl, '_blank');
      } catch (fallbackError) {
        
        // 최종 fallback: 새 탭에서 열기
        try {
          window.open(fileUrl, '_blank');
        } catch (finalError) {
        }
      }
    }
  };

  return (
    <div className="news-detail-page">
      {/* Header Section */}
      <section className="news-detail-header">
        <div className="news-detail-header-content">
          <h1 ref={titleRef} className="news-detail-title">
            공시
          </h1>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="news-detail-main">
        <div className="news-detail-container">
          <div className="news-detail-content">

            {/* Disclosure Detail */}
            <div ref={contentRef} className="news-detail-article">
              <div className="news-detail-header-info">
                <h2 className="news-detail-article-title">{disclosure.title}</h2>
                <div className="news-detail-article-date">
                  {(() => {
                    const timestamp = disclosure.publishDate || disclosure.createdAt;
                    if (timestamp?.toDate) {
                      return timestamp.toDate().toLocaleDateString('ko-KR');
                    } else if (timestamp) {
                      return new Date(timestamp).toLocaleDateString('ko-KR');
                    }
                    return '날짜 없음';
                  })()
                  }
                </div>
              </div>
                            {/* 첨부파일 */}
              {disclosure.files && disclosure.files.length > 0 && (
                <div className="news-detail-attachments">
                  <div className="attachments-list">
                    {disclosure.files.map((file, index) => (
                      <div 
                        key={index} 
                        className="attachment-item"
                        onClick={() => handleDownload(file)}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="attachment-info">
                          <div className="attachment-details">
                            <span className="attachment-name">{file.name}</span>
                          </div>
                        </div>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation(); // 부모 클릭 이벤트 방지
                            handleDownload(file);
                          }}
                          className="download-button"
                        >
                          <svg viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.5 17V19.5H5.5V17M17.5 11L12.5 16L7.5 11M12.5 16V4.99998" stroke="currentColor" strokeWidth="1.2"/>
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="news-detail-article-content">
                <div dangerouslySetInnerHTML={{ __html: disclosure.content }} />
                
                {/* 이미지 표시 */}
                {disclosure.images && disclosure.images.length > 0 && (
                  <div className="news-detail-images">
                    {disclosure.images.map((image, index) => (
                      <div key={index} className="news-detail-image">
                        <img src={image.url} alt={image.name || `이미지 ${index + 1}`} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer language={language} />
    </div>
  );
};

export default DisclosureDetail; 