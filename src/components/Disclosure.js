import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../admin/lib/firebase';
import './News.css';
import Footer from './Footer';
import { formatForDisplay, formatMobileDate, sortWithImportant, getDisplayDate } from '../utils/dateUtils';



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

  // Setup IntersectionObserver for animations - Safari compatible
  useEffect(() => {
    const observers = [];
    const elements = [
      { ref: titleRef, delay: 100 },
      { ref: searchBarRef, delay: 200 },
      { ref: disclosureListRef, delay: 300 }
    ];

    elements.forEach(({ ref, delay }) => {
      if (ref.current) {
        // Safari 호환성을 위해 초기화
        ref.current.classList.remove('animate-fade-in-up');
        
        const element = ref.current;
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animate-fade-in-up')) {
              setTimeout(() => {
                if (entry.target && !entry.target.classList.contains('animate-fade-in-up')) {
                  entry.target.classList.add('animate-fade-in-up');
                  observer.unobserve(entry.target); // Safari에서 중요: 관찰 중지
                }
              }, delay);
            }
          });
        }, {
          threshold: 0.01, // Safari에서 더 낮은 threshold 사용
          rootMargin: '0px 0px -50px 0px'
        });

        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

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
        // 모든 데이터를 가져오고 클라이언트에서 정렬 (순서 없이)
        const q = query(collection(db, 'disclosure'));
        const querySnapshot = await getDocs(q);
        const disclosures = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        // 중요공지 우선, 그 다음 publishDate 우선으로 정렬
        const sortedData = sortWithImportant(disclosures);
        
        console.log('Sorted disclosure data:', sortedData.map(item => ({
          id: item.id,
          title: item.title,
          publishDate: item.publishDate,
          createdAt: item.createdAt
        })));
        
        setDisclosureList(sortedData);
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

  // Format date based on screen size (publishDate 우선 사용)
  const formatDate = (disclosureItem) => {
    const timestamp = getDisplayDate(disclosureItem);
    if (!timestamp) return '';
    
    if (isMobile) {
      return formatMobileDate(timestamp);
    } else {
      // Desktop: Korean format without time
      return formatForDisplay(timestamp, { includeTime: false });
    }
  };

  // 페이지네이션 로직 (중요공지는 모든 페이지에 표시)
  const itemsPerPage = 10;
  const displayItems = isSearching ? filteredDisclosures : disclosureList;
  
  // 중요공지와 일반 게시물 분리
  const importantItems = displayItems.filter(item => item.isImportant);
  const normalItems = displayItems.filter(item => !item.isImportant);
  
  // 일반 게시물 기준으로 페이지네이션 계산
  const normalItemsPerPage = itemsPerPage - importantItems.length;
  const totalPages = normalItemsPerPage > 0 ? Math.ceil(normalItems.length / normalItemsPerPage) : 1;
  const startIndex = (currentPage - 1) * normalItemsPerPage;
  const endIndex = startIndex + normalItemsPerPage;
  const currentNormalItems = normalItems.slice(startIndex, endIndex);
  
  // 중요공지를 항상 최상단에, 그 다음 페이지별 일반 게시물
  const currentItems = [...importantItems, ...currentNormalItems];

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
                currentItems.map((item, index) => {
                  // 중요공지는 '공지'로 표시, 일반 게시물은 번호 표시
                  let itemNumber = '';
                  if (item.isImportant) {
                    itemNumber = '공지';
                  } else {
                    const normalItemIndex = index - importantItems.length;
                    itemNumber = normalItems.length - (startIndex + normalItemIndex);
                  }
                  
                  return (
                    <div 
                      key={item.id} 
                      className={`news-item ${item.isImportant ? 'news-item-important' : ''}`}
                      onClick={() => handleDisclosureClick(item)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="news-number">{itemNumber}</div>
                      <div className="news-title-text">{item.title}</div>
                      <div className="news-date">{formatDate(item)}</div>
                    </div>
                  );
                })
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