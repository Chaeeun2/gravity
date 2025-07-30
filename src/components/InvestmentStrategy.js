import React, { useEffect, useRef } from 'react';
import './InvestmentStrategy.css';
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

const InvestmentStrategy = ({ language }) => {
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const chartRef = useRef(null);
  const strategiesRef = useRef(null);
  const productsRef = useRef(null);
  
  // Strategy items refs
  const coreStrategyRef = useRef(null);
  const corePlusStrategyRef = useRef(null);
  const valueAddStrategyRef = useRef(null);
  const opportunisticStrategyRef = useRef(null);
  
  // Product items refs
  const leaseholdProductRef = useRef(null);
  const developmentProductRef = useRef(null);
  const loanProductRef = useRef(null);
  const securitiesProductRef = useRef(null);
  
  // Strategy titles and descriptions refs
  const coreTitleRef = useRef(null);
  const coreDescriptionRef = useRef(null);
  const corePlusTitleRef = useRef(null);
  const corePlusDescriptionRef = useRef(null);
  const valueAddTitleRef = useRef(null);
  const valueAddDescriptionRef = useRef(null);
  const opportunisticTitleRef = useRef(null);
  const opportunisticDescriptionRef = useRef(null);
  
  // Product titles and descriptions refs
  const leaseholdTitleRef = useRef(null);
  const leaseholdDescriptionRef = useRef(null);
  const developmentTitleRef = useRef(null);
  const developmentDescriptionRef = useRef(null);
  const loanTitleRef = useRef(null);
  const loanDescriptionRef = useRef(null);
  const securitiesTitleRef = useRef(null);
  const securitiesDescriptionRef = useRef(null);
  
  // Products title ref
  const productsTitleRef = useRef(null);

  // Intersection Observer 적용 - 순차적 애니메이션
  useIntersectionObserver(titleRef, { delay: 100 });
  useIntersectionObserver(descriptionRef, { delay: 200 });
  useIntersectionObserver(chartRef, { delay: 300 });
  
  // Strategy section - 순차적 애니메이션
  useIntersectionObserver(strategiesRef, { delay: 350 });
  
  // Strategy items - 순차적 애니메이션
  useIntersectionObserver(coreStrategyRef, { delay: 100 });
  useIntersectionObserver(corePlusStrategyRef, { delay: 200 });
  useIntersectionObserver(valueAddStrategyRef, { delay: 300 });
  useIntersectionObserver(opportunisticStrategyRef, { delay: 400 });
  
  // Product section - 순차적 애니메이션
  useIntersectionObserver(productsRef, { delay: 100 });
  
  // Products title - 순차적 애니메이션
  useIntersectionObserver(productsTitleRef, { delay: 100 });
  
  // Product items - 순차적 애니메이션
  useIntersectionObserver(leaseholdProductRef, { delay: 100 });
  useIntersectionObserver(developmentProductRef, { delay: 200 });
  useIntersectionObserver(loanProductRef, { delay: 300 });
  useIntersectionObserver(securitiesProductRef, { delay: 400 });
  
  // Strategy titles and descriptions - 순차적 애니메이션
  useIntersectionObserver(coreTitleRef, { delay: 120 });
  useIntersectionObserver(coreDescriptionRef, { delay: 140 });
  useIntersectionObserver(corePlusTitleRef, { delay: 220 });
  useIntersectionObserver(corePlusDescriptionRef, { delay: 240 });
  useIntersectionObserver(valueAddTitleRef, { delay: 320 });
  useIntersectionObserver(valueAddDescriptionRef, { delay: 340 });
  useIntersectionObserver(opportunisticTitleRef, { delay: 420 });
  useIntersectionObserver(opportunisticDescriptionRef, { delay: 440 });
  
  // Product titles and descriptions - 순차적 애니메이션
  useIntersectionObserver(leaseholdTitleRef, { delay: 120 });
  useIntersectionObserver(leaseholdDescriptionRef, { delay: 140 });
  useIntersectionObserver(developmentTitleRef, { delay: 220 });
  useIntersectionObserver(developmentDescriptionRef, { delay: 240 });
  useIntersectionObserver(loanTitleRef, { delay: 320 });
  useIntersectionObserver(loanDescriptionRef, { delay: 340 });
  useIntersectionObserver(securitiesTitleRef, { delay: 420 });
  useIntersectionObserver(securitiesDescriptionRef, { delay: 440 });

  const content = {
    EN: {
      title: "Investment Strategy",
      description: "We safely manage customer assets through balanced design of profitability and risk.",
      profitability: "Profitability",
      risk: "Risk",
      strategies: {
        core: {
          title: "Core",
          titleSuffix: "Strategy",
          description: "Investment in high-quality real estate assets in prime location, featuring strong building specifications and offering stable return profile to investors."
        },
        corePlus: {
          title: "Core Plus",
          titleSuffix: "Strategy",
          description: "Investment in well-located real estate assets with the potential to be repositioned as core profile through re-leasing, reducing vacancy or enhancing operational efficiency."
        },
        valueAdd: {
          title: "Value Add",
          titleSuffix: "Strategy",
          description: "Investment in undervalued real estate assets with value creation potential through strategic capital expenditure, operational improvements or active asset management."
        },
        opportunistic: {
          title: "Opportunistic",
          titleSuffix: "Strategy",
          description: "Investment in high-risk, high-return real estate projects involving ground-up development, redevelopment, remodeling or major capital expenditure."
        }
      },
      products: {
        title: "Product Type",
        leasehold: {
          title: "Real Estate Equity Fund",
          description: "Investment in income-generating commercial real estate assets, aiming to deliver target returns through steady operating income over the fund life and capital appreciation upon exit (office, logistics center, retail, hotel, rental housing, etc.)"
        },
        development: {
          title: "Real Estate Debt Fund",
          description: "Investment in real estate investment vehicles or corporations in the form of real estate-backed debt or loans, generating stable interest income."
        },
        loan: {
          title: "Real Estate Development Fund",
          description: "Investment in real estate development projects, targeting development profits through various exit strategy including pre-sale and sales upon stabilization."
        },
        securities: {
          title: "Real Estate Securities Fund",
          description: "Investment in securities or shares issued by commercial real estate corporations, REITs, or other real estate investment vehicles."
        }
      }
    },
    KO: {
      title: "Investment Strategy",
      description: "수익성과 리스크의 균형적인 설계를 통해 고객의 자산을 안전하게 관리합니다.",
      profitability: "수익성",
      risk: "리스크",
      strategies: {
        core: {
          title: "Core",
          titleSuffix: "전략",
          description: "우수한 스펙 및 입지 등을 보유한 안정화된 우량 자산에 대한 투자"
        },
        corePlus: {
          title: "Core Plus",
          titleSuffix: "전략",
          description: "임차인 리테넌팅 및 공실해소 등을 통해 운용자산의 Core 달성을 목표로 하는 투자"
        },
        valueAdd: {
          title: "Value Add",
          titleSuffix: "전략",
          description: "물리적 개선공사, 운영현황 개선 등을 통하여 잠재가치 대비 저평가된 자산에 대한 벨류업 투자"
        },
        opportunistic: {
          title: "Opportunistic",
          titleSuffix: "전략",
          description: "개발, 재개발, 리모델링 등을 진행하는 고위험자산에 대한 수익률 극대화 추구의 투자"
        }
      },
      products: {
        title: "상품구분 및 투자대상",
        leasehold: {
          title: "임대형 부동산펀드",
          description: "상업용 부동산(오피스, 물류센터, 리테일, 호텔, 임대주택 등) 매입 후 펀드기간 동안의 운용수익 및 향후 자산가치 증대에 따른 매각차익 등을 목표로 하는 상품"
        },
        development: {
          title: "개발형 부동산펀드",
          description: "상업용 부동산의 개발사업을 추진하여 분양 또는 준공 후 안정화 시 매각 등의 전략을 통하여 부동산의 개발이익을 목표로 하는 상품"
        },
        loan: {
          title: "대출형 부동산펀드",
          description: "상업용 부동산의 개발 또는 운용 목적의 법인 또는 부동산 투자 Vehicle 등에 대출하여 대출이자수익을 목표로 하는 상품"
        },
        securities: {
          title: "증권형 부동산펀드",
          description: "상업용 부동산 법인 또는 기타 부동산 투자 Vehicle 등이 보유/발행하는 지분증권 등에 투자하는 상품"
        }
      }
    }
  };

  const currentContent = content[language];

  return (
    <div className={`investment-strategy-page investment-strategy-page-${language.toLowerCase()}`}>
      {/* Header Section */}
      <section className={`investment-strategy-header investment-strategy-header-${language.toLowerCase()}`}>
        <div className={`investment-strategy-header-content investment-strategy-header-content-${language.toLowerCase()}`}>
          <h1 ref={titleRef} className={`investment-strategy-title investment-strategy-title-${language.toLowerCase()}`}>
            {currentContent.title}
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className={`investment-strategy-content investment-strategy-content-${language.toLowerCase()}`}>
        <div className={`investment-strategy-container investment-strategy-container-${language.toLowerCase()}`}>

          {/* Investment Strategy Chart */}
          <div ref={chartRef} className={`investment-strategy-chart investment-strategy-chart-${language.toLowerCase()}`}>
            
                      <div className={`chart-container chart-container-${language.toLowerCase()}`}>
                                    {/* Description */}
          <div ref={descriptionRef} className={`investment-strategy-description investment-strategy-description-${language.toLowerCase()}`}>
            <p>{currentContent.description}</p>
          </div>
                <img 
                  src={`https://pub-71c3fd18357f4781993d048dfb1872c9.r2.dev/strategy-${language.toLowerCase()}.png?format=webp&quality=85`}
                  alt="Investment Strategy Chart" 
                  className={`chart-image chart-image-desktop chart-image-${language.toLowerCase()}`}
                />
                <img 
                  src={`https://pub-71c3fd18357f4781993d048dfb1872c9.r2.dev/strategy-${language.toLowerCase()}-mobile.png?format=webp&quality=85`}
                  alt="Investment Strategy Chart" 
                  className={`chart-image chart-image-mobile chart-image-${language.toLowerCase()}`}
                />
              </div>
          </div>

          {/* Strategy Descriptions */}
          <div ref={strategiesRef} className={`investment-strategies investment-strategies-${language.toLowerCase()}`}>
            <div className={`strategy-grid strategy-grid-${language.toLowerCase()}`}>
              <div ref={coreStrategyRef} className={`strategy-item strategy-item-core strategy-item-core-${language.toLowerCase()}`}>
                <div className={`strategy-title-container strategy-title-container-core strategy-title-container-core-${language.toLowerCase()}`}>
                  <div className="strategy-title-line"></div>
                  <h3 ref={coreTitleRef} className={`strategy-title strategy-title-core strategy-title-${language.toLowerCase()}`}>
                    {currentContent.strategies.core.title} <span className={`strategy-title-suffix strategy-title-suffix-${language.toLowerCase()}`}>{currentContent.strategies.core.titleSuffix}</span>
                  </h3>
                </div>
                <p ref={coreDescriptionRef} className={`strategy-description strategy-description-core strategy-description-${language.toLowerCase()}`}>
                  {currentContent.strategies.core.description}
                </p>
              </div>
              <div ref={corePlusStrategyRef} className={`strategy-item strategy-item-core-plus strategy-item-core-plus-${language.toLowerCase()}`}>
                <div className={`strategy-title-container strategy-title-container-core-plus strategy-title-container-core-plus-${language.toLowerCase()}`}>
                  <div className="strategy-title-line"></div>
                  <h3 ref={corePlusTitleRef} className={`strategy-title strategy-title-core-plus strategy-title-${language.toLowerCase()}`}>
                    {currentContent.strategies.corePlus.title} <span className={`strategy-title-suffix strategy-title-suffix-${language.toLowerCase()}`}>{currentContent.strategies.corePlus.titleSuffix}</span>
                  </h3>
                </div>
                <p ref={corePlusDescriptionRef} className={`strategy-description strategy-description-core-plus strategy-description-${language.toLowerCase()}`}>
                  {currentContent.strategies.corePlus.description}
                </p>
              </div>
              <div ref={valueAddStrategyRef} className={`strategy-item strategy-item-value-add strategy-item-value-add-${language.toLowerCase()}`}>
                <div className={`strategy-title-container strategy-title-container-value-add strategy-title-container-value-add-${language.toLowerCase()}`}>
                  <div className="strategy-title-line"></div>
                  <h3 ref={valueAddTitleRef} className={`strategy-title strategy-title-value-add strategy-title-${language.toLowerCase()}`}>
                    {currentContent.strategies.valueAdd.title} <span className={`strategy-title-suffix strategy-title-suffix-${language.toLowerCase()}`}>{currentContent.strategies.valueAdd.titleSuffix}</span>
                  </h3>
                </div>
                <p ref={valueAddDescriptionRef} className={`strategy-description strategy-description-value-add strategy-description-${language.toLowerCase()}`}>
                  {currentContent.strategies.valueAdd.description}
                </p>
              </div>
              <div ref={opportunisticStrategyRef} className={`strategy-item strategy-item-opportunistic strategy-item-opportunistic-${language.toLowerCase()}`}>
                <div className={`strategy-title-container strategy-title-container-opportunistic strategy-title-container-opportunistic-${language.toLowerCase()}`}>
                  <div className="strategy-title-line"></div>
                  <h3 ref={opportunisticTitleRef} className={`strategy-title strategy-title-opportunistic strategy-title-${language.toLowerCase()}`}>
                    {currentContent.strategies.opportunistic.title} <span className={`strategy-title-suffix strategy-title-suffix-${language.toLowerCase()}`}>{currentContent.strategies.opportunistic.titleSuffix}</span>
                  </h3>
                </div>
                <p ref={opportunisticDescriptionRef} className={`strategy-description strategy-description-opportunistic strategy-description-${language.toLowerCase()}`}>
                  {currentContent.strategies.opportunistic.description}
                </p>
              </div>
            </div>
          </div>

          {/* Product Classification */}
          <div ref={productsRef} className={`investment-products investment-products-${language.toLowerCase()}`}>
            <h2 ref={productsTitleRef} className={`products-title products-title-${language.toLowerCase()}`}>
              {currentContent.products.title}
            </h2>
            <div className={`products-grid products-grid-${language.toLowerCase()}`}>
              <div ref={leaseholdProductRef} className={`product-item product-item-leasehold product-item-leasehold-${language.toLowerCase()}`}>
                <h3 ref={leaseholdTitleRef} className={`product-title product-title-${language.toLowerCase()}`}>
                  {currentContent.products.leasehold.title}
                              </h3>
                              <div className="product-title-line"></div>
                <p ref={leaseholdDescriptionRef} className={`product-description product-description-${language.toLowerCase()}`}>
                  {currentContent.products.leasehold.description}
                </p>
              </div>
              <div ref={developmentProductRef} className={`product-item product-item-development product-item-development-${language.toLowerCase()}`}>
                <h3 ref={developmentTitleRef} className={`product-title product-title-${language.toLowerCase()}`}>
                  {currentContent.products.development.title}
                              </h3>
                              <div className="product-title-line"></div>
                <p ref={developmentDescriptionRef} className={`product-description product-description-${language.toLowerCase()}`}>
                  {currentContent.products.development.description}
                </p>
              </div>
              <div ref={loanProductRef} className={`product-item product-item-loan product-item-loan-${language.toLowerCase()}`}>
                <h3 ref={loanTitleRef} className={`product-title product-title-${language.toLowerCase()}`}>
                  {currentContent.products.loan.title}
                              </h3>
                              <div className="product-title-line"></div>
                <p ref={loanDescriptionRef} className={`product-description product-description-${language.toLowerCase()}`}>
                  {currentContent.products.loan.description}
                </p>
              </div>
              <div ref={securitiesProductRef} className={`product-item product-item-securities product-item-securities-${language.toLowerCase()}`}>
                <h3 ref={securitiesTitleRef} className={`product-title product-title-${language.toLowerCase()}`}>
                  {currentContent.products.securities.title}
                              </h3>
                              <div className="product-title-line"></div>
                <p ref={securitiesDescriptionRef} className={`product-description product-description-${language.toLowerCase()}`}>
                  {currentContent.products.securities.description}
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      <Footer language={language} />
    </div>
  );
};

export default InvestmentStrategy; 