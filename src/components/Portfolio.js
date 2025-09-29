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
  const [portfolioLabels, setPortfolioLabels] = useState([
    { id: 'location', label: 'Location' },
    { id: 'gfa', label: 'GFA' },
    { id: 'floor', label: 'Floor' }
  ]);

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
    loadPortfolioLabels();
  }, []);

  // Firebase에서 포트폴리오 라벨 데이터 로드
  const loadPortfolioLabels = async () => {
    try {
      if (!db) {
        return; // 기본 라벨 사용
      }

      const labelsDoc = await getDoc(doc(db, 'portfolio', 'labels'));
      if (labelsDoc.exists()) {
        const labelsData = labelsDoc.data();
        if (labelsData.labels && Array.isArray(labelsData.labels)) {
          setPortfolioLabels(labelsData.labels);
        }
      }
          } catch (error) {
        // 포트폴리오 라벨 로딩 오류 처리
      // 기본 라벨 사용
    }
  };

  // Firebase에서 포트폴리오 데이터와 운용현황을 함께 로드
  useEffect(() => {
    const loadAllData = async () => {
      try {
        setLoading(true);
        if (!db) {
          setLoading(false);
          return;
        }

        // 포트폴리오 컬렉션의 모든 문서를 한 번에 가져오기 (캐시 방지)
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
          // 데이터 로딩 오류 처리
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

  // Safari detection
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  // Animation for basic elements - different approach for Safari
  useEffect(() => {
    const elements = [
      { ref: titleRef, delay: 100 },
      { ref: statusRef, delay: 200 },
      { ref: dateRef, delay: 300 },
      { ref: operationalAmountRef, delay: 400 }
    ];

    if (isSafari) {
      // Safari: Simple timeout-based animation
      elements.forEach(({ ref, delay }) => {
        if (ref.current) {
          const element = ref.current;
          element.style.opacity = '0';
          element.style.transform = 'translateY(30px)';
          element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
          
          setTimeout(() => {
            if (element) {
              element.style.opacity = '1';
              element.style.transform = 'translateY(0)';
            }
          }, delay);
        }
      });
    } else {
      // Other browsers: Set initial state then add animation class
      elements.forEach(({ ref, delay }) => {
        if (ref.current) {
          const element = ref.current;
          element.classList.remove('animate-fade-in-up');
          element.style.opacity = '0';
          element.style.transform = 'translateY(30px)';
          
          setTimeout(() => {
            if (element) {
              element.classList.add('animate-fade-in-up');
            }
          }, delay);
        }
      });
    }
  }, [isSafari, language]); // 언어 변경 시에도 애니메이션 재실행

  // Animation for category elements - different approach for Safari
  useEffect(() => {
    if (categories.length === 0) return;

    const timer = setTimeout(() => {
      categories.forEach((category, index) => {
        if (categoryRefs.current[category.id]) {
          const element = categoryRefs.current[category.id];
          
          if (isSafari) {
            // Safari: Simple timeout-based animation
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            
            setTimeout(() => {
              if (element) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
              }
            }, 500 + (index * 100));
          } else {
            // Other browsers: Use IntersectionObserver
            element.classList.remove('animate-fade-in-up');
            
            const observer = new IntersectionObserver(([entry]) => {
              if (entry.isIntersecting) {
                setTimeout(() => {
                  entry.target.classList.add('animate-fade-in-up');
                }, index * 100);
                observer.disconnect();
              }
            }, {
            threshold: 0.01,
            rootMargin: '0px 0px -50px 0px'
          });
            
            observer.observe(element);
          }
        }
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [categories, isSafari, language]); // 언어 변경 시에도 애니메이션 재실행

  // 라벨 변경 시 content 객체 재생성을 위한 useEffect
  useEffect(() => {
    // 포트폴리오 라벨이 변경될 때마다 컴포넌트가 다시 렌더링됩니다
  }, [portfolioLabels]);

  const content = {
    EN: {
      title: "Portfolio",
      operationalStatus: "Asset Under Management",
      office: "Office",
      logistics: "Logistics",
      residence: "Residence",
      hotel: "Hotel",
      others: "Others"
    },
    KO: {
      title: "Portfolio",
      operationalStatus: "운용현황",
      office: "Office",
      logistics: "Logistics",
      residence: "Residence",
      hotel: "Hotel",
      others: "Others"
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
            <div className={`portfolio-status-right portfolio-status-right-${language.toLowerCase()}`}>
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
                  {categoryData.map((property, index) => {
                    // 필수 정보 체크 (제목이 있는지 확인)
                    const hasTitle = (language === 'KO' ? property.titleKo : property.titleEn);
                    if (!hasTitle || hasTitle.trim() === '') {
                      return null; // 제목이 없으면 카드 전체를 표시하지 않음
                    }

                    return (
                    <div key={index} className={`property-card property-card-${language.toLowerCase()}`}>
                      <div className="property-image">
                        {property.image ? (
                          <img src={property.image} alt={language === 'KO' ? property.titleKo : property.titleEn} />
                        ) : (
                          <div className="no-image-placeholder">
                            <span>No Image</span>
                          </div>
                        )}
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
                          {portfolioLabels.map((labelItem) => {
                            // 라벨 ID에 따라 적절한 데이터 필드 매핑
                            let dataValue = '';
                            if (labelItem.id === 'location') {
                              dataValue = language === 'KO' ? property.locationKo : property.locationEn;
                            } else if (labelItem.id === 'gfa') {
                              dataValue = language === 'KO' ? (property.gfaKo || property.gfa) : (property.gfaEn || property.gfa);
                            } else if (labelItem.id === 'floor') {
                              dataValue = language === 'KO' ? (property.floorsKo || property.floors) : (property.floorsEn || property.floors);
                            } else {
                              // 동적으로 추가된 라벨의 경우 Ko/En 구분하여 데이터 가져오기
                              const koField = `${labelItem.id}Ko`;
                              const enField = `${labelItem.id}En`;
                              dataValue = language === 'KO' ? 
                                (property[koField] || property[labelItem.id] || '') :
                                (property[enField] || property[labelItem.id] || '');
                            }

                            // 데이터가 없거나 공백만 있으면 해당 라벨을 표시하지 않음
                            if (!dataValue || dataValue.toString().trim() === '' || dataValue === null || dataValue === undefined) {
                              return null;
                            }

                            return (
                              <div key={labelItem.id} className={`detail-item detail-item-${language.toLowerCase()}`}>
                                <span className={`detail-label detail-label-${language.toLowerCase()}`}>
                                  {labelItem.label}
                                </span>
                                <span className={`detail-value detail-value-${language.toLowerCase()}`}>
                                  {dataValue}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    );
                  })}
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
