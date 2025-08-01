import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './News.css';
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

const Disclosure = ({ language }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('제목');
  const [filteredDisclosures, setFilteredDisclosures] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();
  
  // Refs for animations
  const titleRef = useRef(null);
  const searchBarRef = useRef(null);
  const disclosureListRef = useRef(null);
  const paginationRef = useRef(null);

  // Apply intersection observer
  useIntersectionObserver(titleRef, { delay: 100 });
  useIntersectionObserver(searchBarRef, { delay: 200 });
  useIntersectionObserver(disclosureListRef, { delay: 300 });
  useIntersectionObserver(paginationRef, { delay: 400 });

  // Handle window resize for mobile detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Format date based on screen size
  const formatDate = (dateString) => {
    if (isMobile) {
      // Mobile: MM/DD format
      const date = new Date(dateString);
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${month}/${day}`;
    } else {
      // Desktop: Full date format
      return dateString;
    }
  };

  const content = {
    title: "공시",
    filterLabel: "제목",
    searchLabel: "검색어",
    disclosureItems: [
      { 
        id: 10, 
        title: "2024년 1분기 실적 공시", 
        date: "2024-04-15",
        content: "2024년 1분기 실적 공시입니다. 자세한 내용은 첨부파일을 참고해주시기 바랍니다. 문의사항이 있으시면 언제든지 연락주시기 바랍니다."
      },
      { 
        id: 9, 
        title: "주주총회 소집 공고", 
        date: "2024-04-12",
        content: "2024년 정기주주총회 소집 공고입니다. 일시, 장소 및 안건은 첨부파일을 참고해주시기 바랍니다."
      },
      { 
        id: 8, 
        title: "대표이사 변경 공시", 
        date: "2024-04-10",
        content: "대표이사 변경에 관한 공시입니다. 자세한 내용은 첨부파일을 참고해주시기 바랍니다."
      },
      { 
        id: 7, 
        title: "2023년 사업보고서", 
        date: "2024-03-28",
        content: "2023년 사업보고서입니다. 자세한 내용은 첨부파일을 참고해주시기 바랍니다."
      },
      { 
        id: 6, 
        title: "분기별 실적 공시", 
        date: "2024-03-15",
        content: "2023년 4분기 실적 공시입니다. 자세한 내용은 첨부파일을 참고해주시기 바랍니다."
      },
      { 
        id: 5, 
        title: "투자신탁 계약 변경 공시", 
        date: "2024-03-10",
        content: "투자신탁 계약 변경에 관한 공시입니다. 자세한 내용은 첨부파일을 참고해주시기 바랍니다."
      },
      { 
        id: 4, 
        title: "자기주식 취득 공시", 
        date: "2024-02-28",
        content: "자기주식 취득에 관한 공시입니다. 자세한 내용은 첨부파일을 참고해주시기 바랍니다."
      },
      { 
        id: 3, 
        title: "분기별 실적 공시", 
        date: "2024-02-15",
        content: "2023년 3분기 실적 공시입니다. 자세한 내용은 첨부파일을 참고해주시기 바랍니다."
      },
      { 
        id: 2, 
        title: "투자신탁 계약 해지 공시", 
        date: "2024-02-10",
        content: "투자신탁 계약 해지에 관한 공시입니다. 자세한 내용은 첨부파일을 참고해주시기 바랍니다."
      },
      { 
        id: 1, 
        title: "분기별 실적 공시", 
        date: "2024-01-15",
        content: "2023년 2분기 실적 공시입니다. 자세한 내용은 첨부파일을 참고해주시기 바랍니다."
      }
    ]
  };

  const currentContent = content;

  // 페이지네이션 로직
  const itemsPerPage = 10;
  const displayItems = isSearching ? filteredDisclosures : currentContent.disclosureItems;
  const totalPages = Math.ceil(displayItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = displayItems.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredDisclosures([]);
      setIsSearching(false);
      return;
    }

    const filtered = currentContent.disclosureItems.filter(item => {
      if (filterType === '제목') {
        return item.title.toLowerCase().includes(searchTerm.toLowerCase());
      } else if (filterType === '내용') {
        return item.content.toLowerCase().includes(searchTerm.toLowerCase());
      }
      return false;
    });

    setFilteredDisclosures(filtered);
    setIsSearching(true);
    setCurrentPage(1);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setFilteredDisclosures([]);
    setIsSearching(false);
    setCurrentPage(1);
  };

  const handleDisclosureClick = (disclosure) => {
    navigate(`/disclosure/${disclosure.id}`, { 
      state: { 
        disclosure,
        language 
      } 
    });
  };

  // 페이지 번호 배열 생성
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
      }
    }
    
    return pages;
  };



    return (
    <div className="news-page">
      {/* Header Section */}
      <section className="news-header">
        <div className="news-header-content">
          <h1 ref={titleRef} className="news-title">
            {currentContent.title}
          </h1>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="news-main">
        <div className="news-container">
          <div className="news-content">
            {/* Search/Filter Bar */}
            <div ref={searchBarRef} className="search-filter-bar">
              <div className="filter-dropdown">
                <select 
                  value={filterType} 
                  onChange={(e) => setFilterType(e.target.value)}
                  className="filter-select"
                >
                  <option value="제목">제목</option>
                  <option value="내용">내용</option>
                </select>
              </div>
              <div className="search-input-container">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder={currentContent.searchLabel}
                  className="search-input"
                />
                <button onClick={handleSearch} className="search-button">
                  <svg width="24" height="24" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" strokeWidth="3.5" stroke="currentColor" fill="none">
                    <circle cx="27.31" cy="25.74" r="18.1"></circle>
                    <line x1="39.58" y1="39.04" x2="56.14" y2="57"></line>
                  </svg>
                </button>
              </div>
            </div>

            {/* Search Results Info */}
            {isSearching && (
              <div className="search-results-info">
                <span>검색 결과: {filteredDisclosures.length}건</span>
              </div>
            )}

            {/* News List */}
            <div ref={disclosureListRef} className="news-list">
              {currentItems.length > 0 ? (
                currentItems.map((item, index) => (
                  <div 
                    key={item.id} 
                    className="news-item"
                    onClick={() => handleDisclosureClick(item)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="news-number">{startIndex + index + 1}</div>
                    <div className="news-title-text">{item.title}</div>
                    <div className="news-date">{formatDate(item.date)}</div>
                  </div>
                ))
              ) : (
                <div className="no-results">
                  {isSearching ? '검색 결과가 없습니다.' : '공시가 없습니다.'}
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div ref={paginationRef} className="pagination">
                <button 
                  className="pagination-arrow"
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 20" style={{ transform: 'rotate(180deg)' }}>
                    <path fill="currentColor" d="M1.39 0L0 1.406 8.261 10.013 7.38 10.931 7.385 10.926 0.045 18.573 1.414 20C3.443 17.887 9.107 11.986 11 10.013 9.594 8.547 10.965 9.976 1.39 0Z"/>
                  </svg>
                </button>
                {getPageNumbers().map(page => (
                  <button
                    key={page}
                    className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                ))}
                <button 
                  className="pagination-arrow"
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 20">
                    <path fill="currentColor" d="M1.39 0L0 1.406 8.261 10.013 7.38 10.931 7.385 10.926 0.045 18.573 1.414 20C3.443 17.887 9.107 11.986 11 10.013 9.594 8.547 10.965 9.976 1.39 0Z"/>
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer language={language} />
    </div>
  );
};

export default Disclosure; 