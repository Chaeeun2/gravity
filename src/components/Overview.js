import React, { useEffect, useRef, useState } from 'react';
import './Overview.css';
import Footer from './Footer';

// Intersection Observer를 사용한 애니메이션 훅
const useIntersectionObserver = (ref, options = {}) => {
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const delay = options.delay || 0;
        setTimeout(() => {
          entry.target.classList.add(options.animationClass || 'animate-fade-in-up');
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

const Overview = ({ language }) => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const contentRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000);

  // 윈도우 크기 변경 감지
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1000);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Intersection Observer 적용 - 항상 동일한 순서로 호출
  useIntersectionObserver(titleRef, { delay: 100, animationClass: 'animate-fade-in-up' });
  useIntersectionObserver(imageRef, { 
    delay: isMobile ? 300 : 700, 
    animationClass: isMobile ? 'animate-fade-in-up' : 'animate-fade-in-right' 
  });
  useIntersectionObserver(subtitleRef, { 
    delay: isMobile ? 500 : 300, 
    animationClass: isMobile ? 'animate-fade-in-up' : 'animate-fade-in-left' 
  });
  useIntersectionObserver(descriptionRef, { 
    delay: isMobile ? 700 : 500, 
    animationClass: 'animate-fade-in-up' 
  });

  // 스크롤 애니메이션
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);

  // 높이 계산 및 이미지 높이 설정
  useEffect(() => {
    const calculateHeight = () => {
      if (textRef.current && imageRef.current) {
        const textHeight = textRef.current.offsetHeight;
        imageRef.current.style.height = `${textHeight}px`;
      }
    };

    // 초기 계산
    calculateHeight();

    // 리사이즈 시 재계산
    window.addEventListener('resize', calculateHeight);

    return () => {
      window.removeEventListener('resize', calculateHeight);
    };
  }, [language]); // 언어 변경 시에도 재계산
  // 텍스트에서 **텍스트** 형태를 <strong>태그로 변환하는 함수
  const parseTextWithStrong = (text) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const strongText = part.slice(2, -2);
        return <strong key={index}>{strongText}</strong>;
      }
      return part;
    });
  };

  const content = {
    EN: {
      title: "Overview",
      subtitle: `On the
      Path of Value`,
      description: [
        `Gravity Asset Management("Gravity") is a leading investment management firm dedicated to successful management of our client's capital by exclusively focusing on investing in alternative asset classes: commercial real estate and SOC.

        Gravity is an independent asset management firm, consists of a group of skilled and experienced investment professionals who are fully committed to delivering the best economic outcome to the investors.

        We create value by providing selectively sourced investment opportunities to our investors through our professionals' abundant network and experience, and deliver the optimal result with professional and systematic management capabilities.

        Gravity is a privately held company 100% owned by its employees and affiliates. We are firmly committed to acting in the best interests of our investors.

        In compliance with all relevant laws and regulations and in accordance with the principles of trust and good faith, Gravity is committed to deliver the best investment outcomes for our investors.`
      ]
    },
    KO: {
      title: "Overview",
      subtitle: `On the
      Path of Value`,
      description: [
        `그래비티자산운용은 대체투자에 특화된 자산운용사로, 상업용 부동산과 사회기반시설 투자를 통해 고객의 자산을 운용하고 있습니다.

        **업계 최고의 전문가들로 구성된 독립계 자산운용사**로서, 구성원의 풍부한 경험과 폭넓은 네트워크를 바탕으로 우수한 투자 기회를 발굴하여 고객에게 제공하고 있으며, 체계적이고 전문적인 관리를 통해 투자 자산의 가치 증대 및 우수한 투자 성과를 달성할 수 있도록 최선의 노력을 다하겠습니다.

        그래비티자산운용은 임직원 및 특수관계자 100% 지분을 보유한 회사로, **회사와 임직원, 투자자가 하나의 목표를 공유**하며 함께 성장하는 조직입니다.

        철저한 준법정신과 신의성실의 원칙을 바탕으로 최고의 투자 성과를 달성하기 위해 임직원 모두가 한마음으로 최선을 다하겠습니다.

        많은 성원과 관심 부탁드립니다.
        감사합니다.

        그래비티자산운용 임직원 일동`
      ]
    }
  };

  const currentContent = content[language];

  return (
    <div className="overview-page">
      {/* Header Section */}
      <section className="overview-header">
        <div className="overview-header-content">
          <h1 ref={titleRef} className="overview-title">{currentContent.title}</h1>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="overview-main">
        <div className="overview-container">
          <div ref={contentRef} className="overview-content">
            <div ref={textRef} className="overview-text">
              <h2 ref={subtitleRef} className="overview-subtitle">
                {currentContent.subtitle}
              </h2>
              <div ref={descriptionRef} className={`overview-description overview-description-${language.toLowerCase()}`}>
                {currentContent.description.map((paragraph, index) => (
                  <p key={index} className="overview-paragraph">
                    {parseTextWithStrong(paragraph)}
                  </p>
                ))}
              </div>
            </div>
            <div ref={imageRef} className="overview-image">
              <img 
                src="https://pub-71c3fd18357f4781993d048dfb1872c9.r2.dev/overview.jpg?format=webp&quality=85" 
                alt="Modern Building Architecture" 
                className="building-image"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer language={language} />
    </div>
  );
};

export default Overview; 