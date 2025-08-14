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
  const dateRef = useRef(null);
  const operationalAmountRef = useRef(null);
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
        if (!db) {
          // 기본 카테고리 사용
          setCategories([
            { id: 'office', label: 'Office' },
            { id: 'logistics', label: 'Logistics' },
            { id: 'residence', label: 'Residence' },
            { id: 'hotel', label: 'Hotel' },
            { id: 'others', label: 'Others' }
          ]);
          return;
        }

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
        } else {
          // 기본 카테고리 사용
          setCategories([
            { id: 'office', label: 'Office' },
            { id: 'logistics', label: 'Logistics' },
            { id: 'residence', label: 'Residence' },
            { id: 'hotel', label: 'Hotel' },
            { id: 'others', label: 'Others' }
          ]);
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

  // Firebase에서 포트폴리오 데이터와 운용현황을 함께 로드
  useEffect(() => {
    const loadAllData = async () => {
      try {
        setLoading(true);
        if (!db) {
          setLoading(false);
          return;
        }

        // 포트폴리오 컬렉션의 모든 문서를 한 번에 가져오기
        const querySnapshot = await getDocs(collection(db, 'portfolio'));
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // 운용현황 데이터 추출
        const operationalStatusDoc = data.find(item => item.id === 'operational-status');
        if (operationalStatusDoc) {
          const statusValue = language === 'KO' ? operationalStatusDoc.ko : operationalStatusDoc.en;
          setOperationalStatus(statusValue || '');
          if (operationalStatusDoc.updateDate) {
            setUpdateDate({
              year: operationalStatusDoc.updateDate.year || '',
              month: operationalStatusDoc.updateDate.month || ''
            });
          }
        }

        // 카테고리별로 데이터 분류
        const categorizedData = {};
        categories.forEach(category => {
          categorizedData[category.id] = [];
        });

        data.forEach(item => {
          // operational-status, total-amount, categories 등 특별한 문서는 제외
          if (item.id === 'operational-status' || item.id === 'total-amount' || item.id === 'categories') {
            return;
          }
          
          // 포트폴리오 항목이 아닌 경우 제외 (titleKo나 category가 없는 경우)
          if (!item.titleKo || !item.category) {
            return;
          }
          
          const category = item.category || 'others';
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
        });

        setPortfolioData(categorizedData);
      } catch (error) {
        console.error('데이터 로딩 오류:', error);
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

    if (categories.length > 0) {
      loadAllData();
    }
  }, [language, categories]);

  // Intersection Observer 적용
  useEffect(() => {
    const observers = [];
    
    // 기본 요소들에 대한 Observer
    const elements = [
      { ref: titleRef },
      { ref: statusRef },
      { ref: amountRef },
      { ref: dateRef },
      { ref: operationalAmountRef }
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
        if (dateRef.current && !dateRef.current.classList.contains('animate-fade-in-up')) {
          dateRef.current.classList.add('animate-fade-in-up');
        }
        if (operationalAmountRef.current && !operationalAmountRef.current.classList.contains('animate-fade-in-up')) {
          operationalAmountRef.current.classList.add('animate-fade-in-up');
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
              <p ref={dateRef} className={`status-date status-date-${language.toLowerCase()}`}>
                {updateDate.year && updateDate.month 
                  ? `${getMonthName(updateDate.month)} ${updateDate.year}`
                  : ''
                }
              </p>
              <p ref={operationalAmountRef} className={`status-amount status-amount-${language.toLowerCase()}`}>
                {operationalStatus || ''}
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
