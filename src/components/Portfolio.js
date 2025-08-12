import React, { useEffect, useRef, useState } from 'react';
import './Portfolio.css';
import Footer from './Footer';
import { collection, getDocs, getDoc, doc } from '@firebase/firestore';
import { db } from '../admin/lib/firebase';



const Portfolio = ({ language }) => {
  // 월 이름을 영문으로 변환하는 함수
  const getMonthName = (month) => {
    const months = {
      '01': 'January',
      '02': 'February',
      '03': 'March',
      '04': 'April',
      '05': 'May',
      '06': 'June',
      '07': 'July',
      '08': 'August',
      '09': 'September',
      '10': 'October',
      '11': 'November',
      '12': 'December'
    };
    return months[month] || month;
  };
  const titleRef = useRef(null);
  const statusRef = useRef(null);
  const amountRef = useRef(null);
  const categoryRefs = useRef({});
  
  const [portfolioData, setPortfolioData] = useState({});
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [operationalStatus, setOperationalStatus] = useState('');
  const [updateDate, setUpdateDate] = useState({
    year: '',
    month: ''
  });

  // Firebase에서 카테고리 데이터 로드
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesDoc = await getDoc(doc(db, 'portfolio', 'categories'));
        if (categoriesDoc.exists()) {
          const categoriesData = categoriesDoc.data().categories || [];
          // order 필드로 정렬
          const sortedCategories = categoriesData.sort((a, b) => {
            const orderA = a.order !== undefined ? a.order : 999;
            const orderB = b.order !== undefined ? b.order : 999;
            return orderA - orderB;
          });
          setCategories(sortedCategories);
        }
      } catch (error) {
        console.error('카테고리 로딩 오류:', error);
        // 기본 카테고리 사용
        setCategories([
          { id: 'office', label: 'Office' },
          { id: 'logistics', label: 'Logistics' },
          { id: 'residence', label: 'Residence' },
          { id: 'hotel', label: 'Hotel' },
          { id: 'others', label: 'Others' }
        ]);
      }
    };

    loadCategories();
  }, []);

  // Firebase에서 포트폴리오 데이터 로드
  useEffect(() => {
    const loadPortfolioData = async () => {
      try {
        setLoading(true);
        if (!db) {
          console.log('Firebase가 초기화되지 않았습니다.');
          setLoading(false);
          return;
        }

        const querySnapshot = await getDocs(collection(db, 'portfolio'));
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // 카테고리별로 데이터 분류
        const categorizedData = {};
        categories.forEach(category => {
          categorizedData[category.id] = [];
        });

        console.log('Firebase에서 로드된 원본 데이터:', data);
        
        data.forEach(item => {
          // operational-status, total-amount, categories 등 특별한 문서는 제외
          if (item.id === 'operational-status' || item.id === 'total-amount' || item.id === 'categories') {
            console.log(`특별 문서 제외: ${item.id}`);
            return;
          }
          
          // 포트폴리오 항목이 아닌 경우 제외 (titleKo나 category가 없는 경우)
          if (!item.titleKo || !item.category) {
            console.log(`포트폴리오 항목이 아닌 문서 제외: ${item.id}`, { titleKo: item.titleKo, category: item.category });
            return;
          }
          
          const category = item.category || 'others';
          console.log(`아이템 ${item.id}: category=${category}, titleKo=${item.titleKo}, titleEn=${item.titleEn}`);
          if (categorizedData[category]) {
            categorizedData[category].push(item);
          } else {
            categorizedData.others.push(item);
          }
        });

        // 각 카테고리별로 order 필드로 정렬
        Object.keys(categorizedData).forEach(category => {
          categorizedData[category].sort((a, b) => {
            const orderA = a.order !== undefined ? a.order : 999;
            const orderB = b.order !== undefined ? b.order : 999;
            return orderA - orderB;
          });
          console.log(`${category} 카테고리 데이터:`, categorizedData[category]);
        });

        setPortfolioData(categorizedData);
      } catch (error) {
        console.error('포트폴리오 데이터 로딩 오류:', error);
        // 에러 발생 시 기본 데이터 사용
        setPortfolioData({
          office: [],
          logistics: [],
          residence: [],
          hotel: [],
          others: []
        });
      } finally {
        setLoading(false);
      }
    };

    // 운용현황 데이터 로드
    const loadOperationalStatus = async () => {
      try {
        if (!db) {
          console.log('Firebase가 초기화되지 않았습니다.');
          return;
        }

        const docRef = doc(db, 'portfolio', 'operational-status');
        const docSnap = await getDoc(docRef);
        
        console.log('운용현황 문서 존재 여부:', docSnap.exists());
        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log('운용현황 데이터:', data);
          // 언어에 따라 해당하는 필드 사용
          const statusValue = language === 'KO' ? data.ko : data.en;
          setOperationalStatus(statusValue || '');
          // 날짜 데이터도 로드
          if (data.updateDate) {
            setUpdateDate({
              year: data.updateDate.year || '',
              month: data.updateDate.month || ''
            });
          }
        } else {
          console.log('운용현황 문서가 존재하지 않습니다.');
        }
      } catch (error) {
        console.error('운용현황 데이터 로딩 오류:', error);
      }
    };

    if (categories.length > 0) {
      loadPortfolioData();
      loadOperationalStatus();
    }
  }, [language, categories]);

  // Intersection Observer 적용
  useEffect(() => {
    const observers = [];
    
    // 기본 요소들에 대한 Observer
    const elements = [
      { ref: titleRef },
      { ref: statusRef },
      { ref: amountRef }
    ];
    
    elements.forEach(({ ref }) => {
      if (ref.current) {
        const observer = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) {
            if (entry.target && !entry.target.classList.contains('animate-fade-in-up')) {
              entry.target.classList.add('animate-fade-in-up');
            }
          }
        }, { threshold: 0.3, rootMargin: '0px 0px -100px 0px' });
        
        observer.observe(ref.current);
        observers.push(observer);
      }
    });
    
    // 카테고리별 ref에 Intersection Observer 적용
    categories.forEach((category) => {
      if (categoryRefs.current[category.id]) {
        const observer = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) {
            if (entry.target && !entry.target.classList.contains('animate-fade-in-up')) {
              entry.target.classList.add('animate-fade-in-up');
            }
          }
        }, { threshold: 0.3, rootMargin: '0px 0px -100px 0px' });
        
        observer.observe(categoryRefs.current[category.id]);
        observers.push(observer);
      }
    });
    
    // Cleanup 함수
    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [categories]);

  // Fallback: 페이지 로드 후 일정 시간이 지나면 강제로 애니메이션 실행
  useEffect(() => {
    if (categories.length > 0 && !loading) {
      const fallbackTimer = setTimeout(() => {
        // 기본 요소들 애니메이션
        if (titleRef.current && !titleRef.current.classList.contains('animate-fade-in-up')) {
          titleRef.current.classList.add('animate-fade-in-up');
        }
        if (statusRef.current && !statusRef.current.classList.contains('animate-fade-in-up')) {
          statusRef.current.classList.add('animate-fade-in-up');
        }
        if (amountRef.current && !amountRef.current.classList.contains('animate-fade-in-up')) {
          amountRef.current.classList.add('animate-fade-in-up');
        }
        
        // 카테고리별 애니메이션
        categories.forEach((category) => {
          if (categoryRefs.current[category.id] && !categoryRefs.current[category.id].classList.contains('animate-fade-in-up')) {
            categoryRefs.current[category.id].classList.add('animate-fade-in-up');
          }
        });
      }, 0); // 2초 후 실행
      
      return () => clearTimeout(fallbackTimer);
    }
  }, [categories, loading]);

  const content = {
    EN: {
      title: "Portfolio",
      operationalStatus: "Asset Under Management",
      date: "June 2025",
      totalAmount: "USD 1,700 M",
      office: "Office",
      logistics: "Logistics",
      residence: "Residence",
      hotel: "Hotel",
      others: "Others",
      location: "Location",
      gfa: "GFA",
      floor: "Floor"
    },
    KO: {
      title: "Portfolio",
      operationalStatus: "운용현황",
      date: "June 2025",
      totalAmount: "2조 2,952억원",
      office: "Office",
      logistics: "Logistics",
      residence: "Residence",
      hotel: "Hotel",
      others: "Others",
      location: "Location",
      gfa: "GFA",
      floor: "Floor"
    }
  };

  const currentContent = content[language];

  return (
    <div className="portfolio-page">
      {/* Header Section */}
      <section className={`portfolio-header portfolio-header-${language.toLowerCase()}`}>
        <div className="portfolio-header-content">
          <h1 ref={titleRef} className={`portfolio-title portfolio-title-${language.toLowerCase()}`}>
            {currentContent.title}
          </h1>
        </div>
      </section>

      {/* Operational Status Section */}
      <section className={`portfolio-status-section portfolio-status-section-${language.toLowerCase()}`}>
        <div className="portfolio-container">
          <div className="portfolio-status-content">
            <div ref={statusRef} className={`portfolio-status-left portfolio-status-left-${language.toLowerCase()}`}>
              <div className="status-line"></div>
              <h2 className={`status-title status-title-${language.toLowerCase()}`}>{currentContent.operationalStatus}</h2>
            </div>
            <div ref={amountRef} className={`portfolio-status-right portfolio-status-right-${language.toLowerCase()}`}>
              <p className={`status-date status-date-${language.toLowerCase()}`}>
                {updateDate.year && updateDate.month 
                  ? `${getMonthName(updateDate.month)} ${updateDate.year}`
                  : currentContent.date
                }
              </p>
              <p className={`status-amount status-amount-${language.toLowerCase()}`}>
                {operationalStatus || currentContent.totalAmount}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Content */}
      <section className={`portfolio-content portfolio-content-${language.toLowerCase()}`}>
        <div className="portfolio-container">
          {/* 동적으로 카테고리별 섹션 생성 */}
          {categories.map((category) => {
            const categoryData = portfolioData[category.id] || [];
            if (categoryData.length === 0) return null; // 데이터가 없으면 섹션 생성하지 않음
            
            return (
              <div 
                key={category.id}
                ref={(el) => { categoryRefs.current[category.id] = el; }}
                className={`portfolio-section portfolio-section-${language.toLowerCase()}`}
              >
                <div className={`portfolio-section-header portfolio-section-header-${language.toLowerCase()}`}>
                  <div className="portfolio-section-line"></div>
                  <h2 className={`portfolio-section-title portfolio-section-title-${language.toLowerCase()}`}>
                    {category.label}
                  </h2>
                </div>
                <div className={`property-grid property-grid-${language.toLowerCase()}`}>
                  {categoryData.map((property, index) => (
                    <div key={index} className={`property-card property-card-${language.toLowerCase()}`}>
                      <div className="property-image">
                        <img src={property.image} alt={language === 'KO' ? property.titleKo : property.titleEn} />
                      </div>
                      <div className={`property-info property-info-${language.toLowerCase()}`}>
                        <div className={`property-header property-header-${language.toLowerCase()}`}>
                          <p className={`property-category property-category-${language.toLowerCase()}`}>
                            {language === 'KO' ? property.categoryKo : property.categoryEn}
                          </p>
                          <h3 className={`property-name property-name-${language.toLowerCase()}`}>
                            {language === 'KO' ? property.titleKo : property.titleEn}
                          </h3>
                        </div>
                        <div className={`property-details property-details-${language.toLowerCase()}`}>
                          <div className={`detail-item detail-item-${language.toLowerCase()}`}>
                            <span className={`detail-label detail-label-${language.toLowerCase()}`}>{currentContent.location}</span>
                            <span className={`detail-value detail-value-${language.toLowerCase()}`}>
                              {language === 'KO' ? property.locationKo : property.locationEn}
                            </span>
                          </div>
                          <div className={`detail-item detail-item-${language.toLowerCase()}`}>
                            <span className={`detail-label detail-label-${language.toLowerCase()}`}>{currentContent.gfa}</span>
                            <span className={`detail-value detail-value-${language.toLowerCase()}`}>{property.gfa}</span>
                          </div>
                          <div className={`detail-item detail-item-${language.toLowerCase()}`}>
                            <span className={`detail-label detail-label-${language.toLowerCase()}`}>{currentContent.floor}</span>
                            <span className={`detail-value detail-value-${language.toLowerCase()}`}>{property.floors}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Footer language={language} />
    </div>
  );
};

export default Portfolio;
