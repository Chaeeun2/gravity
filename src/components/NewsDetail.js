import React, { useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './NewsDetail.css';
import Footer from './Footer';

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
  
  // Refs for animations
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  // Apply intersection observer
  useIntersectionObserver(titleRef, { delay: 100 });
  useIntersectionObserver(contentRef, { delay: 200 });

  const newsData = [
    { 
      id: 10, 
      title: "voco 서울명동호텔 편의점 입찰공고", 
      date: "2024-04-10",
      content: "voco 서울명동호텔 편의점 입찰공고입니다. 자세한 내용은 첨부파일을 참고해주시기 바랍니다. 입찰 관련 문의사항이 있으시면 언제든지 연락주시기 바랍니다.",
      attachments: [
        { name: "입찰공고서.pdf", size: "2.5MB", type: "pdf" },
        { name: "입찰규격서.hwp", size: "1.8MB", type: "hwp" },
        { name: "위치도.jpg", size: "850KB", type: "image" }
      ]
    },
    { 
      id: 9, 
      title: "Gravity Asset Management 홈페이지 7월 오픈 예정", 
      date: "2024-04-10",
      content: "Gravity Asset Management 홈페이지가 7월에 오픈될 예정입니다. 새로운 홈페이지에서는 더욱 편리한 서비스를 제공할 예정이니 많은 관심 부탁드립니다.",
      attachments: []
    },
    { 
      id: 8, 
      title: "제목이 들어갑니다.", 
      date: "2024-04-10",
      content: "본문 내용이 들어갑니다. 자세한 내용은 추후 업데이트될 예정입니다.",
      attachments: [
        { name: "첨부파일1.pdf", size: "1.2MB", type: "pdf" }
      ]
    },
    { 
      id: 7, 
      title: "제목이 들어갑니다.", 
      date: "2024-04-10",
      content: "본문 내용이 들어갑니다. 자세한 내용은 추후 업데이트될 예정입니다.",
      attachments: []
    },
    { 
      id: 6, 
      title: "제목이 들어갑니다.", 
      date: "2024-04-10",
      content: "본문 내용이 들어갑니다. 자세한 내용은 추후 업데이트될 예정입니다.",
      attachments: []
    },
    { 
      id: 5, 
      title: "제목이 들어갑니다.", 
      date: "2024-04-10",
      content: "본문 내용이 들어갑니다. 자세한 내용은 추후 업데이트될 예정입니다.",
      attachments: []
    },
    { 
      id: 4, 
      title: "제목이 들어갑니다.", 
      date: "2024-04-10",
      content: "본문 내용이 들어갑니다. 자세한 내용은 추후 업데이트될 예정입니다.",
      attachments: []
    },
    { 
      id: 3, 
      title: "제목이 들어갑니다.", 
      date: "2024-04-10",
      content: "본문 내용이 들어갑니다. 자세한 내용은 추후 업데이트될 예정입니다.",
      attachments: []
    },
    { 
      id: 2, 
      title: "제목이 들어갑니다.", 
      date: "2024-04-10",
      content: "본문 내용이 들어갑니다. 자세한 내용은 추후 업데이트될 예정입니다.",
      attachments: []
    },
    { 
      id: 1, 
      title: "제목이 들어갑니다.", 
      date: "2024-04-10",
      content: "본문 내용이 들어갑니다. 자세한 내용은 추후 업데이트될 예정입니다.",
      attachments: []
    }
  ];

  const news = newsData.find(item => item.id === parseInt(id));

  useEffect(() => {
    if (!news) {
      navigate('/news');
    }
  }, [news, navigate]);

  if (!news) {
    return null;
  }

  const handleDownload = (attachment) => {
    // 임시 다운로드 로직 - 실제로는 서버에서 파일을 가져와야 함
    console.log('Downloading:', attachment.name);
    alert(`${attachment.name} 파일 다운로드가 시작됩니다.`);
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
                <div className="news-detail-article-date">{news.date}</div>
              </div>
              <div className="news-detail-article-content">
                {news.content}
              </div>

              {/* Attachments */}
              {news.attachments && news.attachments.length > 0 && (
                <div className="news-detail-attachments">
                  <h3 className="attachments-title">첨부파일</h3>
                  <div className="attachments-list">
                    {news.attachments.map((attachment, index) => (
                      <div key={index} className="attachment-item">
                        <div className="attachment-info">
                          <div className="attachment-details">
                            <span className="attachment-name">{attachment.name}</span>
                          </div>
                        </div>
                        <button 
                          onClick={() => handleDownload(attachment)}
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
            </div>
          </div>
        </div>
      </section>

      <Footer language={language} />
    </div>
  );
};

export default NewsDetail; 