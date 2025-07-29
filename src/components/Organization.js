import React, { useEffect, useRef, useState } from 'react';
import './Organization.css';
import Footer from './Footer';

const Organization = ({ language }) => {
  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // 애니메이션 클래스 초기화
    if (titleRef.current) titleRef.current.classList.remove('animate-fade-in-up');
    if (imageRef.current) imageRef.current.classList.remove('animate-fade-in-up');

    // 페이지 로드 시 애니메이션
    const timer = setTimeout(() => {
      if (titleRef.current) {
        titleRef.current.classList.add('animate-fade-in-up');
      }
    }, 100);

    const imageTimer = setTimeout(() => {
      if (imageRef.current) {
        imageRef.current.classList.add('animate-fade-in-up');
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      clearTimeout(imageTimer);
    };
  }, [language, isMobile]); // language나 isMobile이 변경될 때마다 실행

  // 모바일 감지
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // 초기 체크
    checkMobile();

    // 리사이즈 시 체크
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

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
  const content = {
    EN: {
      title: "Organization",
      subtitle: `On the
      Path of Value`,
      image: isMobile 
        ? "https://pub-71c3fd18357f4781993d048dfb1872c9.r2.dev/organization-mo-en.jpg?format=webp&quality=85"
        : "https://pub-71c3fd18357f4781993d048dfb1872c9.r2.dev/organization-en.jpg?format=webp&quality=85"
    },
    KO: {
      title: "Organization",
      subtitle: `On the
      Path of Value`,
      image: isMobile 
        ? "https://pub-71c3fd18357f4781993d048dfb1872c9.r2.dev/organization-mo.jpg?format=webp&quality=85"
        : "https://pub-71c3fd18357f4781993d048dfb1872c9.r2.dev/organization.jpg?format=webp&quality=85"
    }
  };

  const currentContent = content[language];

  return (
    <div className="organization-page">
      {/* Header Section */}
      <section className="organization-header">
        <div className="organization-header-content">
          <h1 ref={titleRef} className="organization-title">{currentContent.title}</h1>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="organization-main">
        <div className="organization-container">
          <div className="organization-content">
            <div ref={imageRef} className={`organization-image ${isMobile ? 'organization-image-mobile' : 'organization-image-desktop'}`}>
              <img 
                src={currentContent.image} 
                alt="Organization Structure" 
                className={`org-image ${isMobile ? 'org-image-mobile' : 'org-image-desktop'}`}
              />
            </div>
          </div>
        </div>
      </section>

      <Footer language={language} />
    </div>
  );
};

export default Organization; 