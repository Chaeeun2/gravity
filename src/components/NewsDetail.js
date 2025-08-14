import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../admin/lib/firebase';
import { imageService } from '../admin/services/imageService';
import Footer from './Footer';
import './NewsDetail.css';
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

const NewsDetail = ({ language }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Refs for animations
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  // Apply intersection observer
  useEffect(() => {
    if (!loading && news) {
      // 애니메이션 클래스 초기화
      if (titleRef.current) {
        titleRef.current.classList.remove('animate-fade-in-up');
      }
      if (contentRef.current) {
        contentRef.current.classList.remove('animate-fade-in-up');
      }

      // 데이터가 로드된 후 애니메이션 실행
      const timer1 = setTimeout(() => {
        if (titleRef.current) {
          titleRef.current.classList.add('animate-fade-in-up');
        }
      }, 200);

      const timer2 = setTimeout(() => {
        if (contentRef.current) {
          contentRef.current.classList.add('animate-fade-in-up');
        }
      }, 500);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [loading, news]);

  // 뉴스 데이터 로드
  useEffect(() => {
    const loadNewsData = async () => {
      try {
        setLoading(true);
        const result = await dataService.getAllDocuments('news', 'createdAt', 'desc');
        if (result.success) {
          const foundNews = result.data.find(item => item.id === id);
          if (foundNews) {
            setNews(foundNews);
          } else {
            console.error('뉴스를 찾을 수 없습니다:', id);
            navigate('/news');
          }
        } else {
          console.error('뉴스 데이터 로딩 실패');
          navigate('/news');
        }
      } catch (error) {
        console.error('뉴스 데이터 로딩 오류:', error);
        navigate('/news');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadNewsData();
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

  if (!news) {
    return null;
  }

  const handleDownload = async (file) => {
    // 파일 URL을 여러 가능한 필드에서 찾기
    const fileUrl = file.url || file.downloadUrl || file.fileUrl || file.path;
    
    if (!fileUrl) {
      console.error('파일 URL을 찾을 수 없습니다. 파일 데이터:', file);
      return;
    }

    try {
      
      
      // fetch로 파일을 가져와서 Blob으로 다운로드 (강제 다운로드)
      const response = await fetch(fileUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const blob = await response.blob();
      
      // Blob URL 생성
      const blobUrl = window.URL.createObjectURL(blob);
      
      // 다운로드 링크 생성 및 클릭
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = imageService.getOriginalFileName(file.name);
      link.style.display = 'none';
      
      document.body.appendChild(link);
      link.click();
      
      // 정리
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
      
      
    } catch (error) {
      console.error('첨부파일 다운로드 처리 오류:', error);
      
      // fallback: 직접 링크로 다운로드 시도
      try {

        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = imageService.getOriginalFileName(file.name);
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (fallbackError) {
        console.error('fallback 다운로드도 실패:', fallbackError);
        
        // 최종 fallback: 새 탭에서 열기
        try {
          window.open(fileUrl, '_blank');
        } catch (finalError) {
          console.error('최종 fallback도 실패:', finalError);
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
            소식
          </h1>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="news-detail-main">
        <div className="news-detail-container">
          <div className="news-detail-content">


            {/* News Detail */}
            <div ref={contentRef} className="news-detail-article">
              <div className="news-detail-header-info">
                <h2 className="news-detail-article-title">{news.title}</h2>
                <div className="news-detail-article-date">
                  {news.createdAt?.toDate ? 
                    news.createdAt.toDate().toLocaleDateString('ko-KR') : 
                    news.createdAt || '날짜 없음'
                  }
                </div>
              </div>
              <div className="news-detail-article-content">
                <div dangerouslySetInnerHTML={{ __html: news.content }} />
                
                {/* 이미지 표시 */}
                {news.images && news.images.length > 0 && (
                  <div className="news-detail-images">
                    {news.images.map((image, index) => (
                      <div key={index} className="news-detail-image">
                        <img src={image.url} alt={image.name || `이미지 ${index + 1}`} />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Attachments */}
              {news.files && news.files.length > 0 && (
                <div className="news-detail-attachments">
                  <h3 className="attachments-title">첨부파일</h3>
                  <div className="attachments-list">
                    {news.files.map((file, index) => {
              
                      return (
                        <div 
                          key={index} 
                          className="attachment-item"
                          onClick={() => handleDownload(file)}
                          style={{ cursor: 'pointer' }}
                        >
                          <div className="attachment-info">
                            <div className="attachment-details">
                              <span className="attachment-name">{file.name}</span>
                              {file.size && <span className="attachment-size">{file.size}</span>}
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
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer language={language} />
    </div>
  );
};

export default NewsDetail; 