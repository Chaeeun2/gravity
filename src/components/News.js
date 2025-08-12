import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './News.css';
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

const News = ({ language }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('제목');
  const [filteredNews, setFilteredNews] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  // Refs for animations
  const titleRef = useRef(null);
  const searchBarRef = useRef(null);
  const newsListRef = useRef(null);
  const paginationRef = useRef(null);

  // 뉴스 데이터 로드
  useEffect(() => {
    loadNewsData();
  }, []);

  // newsData 상태 변경 감지
  useEffect(() => {
    console.log('newsData 상태 변경:', newsData);
  }, [newsData]);

  // loading 상태 변경 감지
  useEffect(() => {
    console.log('loading 상태 변경:', loading);
  }, [loading]);

  // Apply intersection observer
  useIntersectionObserver(titleRef, { delay: 100 });
  useIntersectionObserver(searchBarRef, { delay: 200 });
  useIntersectionObserver(newsListRef, { delay: 300 });
  useIntersectionObserver(paginationRef, { delay: 400 });

  // 뉴스 데이터 로드 함수
  const loadNewsData = async () => {
    try {
      setLoading(true);
      console.log('뉴스 데이터 로딩 시작...');
      const result = await dataService.getAllDocuments('news', 'createdAt', 'desc');
      console.log('뉴스 데이터 로딩 결과:', result);
      if (result.success) {
        setNewsData(result.data);
        console.log('뉴스 데이터 설정됨:', result.data);
      } else {
        setNewsData([]);
        console.log('뉴스 데이터 로딩 실패');
      }
    } catch (error) {
      console.error('뉴스 데이터 로딩 오류:', error);
      setNewsData([]);
    } finally {
      setLoading(false);
      console.log('뉴스 데이터 로딩 완료, loading:', false);
    }
  };

  // Handle window resize for mobile detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Format date based on screen size
  const formatDate = (timestamp) => {
    let date;
    if (timestamp?.toDate) {
      date = timestamp.toDate(); // Firestore Timestamp
    } else {
      date = new Date(timestamp);
    }
    
    if (isMobile) {
      // Mobile: MM/DD format
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${month}/${day}`;
    } else {
      // Desktop: Full date format
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
  };

  const content = {
    title: "소식",
    filterLabel: "제목",
    searchLabel: "검색어"
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

    const filtered = newsData.filter(item => {
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
  const displayItems = isSearching ? filteredNews : newsData;
  const totalPages = Math.ceil(displayItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = displayItems.slice(startIndex, endIndex);

  // 디버깅을 위한 로그
  console.log('displayItems:', displayItems);
  console.log('currentItems:', currentItems);
  console.log('loading:', loading);
  console.log('newsData length:', newsData.length);

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
              {loading ? (
                <div className="loading">로딩 중...</div>
              ) : currentItems.length > 0 ? (
                currentItems.map((item, index) => (
                  <div 
                    key={item.id} 
                    className="news-item"
                    onClick={() => handleNewsClick(item)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="news-number">{displayItems.length - (startIndex + index)}</div>
                    <div className="news-title-text">{item.title}</div>
                    <div className="news-date">{formatDate(item.createdAt)}</div>
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