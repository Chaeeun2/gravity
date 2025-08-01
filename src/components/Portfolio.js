import React, { useEffect, useRef } from 'react';
import './Portfolio.css';
import Footer from './Footer';

// Intersection Observer를 사용한 애니메이션 훅
const useIntersectionObserver = (ref, options = {}) => {
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const delay = options.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('animate-fade-in-up');
        }, delay);
      }
    }, {
      threshold: 0.1,
      ...options
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);
};

const Portfolio = ({ language }) => {
  const titleRef = useRef(null);
  const statusRef = useRef(null);
  const amountRef = useRef(null);
  const officeRef = useRef(null);
  const logisticsRef = useRef(null);
  const residenceRef = useRef(null);
  const hotelRef = useRef(null);
  const othersRef = useRef(null);

  // Intersection Observer 적용
  useIntersectionObserver(titleRef, { delay: 100 });
  useIntersectionObserver(statusRef, { delay: 300 });
  useIntersectionObserver(amountRef, { delay: 500 });
  useIntersectionObserver(officeRef, { delay: 700 });
  useIntersectionObserver(logisticsRef, { delay: 100 });
  useIntersectionObserver(residenceRef, { delay: 100 });
  useIntersectionObserver(hotelRef, { delay: 100 });
  useIntersectionObserver(othersRef, { delay: 100 });

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

  const portfolioData = {
    office: [
      {
        name: "분당 티맥스R&D센터",
        nameEn: "Bundang T-Max R&D Center",
        location: "경기도 분당구",
        locationEn: "Bundang, Gyeonggi-do",
        gfa: "33,011 sqm",
        floor: "5F/B4",
        image: "/resource/Office_1.jpg",
        category: "Gravity General Private Real Estate Investment Company No. 4",
        categoryKo: "그래비티일반사모부동산투자회사제4호"
      },
      {
        name: "상암 한샘빌딩",
        nameEn: "Sangam Hanssem Building",
        location: "서울특별시 마포구",
        locationEn: "Mapo, Seoul",
        gfa: "66,648 sqm",
        floor: "22F/B5",
        image: "/resource/Office_2.jpg",
        category: "Gravity General Private Real Estate Investment Company No. 8",
        categoryKo: "그래비티일반사모부동산투자회사제8호"
      },
      {
        name: "강남파이낸스플라자",
        nameEn: "Gangnam Finance Plaza",
        location: "서울특별시 강남구",
        locationEn: "Gangnam, Seoul",
        gfa: "24,179 sqm",
        floor: "20F/B6",
        image: "/resource/Office_3.jpg",
        category: "Gravity General Private Real Estate Investment Trust No. 11",
        categoryKo: "그래비티일반사모부동산투자신탁제11호"
      }
    ],
    logistics: [
      {
        name: "여주 은봉리 물류센터",
        nameEn: "Yeoju Eunbong-ri Logistics Center",
        location: "경기도 여주시",
        locationEn: "Yeoju, Gyeonggi-do",
        gfa: "42,975 sqm",
        floor: "4F/B2",
        image: "/resource/Logistics_1.jpg",
        category: "Gravity No. 1 Yeoju Logistics PFV Co., Ltd",
        categoryKo: "그래비티1호여주물류피에프브이"
      },
      {
        name: "북천안 물류센터 선매입",
        nameEn: "North Cheonan Logistics Center Forward Purchase",
        location: "충청남도 천안시",
        locationEn: "Cheonan, Chungcheongnam-do",
        gfa: "142,598 sqm",
        floor: "4F/B1",
        image: "/resource/Logistics_2.jpg",
        category: "Gravity General Private Real Estate Investment Company No. 5",
        categoryKo: "그래비티일반사모부동산투자회사제5호"
      },
      {
        name: "부천 내동 물류센터 선매입",
        nameEn: "Bucheon Naedong Logistics Center Forward Purchase",
        location: "경기도 부천시",
        locationEn: "Bucheon, Gyeonggi-do",
        gfa: "82,645 sqm",
        floor: "12F/B2",
        image: "/resource/Logistics_3.jpg",
        category: "Gravity General Private Real Estate Investment Company No. 7",
        categoryKo: "그래비티일반사모부동산투자회사제7호"
      },
      {
        name: "인천 트라이포트 로지스틱스센터",
        nameEn: "Incheon Triport Logistics Center",
        location: "인천광역시 서구",
        locationEn: "Seo-gu, Incheon",
        gfa: "80,677 sqm",
        floor: "B1/7F",
        image: "/resource/Logistics_4.jpg",
        category: "Incheon South Cheongna Logistics Private Real Estate Investment Company",
        categoryKo: "인천남청라로지스일반사모부동산투자회사"
      },
      {
        name: "안성 장계리 물류센터",
        nameEn: "Anseong Janggye-ri Logistics Center",
        location: "경기도 안성시",
        locationEn: "Anseong, Gyeonggi-do",
        gfa: "119,382 sqm",
        floor: "3F/B3",
        image: "/resource/Logistics_5.jpg",
        category: "Anseong Matchum Logis",
        categoryKo: "안성맞춤로지스"
      }
    ],
    residence: [
      {
        name: "지웰홈스라이프강동",
        nameEn: "GWELL Homes. LIFE Gangdong",
        location: "서울특별시 강동구",
        locationEn: "Gangdong, Seoul",
        gfa: "3,257 sqm",
        floor: "15F/B1",
        image: "/resource/Residence_1.jpg",
        category: "Gravity Gangdong Residence Private Real Estate Investment Company",
        categoryKo: "그래비티강동레지던스사모부동산투자회사"
      },
      {
        name: "에피소드 컨비니 가산",
        nameEn: "Episode CONVENI Gasan",
        location: "서울특별시 금천구",
        locationEn: "Geumcheon, Seoul",
        gfa: "84,699 sqm",
        floor: "14F/B1",
        image: "/resource/Residence_2.jpg",
        category: "Doksan Residence Private Real Estate Investment Company",
        categoryKo: "독산레지던스사모부동산투자회사"
      },
      {
        name: "홈즈스튜디오 안암",
        nameEn: "Homes Studio Anam",
        location: "서울특별시 성북구",
        locationEn: "Seongbuk, Seoul",
        gfa: "26,354 sqm",
        floor: "6F/B2",
        image: "/resource/Residence_3.jpg",
        category: "Anam Residence Private Real Estate Investment Company",
        categoryKo: "안암레지던스사모부동산투자회사"
      },
      {
        name: "셀립 건대",
        nameEn: "Célib Kondae",
        location: "서울특별시 광진구",
        locationEn: "Gwangjin, Seoul",
        gfa: "2,958 sqm",
        floor: "B2F/8F",
        image: "/resource/Residence_4.jpg",
        category: "KU Residence Private Real Estate Investment Company",
        categoryKo: "건대레지던스사모부동산투자회사"
      }
    ],
    hotel: [
      {
        name: "보코서울명동 호텔",
        nameEn: "VOCO Seoul Myeongdong Hotel",
        location: "서울특별시 중구",
        locationEn: "Jung-gu, Seoul",
        gfa: "33,167 sqm",
        floor: "19F/B2",
        image: "/resource/Hotel_1.jpg",
        category: "Seoul South Gate Hotel Private Real Estate Investment Company",
        categoryKo: "서울남대문호텔사모부동산투자회사"
      }
    ],
    others: [
      {
        name: "유안타증권빌딩 개발사업 PF 선순위 대출채권",
        nameEn: "Yuanta Securities Building Site Development PF Senoir Loan",
        location: "서울특별시 중구",
        locationEn: "Jung-gu, Seoul",
        gfa: "45,230 sqm",
        floor: "24F/B8",
        image: "/resource/Others_1.jpg",
        category: "Gravity General Private Real Estate Debt Investment Trust No.1",
        categoryKo: "그래비티일반사모부동산투자신탁대출형제1호"
      },
      {
        name: "아산 탕정 브라운스톤 갤럭시 오피스텔",
        nameEn: "Asan Tangjeong Brownstone Galaxy Officetel",
        location: "충청남도 아산시",
        locationEn: "Asan, Chungcheongnam-do",
        gfa: "13,414 sqm",
        floor: "1F/10F",
        image: "/resource/Others_2.jpg",
        category: "Gravity General Private Real Estate Investment Company No. 24",
        categoryKo: "그래비티일반사모부동산투자회사제24호"
      }
    ]
  };

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
              <p className={`status-date status-date-${language.toLowerCase()}`}>{currentContent.date}</p>
              <p className={`status-amount status-amount-${language.toLowerCase()}`}>{currentContent.totalAmount}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Content */}
      <section className={`portfolio-content portfolio-content-${language.toLowerCase()}`}>
        <div className="portfolio-container">
          {/* Office Section */}
          <div ref={officeRef} className={`portfolio-section portfolio-section-${language.toLowerCase()}`}>
            <div className={`portfolio-section-header portfolio-section-header-${language.toLowerCase()}`}>
              <div className="portfolio-section-line"></div>
              <h2 className={`portfolio-section-title portfolio-section-title-${language.toLowerCase()}`}>{currentContent.office}</h2>
            </div>
            <div className={`property-grid property-grid-${language.toLowerCase()}`}>
              {portfolioData.office.map((property, index) => (
                <div key={index} className={`property-card property-card-${language.toLowerCase()}`}>
                  <div className="property-image">
                    <img src={property.image} alt={language === 'KO' ? property.name : property.nameEn} />
                  </div>
                  <div className={`property-info property-info-${language.toLowerCase()}`}>
                    <div className={`property-header property-header-${language.toLowerCase()}`}>
                      <p className={`property-category property-category-${language.toLowerCase()}`}>{language === 'KO' ? property.categoryKo : property.category}</p>
                      <h3 className={`property-name property-name-${language.toLowerCase()}`}>{language === 'KO' ? property.name : property.nameEn}</h3>
                    </div>
                    <div className={`property-details property-details-${language.toLowerCase()}`}>
                      <div className={`detail-item detail-item-${language.toLowerCase()}`}>
                        <span className={`detail-label detail-label-${language.toLowerCase()}`}>{currentContent.location}</span>
                        <span className={`detail-value detail-value-${language.toLowerCase()}`}>{language === 'KO' ? property.location : property.locationEn}</span>
                      </div>
                      <div className={`detail-item detail-item-${language.toLowerCase()}`}>
                        <span className={`detail-label detail-label-${language.toLowerCase()}`}>{currentContent.gfa}</span>
                        <span className={`detail-value detail-value-${language.toLowerCase()}`}>{property.gfa}</span>
                      </div>
                      <div className={`detail-item detail-item-${language.toLowerCase()}`}>
                        <span className={`detail-label detail-label-${language.toLowerCase()}`}>{currentContent.floor}</span>
                        <span className={`detail-value detail-value-${language.toLowerCase()}`}>{property.floor}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Logistics Section */}
          <div ref={logisticsRef} className={`portfolio-section portfolio-section-${language.toLowerCase()}`}>
            <div className={`portfolio-section-header portfolio-section-header-${language.toLowerCase()}`}>
              <div className="portfolio-section-line"></div>
              <h2 className={`portfolio-section-title portfolio-section-title-${language.toLowerCase()}`}>{currentContent.logistics}</h2>
            </div>
            <div className={`property-grid property-grid-${language.toLowerCase()}`}>
              {portfolioData.logistics.map((property, index) => (
                <div key={index} className={`property-card property-card-${language.toLowerCase()}`}>
                  <div className="property-image">
                    <img src={property.image} alt={language === 'KO' ? property.name : property.nameEn} />
                  </div>
                  <div className={`property-info property-info-${language.toLowerCase()}`}>
                    <div className={`property-header property-header-${language.toLowerCase()}`}>
                      <p className={`property-category property-category-${language.toLowerCase()}`}>{language === 'KO' ? property.categoryKo : property.category}</p>
                      <h3 className={`property-name property-name-${language.toLowerCase()}`}>{language === 'KO' ? property.name : property.nameEn}</h3>
                    </div>
                    <div className={`property-details property-details-${language.toLowerCase()}`}>
                      <div className={`detail-item detail-item-${language.toLowerCase()}`}>
                        <span className={`detail-label detail-label-${language.toLowerCase()}`}>{currentContent.location}</span>
                        <span className={`detail-value detail-value-${language.toLowerCase()}`}>{language === 'KO' ? property.location : property.locationEn}</span>
                      </div>
                      <div className={`detail-item detail-item-${language.toLowerCase()}`}>
                        <span className={`detail-label detail-label-${language.toLowerCase()}`}>{currentContent.gfa}</span>
                        <span className={`detail-value detail-value-${language.toLowerCase()}`}>{property.gfa}</span>
                      </div>
                      <div className={`detail-item detail-item-${language.toLowerCase()}`}>
                        <span className={`detail-label detail-label-${language.toLowerCase()}`}>{currentContent.floor}</span>
                        <span className={`detail-value detail-value-${language.toLowerCase()}`}>{property.floor}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Residence Section */}
          <div ref={residenceRef} className={`portfolio-section portfolio-section-${language.toLowerCase()}`}>
            <div className={`portfolio-section-header portfolio-section-header-${language.toLowerCase()}`}>
              <div className="portfolio-section-line"></div>
              <h2 className={`portfolio-section-title portfolio-section-title-${language.toLowerCase()}`}>{currentContent.residence}</h2>
            </div>
            <div className={`property-grid property-grid-${language.toLowerCase()}`}>
              {portfolioData.residence.map((property, index) => (
                <div key={index} className={`property-card property-card-${language.toLowerCase()}`}>
                  <div className="property-image">
                    <img src={property.image} alt={language === 'KO' ? property.name : property.nameEn} />
                  </div>
                  <div className={`property-info property-info-${language.toLowerCase()}`}>
                    <div className={`property-header property-header-${language.toLowerCase()}`}>
                      <p className={`property-category property-category-${language.toLowerCase()}`}>{language === 'KO' ? property.categoryKo : property.category}</p>
                      <h3 className={`property-name property-name-${language.toLowerCase()}`}>{language === 'KO' ? property.name : property.nameEn}</h3>
                    </div>
                    <div className={`property-details property-details-${language.toLowerCase()}`}>
                      <div className={`detail-item detail-item-${language.toLowerCase()}`}>
                        <span className={`detail-label detail-label-${language.toLowerCase()}`}>{currentContent.location}</span>
                        <span className={`detail-value detail-value-${language.toLowerCase()}`}>{language === 'KO' ? property.location : property.locationEn}</span>
                      </div>
                      <div className={`detail-item detail-item-${language.toLowerCase()}`}>
                        <span className={`detail-label detail-label-${language.toLowerCase()}`}>{currentContent.gfa}</span>
                        <span className={`detail-value detail-value-${language.toLowerCase()}`}>{property.gfa}</span>
                      </div>
                      <div className={`detail-item detail-item-${language.toLowerCase()}`}>
                        <span className={`detail-label detail-label-${language.toLowerCase()}`}>{currentContent.floor}</span>
                        <span className={`detail-value detail-value-${language.toLowerCase()}`}>{property.floor}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hotel Section */}
          <div ref={hotelRef} className={`portfolio-section portfolio-section-${language.toLowerCase()}`}>
            <div className={`portfolio-section-header portfolio-section-header-${language.toLowerCase()}`}>
              <div className="portfolio-section-line"></div>
              <h2 className={`portfolio-section-title portfolio-section-title-${language.toLowerCase()}`}>{currentContent.hotel}</h2>
            </div>
            <div className={`property-grid property-grid-${language.toLowerCase()}`}>
              {portfolioData.hotel.map((property, index) => (
                <div key={index} className={`property-card property-card-${language.toLowerCase()}`}>
                  <div className="property-image">
                    <img src={property.image} alt={language === 'KO' ? property.name : property.nameEn} />
                  </div>
                  <div className={`property-info property-info-${language.toLowerCase()}`}>
                    <div className={`property-header property-header-${language.toLowerCase()}`}>
                      <p className={`property-category property-category-${language.toLowerCase()}`}>{language === 'KO' ? property.categoryKo : property.category}</p>
                      <h3 className={`property-name property-name-${language.toLowerCase()}`}>{language === 'KO' ? property.name : property.nameEn}</h3>
                    </div>
                    <div className={`property-details property-details-${language.toLowerCase()}`}>
                      <div className={`detail-item detail-item-${language.toLowerCase()}`}>
                        <span className={`detail-label detail-label-${language.toLowerCase()}`}>{currentContent.location}</span>
                        <span className={`detail-value detail-value-${language.toLowerCase()}`}>{language === 'KO' ? property.location : property.locationEn}</span>
                      </div>
                      <div className={`detail-item detail-item-${language.toLowerCase()}`}>
                        <span className={`detail-label detail-label-${language.toLowerCase()}`}>{currentContent.gfa}</span>
                        <span className={`detail-value detail-value-${language.toLowerCase()}`}>{property.gfa}</span>
                      </div>
                      <div className={`detail-item detail-item-${language.toLowerCase()}`}>
                        <span className={`detail-label detail-label-${language.toLowerCase()}`}>{currentContent.floor}</span>
                        <span className={`detail-value detail-value-${language.toLowerCase()}`}>{property.floor}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Others Section */}
          <div ref={othersRef} className={`portfolio-section portfolio-section-${language.toLowerCase()}`}>
            <div className={`portfolio-section-header portfolio-section-header-${language.toLowerCase()}`}>
              <div className="portfolio-section-line"></div>
              <h2 className={`portfolio-section-title portfolio-section-title-${language.toLowerCase()}`}>{currentContent.others}</h2>
            </div>
            <div className={`property-grid property-grid-${language.toLowerCase()}`}>
              {portfolioData.others.map((property, index) => (
                <div key={index} className={`property-card property-card-${language.toLowerCase()}`}>
                  <div className="property-image">
                    <img src={property.image} alt={language === 'KO' ? property.name : property.nameEn} />
                  </div>
                  <div className={`property-info property-info-${language.toLowerCase()}`}>
                    <div className={`property-header property-header-${language.toLowerCase()}`}>
                      <p className={`property-category property-category-${language.toLowerCase()}`}>{language === 'KO' ? property.categoryKo : property.category}</p>
                      <h3 className={`property-name property-name-${language.toLowerCase()}`}>{language === 'KO' ? property.name : property.nameEn}</h3>
                    </div>
                    <div className={`property-details property-details-${language.toLowerCase()}`}>
                      <div className={`detail-item detail-item-${language.toLowerCase()}`}>
                        <span className={`detail-label detail-label-${language.toLowerCase()}`}>{currentContent.location}</span>
                        <span className={`detail-value detail-value-${language.toLowerCase()}`}>{language === 'KO' ? property.location : property.locationEn}</span>
                      </div>
                      <div className={`detail-item detail-item-${language.toLowerCase()}`}>
                        <span className={`detail-label detail-label-${language.toLowerCase()}`}>{currentContent.gfa}</span>
                        <span className={`detail-value detail-value-${language.toLowerCase()}`}>{property.gfa}</span>
                      </div>
                      <div className={`detail-item detail-item-${language.toLowerCase()}`}>
                        <span className={`detail-label detail-label-${language.toLowerCase()}`}>{currentContent.floor}</span>
                        <span className={`detail-value detail-value-${language.toLowerCase()}`}>{property.floor}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer language={language} />
    </div>
  );
};

export default Portfolio; 