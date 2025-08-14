import React, { useEffect, useRef, useState } from 'react';
import { collection, getDocs } from '@firebase/firestore';
import { db } from '../admin/lib/firebase';
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
  const [overviewData, setOverviewData] = useState({
    subtitleKo: '',
    subtitleEn: '',
    descriptionKo: [''],
    descriptionEn: ['']
  });
  const [loading, setLoading] = useState(true);

  // 윈도우 크기 변경 감지
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1000);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Firebase에서 데이터 로드
  useEffect(() => {
    loadOverviewData();
  }, []);

  const loadOverviewData = async () => {
    try {
      setLoading(true);
      if (!db) {
        setLoading(false);
        return;
      }
      
      const querySnapshot = await getDocs(collection(db, 'overview'));
      if (!querySnapshot.empty) {
        const data = querySnapshot.docs[0].data();
        setOverviewData({
          subtitleKo: data.subtitleKo || '',
          subtitleEn: data.subtitleEn || '',
          descriptionKo: data.descriptionKo || [''],
          descriptionEn: data.descriptionEn || ['']
        });
      }
    } catch (error) {
      console.error('Overview 데이터 로딩 오류:', error);
    } finally {
      setLoading(false);
    }
  };

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
  }, [language, overviewData]); // 언어 변경 시에도 재계산

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

  // 로딩 중일 때 표시할 내용
  if (loading) {
    return (
      <div className="overview-page">
        <section className="overview-header">
          <div className="overview-header-content">
            <h1 className="overview-title">Overview</h1>
          </div>
        </section>
        <section className="overview-main">
          <div className="overview-container">
            <div className="overview-content">
              <div className="overview-text">
              </div>
              <div className="overview-image">
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
  }

  // 데이터가 없을 때 표시할 내용
  if (!overviewData.subtitleKo && !overviewData.subtitleEn && (!overviewData.descriptionKo || overviewData.descriptionKo.length === 0) && (!overviewData.descriptionEn || overviewData.descriptionEn.length === 0)) {
    return (
      <div className="overview-page">
        <section className="overview-header">
          <div className="overview-header-content">
            <h1 className="overview-title">Overview</h1>
          </div>
        </section>
        <section className="overview-main">
          <div className="overview-container">
            <div className="overview-content">
              <div className="overview-text">
              </div>
              <div className="overview-image">
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
  }

  return (
    <div className="overview-page">
      {/* Header Section */}
      <section className="overview-header">
        <div className="overview-header-content">
          <h1 ref={titleRef} className="overview-title">Overview</h1>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="overview-main">
        <div className="overview-container">
          <div ref={contentRef} className="overview-content">
            <div ref={textRef} className="overview-text">
              <h2 ref={subtitleRef} className="overview-subtitle">
                {language.toLowerCase() === 'ko' ? overviewData.subtitleKo : overviewData.subtitleEn}
              </h2>
              <div ref={descriptionRef} className={`overview-description overview-description-${language.toLowerCase()}`}>
                {language.toLowerCase() === 'ko' ? (
                  overviewData.descriptionKo.map((paragraph, index) => (
                    <p key={index} className="overview-paragraph">
                      {parseTextWithStrong(paragraph)}
                    </p>
                  ))
                ) : (
                  overviewData.descriptionEn.map((paragraph, index) => (
                    <p key={index} className="overview-paragraph">
                      {parseTextWithStrong(paragraph)}
                    </p>
                  ))
                )}
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