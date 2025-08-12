import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../admin/lib/firebase';
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
  const [disclosureList, setDisclosureList] = useState([]);
  const [loading, setLoading] = useState(true);
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

  // Apply intersection observer
  useIntersectionObserver(titleRef, { delay: 100 });
  useIntersectionObserver(searchBarRef, { delay: 200 });
  useIntersectionObserver(disclosureListRef, { delay: 300 });

  // Handle window resize for mobile detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Firebase에서 공시 데이터 로드
  useEffect(() => {
    const loadDisclosures = async () => {
      try {
        setLoading(true);
        const q = query(collection(db, 'disclosure'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const disclosures = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setDisclosureList(disclosures);
      } catch (error) {
        console.error('공시 데이터 로딩 오류:', error);
        setDisclosureList([]);
      } finally {
        setLoading(false);
      }
    };

    if (db) {
      loadDisclosures();
    }
  }, []);

  // Format date based on screen size
  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    
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
      return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
    }
  };

  // 페이지네이션 로직
  const itemsPerPage = 10;
  const displayItems = isSearching ? filteredDisclosures : disclosureList;
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

    const filtered = disclosureList.filter(item => {
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
            공시
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
                  placeholder="검색어"
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
              {loading ? (
                <div className="loading-message"></div>
              ) : currentItems.length > 0 ? (
                currentItems.map((item, index) => (
                  <div 
                    key={item.id} 
                    className="news-item"
                    onClick={() => handleDisclosureClick(item)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="news-number">{displayItems.length - (startIndex + index)}</div>
                    <div className="news-title-text">{item.title}</div>
                    <div className="news-date">{formatDate(item.createdAt)}</div>
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
              <div className="pagination">
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