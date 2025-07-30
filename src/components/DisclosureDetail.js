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

const DisclosureDetail = ({ language }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Refs for animations
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  // Apply intersection observer
  useIntersectionObserver(titleRef, { delay: 100 });
  useIntersectionObserver(contentRef, { delay: 200 });

  const disclosureData = [
    { 
      id: 10, 
      title: "2024년 1분기 실적 공시", 
      date: "2024-04-15",
      content: "2024년 1분기 실적 공시입니다. 자세한 내용은 첨부파일을 참고해주시기 바랍니다. 문의사항이 있으시면 언제든지 연락주시기 바랍니다.",
      attachments: [
        { name: "2024년_1분기_실적_공시.pdf", size: "2.5MB", type: "pdf" },
        { name: "재무제표_2024_Q1.xlsx", size: "1.8MB", type: "excel" }
      ]
    },
    { 
      id: 9, 
      title: "주주총회 소집 공고", 
      date: "2024-04-12",
      content: "2024년 정기주주총회 소집 공고입니다. 일시, 장소 및 안건은 첨부파일을 참고해주시기 바랍니다.",
      attachments: [
        { name: "주주총회_소집공고.pdf", size: "1.2MB", type: "pdf" }
      ]
    },
    { 
      id: 8, 
      title: "대표이사 변경 공시", 
      date: "2024-04-10",
      content: "대표이사 변경에 관한 공시입니다. 자세한 내용은 첨부파일을 참고해주시기 바랍니다.",
      attachments: []
    },
    { 
      id: 7, 
      title: "2023년 사업보고서", 
      date: "2024-03-28",
      content: "2023년 사업보고서입니다. 자세한 내용은 첨부파일을 참고해주시기 바랍니다.",
      attachments: [
        { name: "2023년_사업보고서.pdf", size: "3.2MB", type: "pdf" }
      ]
    },
    { 
      id: 6, 
      title: "분기별 실적 공시", 
      date: "2024-03-15",
      content: "2023년 4분기 실적 공시입니다. 자세한 내용은 첨부파일을 참고해주시기 바랍니다.",
      attachments: [
        { name: "2023년_4분기_실적공시.pdf", size: "2.1MB", type: "pdf" }
      ]
    },
    { 
      id: 5, 
      title: "투자신탁 계약 변경 공시", 
      date: "2024-03-10",
      content: "투자신탁 계약 변경에 관한 공시입니다. 자세한 내용은 첨부파일을 참고해주시기 바랍니다.",
      attachments: []
    },
    { 
      id: 4, 
      title: "자기주식 취득 공시", 
      date: "2024-02-28",
      content: "자기주식 취득에 관한 공시입니다. 자세한 내용은 첨부파일을 참고해주시기 바랍니다.",
      attachments: []
    },
    { 
      id: 3, 
      title: "분기별 실적 공시", 
      date: "2024-02-15",
      content: "2023년 3분기 실적 공시입니다. 자세한 내용은 첨부파일을 참고해주시기 바랍니다.",
      attachments: []
    },
    { 
      id: 2, 
      title: "투자신탁 계약 해지 공시", 
      date: "2024-02-10",
      content: "투자신탁 계약 해지에 관한 공시입니다. 자세한 내용은 첨부파일을 참고해주시기 바랍니다.",
      attachments: []
    },
    { 
      id: 1, 
      title: "분기별 실적 공시", 
      date: "2024-01-15",
      content: "2023년 2분기 실적 공시입니다. 자세한 내용은 첨부파일을 참고해주시기 바랍니다.",
      attachments: []
    }
  ];

  const disclosure = disclosureData.find(item => item.id === parseInt(id));

  useEffect(() => {
    if (!disclosure) {
      navigate('/disclosure');
    }
  }, [disclosure, navigate]);

  if (!disclosure) {
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
            공시
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
                <h2 className="news-detail-article-title">{disclosure.title}</h2>
                <div className="news-detail-article-date">{disclosure.date}</div>
              </div>
              <div className="news-detail-article-content">
                {disclosure.content}
              </div>

              {/* Attachments */}
              {disclosure.attachments && disclosure.attachments.length > 0 && (
                <div className="news-detail-attachments">
                  <h3 className="attachments-title">첨부파일</h3>
                  <div className="attachments-list">
                    {disclosure.attachments.map((attachment, index) => (
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

export default DisclosureDetail; 