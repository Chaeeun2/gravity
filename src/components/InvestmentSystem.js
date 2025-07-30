import React, { useEffect, useRef } from "react";
import "./InvestmentSystem.css";
import Footer from "./Footer";

// Intersection Observer를 사용한 애니메이션 훅
const useIntersectionObserver = (ref, options = {}) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const delay = options.delay || 0;
          setTimeout(() => {
            entry.target.classList.add("animate-fade-in-up");
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
  }, [ref, options]);
};

const InvestmentSystem = ({ language }) => {
  const titleRef = useRef(null);
  const step1Ref = useRef(null);
  const step2Ref = useRef(null);
  const step3Ref = useRef(null);
  const step4Ref = useRef(null);
  const step5Ref = useRef(null);
  const step6Ref = useRef(null);
  const finalStepRef = useRef(null);
  const arrow1Ref = useRef(null);
  const arrow2Ref = useRef(null);
  const arrow3Ref = useRef(null);
  const arrow4Ref = useRef(null);
  const arrow5Ref = useRef(null);
  const arrow6Ref = useRef(null);
  const arrowWithSideBox1Ref = useRef(null);
  const arrowWithSideBox2Ref = useRef(null);
  const horizontalArrow1Ref = useRef(null);
  const horizontalArrow2Ref = useRef(null);
  const sideBox1Ref = useRef(null);
  const sideBox2Ref = useRef(null);

  // Intersection Observer 적용
  useIntersectionObserver(titleRef, { delay: 100 });
  useIntersectionObserver(step1Ref, { delay: 200 });
  useIntersectionObserver(arrow1Ref, { delay: 300 });
  useIntersectionObserver(step2Ref, { delay: 400 });
  useIntersectionObserver(arrowWithSideBox1Ref, { delay: 100 });
  useIntersectionObserver(horizontalArrow1Ref, { delay: 150 });
  useIntersectionObserver(sideBox1Ref, { delay: 100 });
  useIntersectionObserver(step3Ref, { delay: 100 });
  useIntersectionObserver(arrow3Ref, { delay: 100 });
  useIntersectionObserver(step4Ref, { delay: 100 });
  useIntersectionObserver(arrowWithSideBox2Ref, { delay: 100 });
  useIntersectionObserver(horizontalArrow2Ref, { delay: 100 });
  useIntersectionObserver(sideBox2Ref, { delay: 100 });
  useIntersectionObserver(arrow4Ref, { delay: 100 });
  useIntersectionObserver(step5Ref, { delay: 100 });
  useIntersectionObserver(arrow5Ref, { delay: 100 });
  useIntersectionObserver(step6Ref, { delay: 100 });
  useIntersectionObserver(arrow6Ref, { delay: 100 });
  useIntersectionObserver(finalStepRef, { delay: 100 });

  const content = {
    EN: {
      title: "Investment System",
      steps: {
        step1: {
          title: "Deal Sourcing",
          items: [
            "Obtain information on subject property",
            "Understand market trends of the subject property's location",
          ],
        },
        step2: {
          title: "Preliminary Review",
          items: [
            "Financial analysis on subject property",
            "Formulate investment strategy",
            "Fund raising",
          ],
        },
        step3: {
          title: "Preparation of Pre-IC",
          items: [
            "Transaction information gathering, market research",
            "Investment feasibility analysis",
            "Confirm investment strategy",
            "Review physical, legal risk and find mitigation points",
          ],
        },
        step4: {
          title: "Pre-IC",
          items: [],
        },
        step5: {
          title: "Due diligence and contract negotiation",
          items: [
            "Due diligence",
            "SPA negotiation with seller",
            "Negotiation with investor and lending institutions",
            "Conduct due diligence on subject property (legal, physical, market, appraisal, etc.)",
          ],
        },
        step6: {
          title: "Investment Committee",
          items: ["Investment Committee approval"],
        },
      },
      sideBoxes: {
        box1: {
          title: "Submission of Letter of Intent (LOI)",
        },
        box2: {
          title: "Signing of MOU",
        },
      },
      finalStep: {
        title: "Deal Closing",
        items: [
          "Fund establishment, contract execution (SPA, Loan Agreement, etc.)",
        ],
      },
    },
    KO: {
      title: "Investment System",
      steps: {
        step1: {
          title: "투자 대상 발굴",
          items: ["투자대상의 정보 획득", "투자대상군의 시장동향 파악"],
        },
        step2: {
          title: "기초조사 진행",
          items: ["투자대상에 대한 재무검토", "투자전략 수립", "투자자 모집"],
        },
        step3: {
          title: "예비투자심의 자료준비",
          items: [
            "거래정보수집, 시장조사",
            "투자타당성 검토",
            "투자전략 확정",
            "물리적, 법률적 리스크 검토 및 해소방안 강구",
          ],
        },
        step4: {
          title: "예비투자심의 진행",
          items: [],
        },
        step5: {
          title: "자산실사 및 계약 협의",
          items: [
            "자산실사 진행",
            "매도인과 매매계약 협의 진행",
            "투자자, 대출기관 등과 협의 진행",
            "투자대상의 법률, 물리, 시장조사, 감정평가 등의 각종 실사 진행",
          ],
        },
        step6: {
          title: "최종투자심의 진행",
          items: ["최종 투자심의 완료"],
        },
      },
      sideBoxes: {
        box1: {
          title: "투자의향서 제출",
        },
        box2: {
          title: "양해각서 체결",
        },
      },
      finalStep: {
        title: "Deal Closing",
        items: [
          "펀드설정, 부동산 매매계약, 대출약정 등의 관련계약 체결",
          "매매대금 지급 및 소유권 이전",
          "부동산 운용 개시",
        ],
      },
    },
  };

  const currentContent = content[language];

  return (
    <div
      className={`investment-system-page investment-system-page-${language.toLowerCase()}`}
    >
      {/* Header */}
      <div
        className={`investment-system-header investment-system-header-${language.toLowerCase()}`}
      >
        <div
          className={`investment-system-header-content investment-system-header-content-${language.toLowerCase()}`}
        >
          <h1
            ref={titleRef}
            className={`investment-system-title investment-system-title-${language.toLowerCase()}`}
          >
            {currentContent.title}
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`investment-system-content investment-system-content-${language.toLowerCase()}`}
      >
        <div
          className={`investment-system-container investment-system-container-${language.toLowerCase()}`}
        >
          {/* Process Flow */}
          <div
            className={`process-flow process-flow-${language.toLowerCase()}`}
          >
            {/* Step 1 */}
            <div
              ref={step1Ref}
              className={`process-step process-step-1 process-step-${language.toLowerCase()}`}
            >
              <h3
                className={`step-title step-title-1 step-title-${language.toLowerCase()}`}
              >
                {currentContent.steps.step1.title}
              </h3>
              <ul
                className={`step-items step-items-1 step-items-${language.toLowerCase()}`}
              >
                {currentContent.steps.step1.items.map((item, index) => (
                  <li
                    key={index}
                    className={`step-item step-item-1 step-item-${language.toLowerCase()}`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Arrow 1 */}
            <div ref={arrow1Ref} className="arrow-container">
              <div className="arrow-line arrow-line-1"></div>
              <svg
                className="arrow-triangle"
                width="20"
                height="20"
                viewBox="0 0 490 490"
              >
                <polygon
                  points="245,456.701 490,33.299 0,33.299"
                  fill="currentColor"
                />
              </svg>
            </div>

            {/* Step 2 */}
            <div
              ref={step2Ref}
              className={`process-step process-step-2 process-step-${language.toLowerCase()}`}
            >
              <h3
                className={`step-title step-title-2 step-title-${language.toLowerCase()}`}
              >
                {currentContent.steps.step2.title}
              </h3>
              <ul
                className={`step-items step-items-2 step-items-${language.toLowerCase()}`}
              >
                {currentContent.steps.step2.items.map((item, index) => (
                  <li
                    key={index}
                    className={`step-item step-item-2 step-item-${language.toLowerCase()}`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

                        {/* Arrow 2 */}
            <div ref={arrowWithSideBox1Ref} className="arrow-with-side-box">
              <div className="fake-box-container">
                {/* Horizontal Arrow to Side Box 1 */}
                <div ref={horizontalArrow1Ref} className="horizontal-arrow horizontal-arrow-1">
                  <div className="horizontal-arrow-line"></div>
                  <svg
                    className="horizontal-arrow-triangle"
                    width="20"
                    height="20"
                    viewBox="0 0 490 490"
                  >
                    <polygon
                      points="245,456.701 490,33.299 0,33.299"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                
                {/* Side Box 1 */}
                <div
                  ref={sideBox1Ref}
                  className={`side-box side-box-1 side-box-${language.toLowerCase()}`}
                >
                  <h4
                    className={`side-box-title side-box-title-1 side-box-title-${language.toLowerCase()}`}
                  >
                    {currentContent.sideBoxes.box1.title}
                  </h4>
                </div>
              </div>

              <div className="arrow-container">
                <div className="arrow-line arrow-line-2"></div>
                <svg
                  className="arrow-triangle"
                  width="20"
                  height="20"
                  viewBox="0 0 490 490"
                >
                  <polygon
                    points="245,456.701 490,33.299 0,33.299"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div className="side-box-container">
                {/* Horizontal Arrow to Side Box 1 */}
                <div className="horizontal-arrow horizontal-arrow-1">
                  <div className="horizontal-arrow-line"></div>
                  <svg
                    className="horizontal-arrow-triangle"
                    width="20"
                    height="20"
                    viewBox="0 0 490 490"
                  >
                    <polygon
                      points="245,456.701 490,33.299 0,33.299"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                
                {/* Side Box 1 */}
                <div
                  className={`side-box side-box-1 side-box-${language.toLowerCase()}`}
                >
                  <h4
                    className={`side-box-title side-box-title-1 side-box-title-${language.toLowerCase()}`}
                  >
                    {currentContent.sideBoxes.box1.title}
                  </h4>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div
              ref={step3Ref}
              className={`process-step process-step-3 process-step-${language.toLowerCase()}`}
            >
              <h3
                className={`step-title step-title-3 step-title-${language.toLowerCase()}`}
              >
                {currentContent.steps.step3.title}
              </h3>
              <ul
                className={`step-items step-items-3 step-items-${language.toLowerCase()}`}
              >
                <li
                  className={`step-item step-item-main step-item-3 step-item-${language.toLowerCase()}`}
                >
                  {currentContent.steps.step3.items[0]}
                </li>
                {currentContent.steps.step3.items.slice(1).map((item, index) => (
                  <li
                    key={index + 1}
                    className={`step-item step-item-sub step-item-3 step-item-${language.toLowerCase()}`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Arrow 3 */}
            <div ref={arrow3Ref} className="arrow-container">
              <div className="arrow-line arrow-line-3"></div>
              <svg
                className="arrow-triangle"
                width="20"
                height="20"
                viewBox="0 0 490 490"
              >
                <polygon
                  points="245,456.701 490,33.299 0,33.299"
                  fill="currentColor"
                />
              </svg>
            </div>

            {/* Step 4 */}
            <div
              ref={step4Ref}
              className={`process-step process-step-4 process-step-${language.toLowerCase()}`}
            >
              <h3
                className={`step-title step-title-4 step-title-${language.toLowerCase()}`}
              >
                {currentContent.steps.step4.title}
              </h3>
            </div>

                        {/* Arrow 4 */}
            <div ref={arrowWithSideBox2Ref} className="arrow-with-side-box">
              <div className="fake-box-container">
                {/* Horizontal Arrow to Side Box 2 */}
                <div ref={horizontalArrow2Ref} className={`horizontal-arrow horizontal-arrow-2 horizontal-arrow-2-${language.toLowerCase()}`}>
                  <div className="horizontal-arrow-line"></div>
                  <svg
                    className="horizontal-arrow-triangle"
                    width="20"
                    height="20"
                    viewBox="0 0 490 490"
                  >
                    <polygon
                      points="245,456.701 490,33.299 0,33.299"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                
                {/* Side Box 2 */}
                <div
                  ref={sideBox2Ref}
                  className={`side-box side-box-2 side-box-${language.toLowerCase()}`}
                >
                  <h4
                    className={`side-box-title side-box-title-2 side-box-title-${language.toLowerCase()}`}
                  >
                    {currentContent.sideBoxes.box2.title}
                  </h4>
                </div>
              </div>

              <div ref={arrow4Ref} className="arrow-container">
                <div className="arrow-line arrow-line-4"></div>
                <svg
                  className="arrow-triangle"
                  width="20"
                  height="20"
                  viewBox="0 0 490 490"
                >
                  <polygon
                    points="245,456.701 490,33.299 0,33.299"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div className="side-box-container">
                {/* Horizontal Arrow to Side Box 1 */}
                <div ref={horizontalArrow2Ref} className={`horizontal-arrow horizontal-arrow-2 horizontal-arrow-2-${language.toLowerCase()}`}>
                  <div className="horizontal-arrow-line"></div>
                  <svg
                    className="horizontal-arrow-triangle"
                    width="20"
                    height="20"
                    viewBox="0 0 490 490"
                  >
                    <polygon
                      points="245,456.701 490,33.299 0,33.299"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                
                {/* Side Box 2 */}
                <div
                  className={`side-box side-box-2 side-box-${language.toLowerCase()}`}
                >
                  <h4
                    className={`side-box-title side-box-title-2 side-box-title-${language.toLowerCase()}`}
                  >
                    {currentContent.sideBoxes.box2.title}
                  </h4>
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div
              ref={step5Ref}
              className={`process-step process-step-5 process-step-${language.toLowerCase()}`}
            >
              <h3
                className={`step-title step-title-5 step-title-${language.toLowerCase()}`}
              >
                {currentContent.steps.step5.title}
              </h3>
              <ul
                className={`step-items step-items-5 step-items-${language.toLowerCase()}`}
              >
                <li
                  className={`step-item step-item-main step-item-5 step-item-${language.toLowerCase()}`}
                >
                  {currentContent.steps.step5.items[0]}
                </li>
                {currentContent.steps.step5.items.slice(1).map((item, index) => (
                  <li
                    key={index + 1}
                    className={`step-item step-item-sub step-item-5 step-item-${language.toLowerCase()}`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Arrow 5 */}
            <div ref={arrow5Ref} className="arrow-container">
              <div className="arrow-line arrow-line-5"></div>
              <svg
                className="arrow-triangle"
                width="20"
                height="20"
                viewBox="0 0 490 490"
              >
                <polygon
                  points="245,456.701 490,33.299 0,33.299"
                  fill="currentColor"
                />
              </svg>
            </div>

            {/* Step 6 */}
            <div
              ref={step6Ref}
              className={`process-step process-step-6 process-step-${language.toLowerCase()}`}
            >
              <h3
                className={`step-title step-title-6 step-title-${language.toLowerCase()}`}
              >
                {currentContent.steps.step6.title}
              </h3>
              <ul
                className={`step-items step-items-6 step-items-${language.toLowerCase()}`}
              >
                {currentContent.steps.step6.items.map((item, index) => (
                  <li
                    key={index}
                    className={`step-item step-item-6 step-item-${language.toLowerCase()}`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Arrow 6 */}
            <div ref={arrow6Ref} className="arrow-container">
              <div className="arrow-line arrow-line-6"></div>
              <svg
                className="arrow-triangle"
                width="20"
                height="20"
                viewBox="0 0 490 490"
              >
                <polygon
                  points="245,456.701 490,33.299 0,33.299"
                  fill="currentColor"
                />
              </svg>
            </div>

            {/* Final Step */}
            <div
              ref={finalStepRef}
              className={`final-step final-step-${language.toLowerCase()}`}
            >
              <h3
                className={`step-title step-title-${language.toLowerCase()}`}
              >
                {currentContent.finalStep.title}
              </h3>
              <ul
                className={`step-items step-items-${language.toLowerCase()}`}
              >
                {currentContent.finalStep.items.map((item, index) => (
                  <li
                    key={index}
                    className={`step-item step-item-${language.toLowerCase()}`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer language={language} />
    </div>
  );
};

export default InvestmentSystem;
