import React, { useEffect, useRef } from "react";
import "./RiskCompliance.css";
import Footer from "./Footer";

// Intersection Observer를 사용한 애니메이션 훅
const useIntersectionObserver = (ref, options = {}) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const delay = options.delay || 0;
          const animationClass = options.animationClass || "animate-fade-in-up";
          setTimeout(() => {
            entry.target.classList.add(animationClass);
          }, delay);
        }
      },
      {
        threshold: 0.1,
        ...options,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options.delay, options.animationClass, options.threshold]);
};

const RiskCompliance = ({ language }) => {
  const titleRef = useRef(null);
  const riskTitleRef = useRef(null);
  const riskSubtitleRef = useRef(null);
  const riskSubtitleLineRef = useRef(null);
  const principle1Ref = useRef(null);
  const principle2Ref = useRef(null);
  const principle3Ref = useRef(null);
  const principle4Ref = useRef(null);
  const complianceTitleRef = useRef(null);
  const complianceSubtitleRef = useRef(null);
  const complianceSubtitleLineRef = useRef(null);
  const circle1Ref = useRef(null);
  const circle2Ref = useRef(null);
  const circle3Ref = useRef(null);
  const circle4Ref = useRef(null);
  const circle5Ref = useRef(null);
  const circle6Ref = useRef(null);
  const outcomeRef = useRef(null);
  const process1Ref = useRef(null);
  const process2Ref = useRef(null);
  const process3Ref = useRef(null);
  const process4Ref = useRef(null);
  const process5Ref = useRef(null);
  const feedbackRef = useRef(null);
  const feedbackEmptyBoxRef = useRef(null);
  const processFlowRef = useRef(null);
  const riskDescriptionRef = useRef(null);
  const complianceDescriptionRef = useRef(null);

  // Intersection Observer 적용
  useIntersectionObserver(titleRef, { delay: 100 });
  useIntersectionObserver(riskTitleRef, { delay: 200 });
  useIntersectionObserver(riskSubtitleRef, { delay: 300 });
  useIntersectionObserver(riskSubtitleLineRef, { delay: 400 });
  useIntersectionObserver(principle1Ref, { delay: 500 });
  useIntersectionObserver(principle2Ref, { delay: 600 });
  useIntersectionObserver(principle3Ref, { delay: 700 });
  useIntersectionObserver(principle4Ref, { delay: 800 });
  useIntersectionObserver(complianceTitleRef, { delay: 100 });
  useIntersectionObserver(complianceSubtitleRef, { delay: 200 });
  useIntersectionObserver(complianceSubtitleLineRef, { delay: 300 });
  useIntersectionObserver(circle1Ref, { delay: 100 });
  useIntersectionObserver(circle2Ref, { delay: 200 });
  useIntersectionObserver(circle3Ref, { delay: 300 });
  useIntersectionObserver(circle4Ref, { delay: 400 });
  useIntersectionObserver(circle5Ref, { delay: 500 });
  useIntersectionObserver(circle6Ref, { delay: 600 });
  useIntersectionObserver(outcomeRef, { delay: 100 });
  useIntersectionObserver(process1Ref, { delay: 100 });
  useIntersectionObserver(process2Ref, { delay: 200 });
  useIntersectionObserver(process3Ref, { delay: 300 });
  useIntersectionObserver(process4Ref, { delay: 400 });
  useIntersectionObserver(process5Ref, { delay: 500 });
  useIntersectionObserver(feedbackRef, { delay: 100, animationClass: 'animate-fade-in' });
  useIntersectionObserver(riskDescriptionRef, { delay: 250 });
  useIntersectionObserver(complianceDescriptionRef, { delay: 100 });

  const content = {
    EN: {
      riskManagement: {
        title: "Risk Management",
        subtitle: "Risk management basic policy",
        description: "We are an investment management company that manages client’s capital,<br/>and carry out risk management activities of the following chart below to sustain stability and enhance trust.",
        principles: [
          "Maintain a balance between risk and return",
          "Proactive and preemptive response and reporting",
          "Each and every employee at the firm is responsible for risk management and complies with the firm’s risk management policies",
          "Risk management group is organized and operated independently by each department"
        ]
      },
      compliance: {
        title: "Compliance",
        subtitle: "Compliance is",
        description: "a policy that trains, monitors, and controls financial institutions and employees on a former and regular basis to comply with laws<br/>and regulations such as supervision laws and firm’s internal control guidelines, as well as to fulfill their duty of care of a good manager",
        principles: [
          "Establishment of internal control guidelines",
          "Exercise of fiduciary duties and duties in accordance with principle of trust and good faith",
          "Ethics and compliance business management",
          "Establishment of conflict of interest prevention policy",
          "Protection of financial consumers",
          "Anti-Money Laundering"
        ],
        outcome: "Stable asset management and protection of investors' interest",
        process: [
          "COMPLIANCE Establishment of policy and standards",
          "Educational counseling, advice, guidance, explanation",
          "MONITORING",
          "REPORTING",
          "FOLLOW-UP MEASURES"
        ]
      }
    },
    KO: {
      riskManagement: {
        title: "Risk Management",
        subtitle: "위험관리 기본방침",
        description: "당사는 고객의 자산을 관리하는 자산운용사로서 건전성 유지 및 신뢰 증진을 위하여 아래 기본방침에 따라 위험관리업무를 수행하고 있습니다.",
        principles: [
          "위험과 수익의 균형 유지",
          "사전적 & 선제적 대응 및 보고",
          "모든 임직원은 위험관리 담당자로서 위험관리정책을 준수",
          "위험관리조직은 각 부서별로 독립적으로 운영됨"
        ]
      },
      compliance: {
        title: "Compliance",
        subtitle: "컴플라이언스는",
        description: "금융회사 및 모든 임직원이 직무를 수행할 때 감독법규 및 내부통제기준 등 사규를 준수하고 선량한 관리자로서의 주의의무를 다할 수 있도록 사전적・상시적으로 교육, 모니터링, 통제하는 제도입니다.",
        principles: [
          "내부통제체계 구축",
          "선관주의의무, 신의성실의무 이행",
          "윤리·준법 경영활동",
          "이해상충방지체계 구축",
          "금융소비자보호",
          "자금세탁방지"
        ],
        outcome: "건전한 자산운용 및 투자자의 이익 보호",
        process: [
          "Compliance 정책ㆍ기준 수립",
          "교육 상담ㆍ자문 안내ㆍ설명",
          "모니터링",
          "보고",
          "사후조치"
        ]
      }
    }
  };

  const currentContent = content[language];

  // feedback-empty-box 너비 계산
  useEffect(() => {
    const updateFeedbackBoxWidth = () => {
      if (process1Ref.current && feedbackEmptyBoxRef.current) {
        const processBoxWidth = process1Ref.current.offsetWidth;
        feedbackEmptyBoxRef.current.style.width = `calc(100% - ${processBoxWidth}px)`;
      }
    };

    updateFeedbackBoxWidth();
    window.addEventListener('resize', updateFeedbackBoxWidth);
    
    return () => {
      window.removeEventListener('resize', updateFeedbackBoxWidth);
    };
  }, [language]);

  return (
    <div className={`risk-compliance-page risk-compliance-page-${language.toLowerCase()}`}>
      {/* Header */}
      <div className={`risk-compliance-header risk-compliance-header-${language.toLowerCase()}`}>
        <div className={`risk-compliance-header-content risk-compliance-header-content-${language.toLowerCase()}`}>
          <h1
            ref={titleRef}
            className={`risk-compliance-title risk-compliance-title-${language.toLowerCase()}`}
          >
            Risk & Compliance
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className={`risk-compliance-content risk-compliance-content-${language.toLowerCase()}`}>
        <div className={`risk-compliance-container risk-compliance-container-${language.toLowerCase()}`}>
          
          {/* Risk Management Section */}
          <section className={`risk-management-section risk-management-section-${language.toLowerCase()}`}>
            <h2
              ref={riskTitleRef}
              className={`risk-section-title risk-section-title-${language.toLowerCase()}`}
            >
              {currentContent.riskManagement.title}
            </h2>
            
                      <div className="subtitle-container">
                                        <div
                ref={riskSubtitleLineRef}
                className="subtitle-line"
              ></div>
              <h3
                ref={riskSubtitleRef}
                className={`subtitle subtitle-${language.toLowerCase()}`}
              >
                {currentContent.riskManagement.subtitle}
              </h3>
            </div>
            
            <p 
              ref={riskDescriptionRef}
              className={`section-description section-description-${language.toLowerCase()}`}
              dangerouslySetInnerHTML={{ __html: currentContent.riskManagement.description }}
            />
            
            <div className="principles-grid">
              {currentContent.riskManagement.principles.map((principle, index) => (
                <div
                  key={index}
                  ref={[principle1Ref, principle2Ref, principle3Ref, principle4Ref][index]}
                  className="principle-box"
                >
                  <h4 className={`principle-title principle-title-${language.toLowerCase()}`}>
                    {principle}
                  </h4>
                </div>
              ))}
            </div>
          </section>

          {/* Compliance Section */}
          <section className={`compliance-section compliance-section-${language.toLowerCase()}`}>
            <h2
              ref={complianceTitleRef}
              className={`risk-section-title risk-section-title-${language.toLowerCase()}`}
            >
              {currentContent.compliance.title}
            </h2>
            
                      <div className="subtitle-container">
                                        <div
                ref={complianceSubtitleLineRef}
                className="subtitle-line"
              ></div>
              <h3
                ref={complianceSubtitleRef}
                className={`subtitle subtitle-${language.toLowerCase()}`}
              >
                {currentContent.compliance.subtitle}
              </h3>
            </div>
            
            <p 
              ref={complianceDescriptionRef}
              className={`section-description section-description-${language.toLowerCase()}`}
              dangerouslySetInnerHTML={{ __html: currentContent.compliance.description }}
            />
            
            <div className="compliance-principles">
              <div className="circles-grid">
                {currentContent.compliance.principles.map((principle, index) => (
                  <div
                    key={index}
                    ref={[circle1Ref, circle2Ref, circle3Ref, circle4Ref, circle5Ref, circle6Ref][index]}
                    className="principle-circle"
                  >
                    <span className={`circle-text circle-text-${language.toLowerCase()}`}>
                      {principle}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="outcome-section">
                <svg 
                  className="outcome-arrow"
                  viewBox="0 -4.5 20 20" 
                  version="1.1" 
                  xmlns="http://www.w3.org/2000/svg" 
                  xmlnsXlink="http://www.w3.org/1999/xlink" 
                  fill="currentColor"
                >
                  <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g transform="translate(-180.000000, -6684.000000)" fill="currentColor">
                      <g transform="translate(56.000000, 160.000000)">
                        <path d="M144,6525.39 L142.594,6524 L133.987,6532.261 L133.069,6531.38 L133.074,6531.385 L125.427,6524.045 L124,6525.414 C126.113,6527.443 132.014,6533.107 133.987,6535 C135.453,6533.594 134.024,6534.965 144,6525.39" />
                      </g>
                    </g>
                  </g>
                </svg>
                <h3
                  ref={outcomeRef}
                  className={`outcome-text outcome-text-${language.toLowerCase()}`}
                >
                  {currentContent.compliance.outcome}
                </h3>
              </div>
            </div>
            
                          <div className="compliance-process">
                <div 
                  ref={processFlowRef}
                  className="compliance-process-flow"
                >
                  {currentContent.compliance.process.map((step, index) => (
                    <React.Fragment key={index}>
                      <div
                        ref={[process1Ref, process2Ref, process3Ref, process4Ref, process5Ref][index]}
                        className="process-box"
                      >
                        <span className={`process-text process-text-${language.toLowerCase()}`}>
                          {step}
                        </span>
                        <svg 
                          className="process-arrow-bottom"
                          viewBox="0 -4.5 20 20" 
                          version="1.1" 
                          xmlns="http://www.w3.org/2000/svg" 
                          xmlnsXlink="http://www.w3.org/1999/xlink" 
                          fill="currentColor"
                        >
                          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <g transform="translate(-180.000000, -6684.000000)" fill="currentColor">
                              <g transform="translate(56.000000, 160.000000)">
                                <path d="M144,6525.39 L142.594,6524 L133.987,6532.261 L133.069,6531.38 L133.074,6531.385 L125.427,6524.045 L124,6525.414 C126.113,6527.443 132.014,6533.107 133.987,6535 C135.453,6533.594 134.024,6534.965 144,6525.39" />
                              </g>
                            </g>
                          </g>
                        </svg>
                      </div>
                      {index < currentContent.compliance.process.length - 1 && (
                        <svg 
                          className="process-arrow"
                          viewBox="0 -4.5 20 20" 
                          version="1.1" 
                          xmlns="http://www.w3.org/2000/svg" 
                          xmlnsXlink="http://www.w3.org/1999/xlink" 
                          fill="currentColor"
                        >
                          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <g transform="translate(-180.000000, -6684.000000)" fill="currentColor">
                              <g transform="translate(56.000000, 160.000000)">
                                <path d="M144,6525.39 L142.594,6524 L133.987,6532.261 L133.069,6531.38 L133.074,6531.385 L125.427,6524.045 L124,6525.414 C126.113,6527.443 132.014,6533.107 133.987,6535 C135.453,6533.594 134.024,6534.965 144,6525.39" />
                              </g>
                            </g>
                          </g>
                        </svg>
                      )}
                    </React.Fragment>
                  ))}
                                </div>
                
                <div className="feedback-container">
                  <div 
                    ref={feedbackEmptyBoxRef}
                    className="feedback-empty-box"
                  ></div>
                  <div
                    ref={feedbackRef}
                    className="feedback-text"
                  >
                    FEEDBACK
                  </div>
                </div>
            </div>
          </section>
        </div>
      </div>

      <Footer language={language} />
    </div>
  );
};

export default RiskCompliance; 