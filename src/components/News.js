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

const News = ({ language }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('제목');
  const [filteredNews, setFilteredNews] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  
  // Refs for animations
  const titleRef = useRef(null);
  const searchBarRef = useRef(null);
  const newsListRef = useRef(null);
  const paginationRef = useRef(null);

  // Apply intersection observer
  useIntersectionObserver(titleRef, { delay: 100 });
  useIntersectionObserver(searchBarRef, { delay: 200 });
  useIntersectionObserver(newsListRef, { delay: 300 });
  useIntersectionObserver(paginationRef, { delay: 400 });

  const content = {
    title: "소식",
    filterLabel: "제목",
    searchLabel: "검색어",
    newsItems: [
      { 
        id: 10, 
        title: "voco 서울명동호텔 편의점 입찰공고", 
        date: "2024-04-10",
        content: "voco 서울명동호텔 편의점 입찰공고입니다. 자세한 내용은 첨부파일을 참고해주시기 바랍니다. 입찰 관련 문의사항이 있으시면 언제든지 연락주시기 바랍니다."
      },
      { 
        id: 9, 
        title: "Gravity Asset Management 홈페이지 7월 오픈 예정", 
        date: "2024-04-10",
        content: "Gravity Asset Management 홈페이지가 7월에 오픈될 예정입니다. 새로운 홈페이지에서는 더욱 편리한 서비스를 제공할 예정이니 많은 관심 부탁드립니다."
      },
      { 
        id: 8, 
        title: "제목이 들어갑니다.", 
        date: "2024-04-10",
        content: "본문 내용이 들어갑니다. 자세한 내용은 추후 업데이트될 예정입니다."
      },
      { 
        id: 7, 
        title: "제목이 들어갑니다.", 
        date: "2024-04-10",
        content: "본문 내용이 들어갑니다. 자세한 내용은 추후 업데이트될 예정입니다."
      },
      { 
        id: 6, 
        title: "제목이 들어갑니다.", 
        date: "2024-04-10",
        content: "본문 내용이 들어갑니다. 자세한 내용은 추후 업데이트될 예정입니다."
      },
      { 
        id: 5, 
        title: "제목이 들어갑니다.", 
        date: "2024-04-10",
        content: "본문 내용이 들어갑니다. 자세한 내용은 추후 업데이트될 예정입니다."
      },
      { 
        id: 4, 
        title: "제목이 들어갑니다.", 
        date: "2024-04-10",
        content: "본문 내용이 들어갑니다. 자세한 내용은 추후 업데이트될 예정입니다."
      },
      { 
        id: 3, 
        title: "제목이 들어갑니다.", 
        date: "2024-04-10",
        content: "본문 내용이 들어갑니다. 자세한 내용은 추후 업데이트될 예정입니다."
      },
      { 
        id: 2, 
        title: "제목이 들어갑니다.", 
        date: "2024-04-10",
        content: "본문 내용이 들어갑니다. 자세한 내용은 추후 업데이트될 예정입니다."
      },
      { 
        id: 1, 
        title: "제목이 들어갑니다.", 
        date: "2024-04-10",
        content: "본문 내용이 들어갑니다. 자세한 내용은 추후 업데이트될 예정입니다."
      }
    ]
  };

  const currentContent = content;

    const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredNews([]);
      setIsSearching(false);
      setCurrentPage(1);
      return;
    }

    const filtered = content.newsItems.filter(item => {
      const searchLower = searchTerm.toLowerCase();
      
      switch (filterType) {
        case '제목':
          return item.title.toLowerCase().includes(searchLower);
        case '내용':
          return item.content.toLowerCase().includes(searchLower);
        default:
          return item.title.toLowerCase().includes(searchLower) || 
                 item.content.toLowerCase().includes(searchLower);
      }
    });

    setFilteredNews(filtered);
    setIsSearching(true);
    setCurrentPage(1);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setFilteredNews([]);
    setIsSearching(false);
    setCurrentPage(1);
  };

  const handleNewsClick = (news) => {
    navigate(`/news/${news.id}`);
  };

  // 페이지네이션 로직
  const itemsPerPage = 10;
  const displayItems = isSearching ? filteredNews : currentContent.newsItems;
  const totalPages = Math.ceil(displayItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = displayItems.slice(startIndex, endIndex);

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
                <span>검색 결과: {filteredNews.length}건</span>
              </div>
            )}

            {/* News List */}
            <div ref={newsListRef} className="news-list">
              {currentItems.length > 0 ? (
                currentItems.map((item, index) => (
                  <div 
                    key={item.id} 
                    className="news-item"
                    onClick={() => handleNewsClick(item)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="news-number">{startIndex + index + 1}</div>
                    <div className="news-title-text">{item.title}</div>
                    <div className="news-date">{item.date}</div>
                  </div>
                ))
              ) : (
                <div className="no-results">
                  {isSearching ? '검색 결과가 없습니다.' : '뉴스가 없습니다.'}
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

export default News; 