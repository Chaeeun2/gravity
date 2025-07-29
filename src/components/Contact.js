import React, { useEffect, useRef } from 'react';
import './Contact.css';
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

const Contact = ({ language }) => {
  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const headquartersRef = useRef(null);
  const phoneRef = useRef(null);
  const faxRef = useRef(null);
  const emailRef = useRef(null);

  // Intersection Observer 적용
  useIntersectionObserver(titleRef, { delay: 100 });
  useIntersectionObserver(imageRef, { delay: 300 });
  useIntersectionObserver(headquartersRef, { delay: 500 });
  useIntersectionObserver(phoneRef, { delay: 700 });
  useIntersectionObserver(faxRef, { delay: 900 });
  useIntersectionObserver(emailRef, { delay: 1100 });

  const content = {
    EN: {
      title: "Contact us",
      headquarters: "ADDRESS",
      address: "23F, 41, Cheonggyecheon-ro, Jongno-gu, Seoul, Republic of Korea",
      mainPhone: "TEL",
      phone: "+82-2-6952-4790",
      mainFax: "FAX",
      fax: "+82-2-6952-4791",
      mainEmail: "EMAIL",
      email: "info@gravityamc.com",
      footerAddress: "23F, 41 Cheonggyecheon-ro, Jongno-gu, Seoul (Seorindong, Youngpoong Building)",
      tel: "TEL +82-2-6952-4790 | FAX +82-2-6952-4791",
      privacyPolicy: "Privacy Policy and Video Information Device Operation and Management Policy | Credit Information Utilization System",
      copyright: "Copyright © GRAVITY ASSET MANAGEMENT Inc. All Rights Reserved."
    },
    KO: {
      title: "Contact us",
      headquarters: "본사",
      address: "서울특별시 종로구 청계천로 41, 23층 (서린동, 영풍빌딩)",
      mainPhone: "대표전화",
      phone: "+82-2-6952-4790",
      mainFax: "대표팩스",
      fax: "+82-2-6952-4791",
      mainEmail: "대표메일",
      email: "info@gravityamc.com",
      footerAddress: "서울특별시 종로구 청계천로 41, 23층 (서린동, 영풍빌딩)",
      tel: "TEL +82-2-6952-4790 | FAX +82-2-6952-4791",
      privacyPolicy: "개인정보처리 및 영상정보처리기기운용관리 방침 | 신용정보활용체제",
      copyright: "Copyright © GRAVITY ASSET MANAGEMENT Inc. All Rights Reserved."
    }
  };

  const currentContent = content[language];

  return (
    <div className={`contact-page contact-page-${language.toLowerCase()}`}>
      {/* Header Section */}
      <section className={`contact-header contact-header-${language.toLowerCase()}`}>
        <div className={`contact-header-content contact-header-content-${language.toLowerCase()}`}>
          <h1 ref={titleRef} className={`contact-title contact-title-${language.toLowerCase()}`}>
            {currentContent.title}
          </h1>
        </div>
      </section>

      {/* Image Section */}
      <section className={`contact-image-section contact-image-section-${language.toLowerCase()}`}>
        <div ref={imageRef} className={`contact-image contact-image-${language.toLowerCase()}`}>
          <img src="https://pub-71c3fd18357f4781993d048dfb1872c9.r2.dev/contact.jpg?format=webp&quality=85" alt="Modern buildings" />
        </div>
      </section>

      {/* Contact Information Section */}
      <section className={`contact-info-section contact-info-section-${language.toLowerCase()}`}>
        <div className={`contact-container contact-container-${language.toLowerCase()}`}>
          <div className={`contact-info-grid contact-info-grid-${language.toLowerCase()}`}>
            <div ref={headquartersRef} className={`contact-info-item contact-info-item-${language.toLowerCase()}`}>
              <h3 className={`contact-label contact-label-${language.toLowerCase()}`}>{currentContent.headquarters}</h3>
              <p className={`contact-text contact-text-${language.toLowerCase()}`}>{currentContent.address}</p>
            </div>
            <div ref={phoneRef} className={`contact-info-item contact-info-item-${language.toLowerCase()}`}>
              <h3 className={`contact-label contact-label-${language.toLowerCase()}`}>{currentContent.mainPhone}</h3>
              <p className={`contact-text contact-text-${language.toLowerCase()}`}>{currentContent.phone}</p>
            </div>
            <div ref={faxRef} className={`contact-info-item contact-info-item-${language.toLowerCase()}`}>
              <h3 className={`contact-label contact-label-${language.toLowerCase()}`}>{currentContent.mainFax}</h3>
              <p className={`contact-text contact-text-${language.toLowerCase()}`}>{currentContent.fax}</p>
            </div>
            <div ref={emailRef} className={`contact-info-item contact-info-item-${language.toLowerCase()}`}>
              <h3 className={`contact-label contact-label-${language.toLowerCase()}`}>{currentContent.mainEmail}</h3>
              <p className={`contact-text contact-text-${language.toLowerCase()}`}>{currentContent.email}</p>
            </div>
          </div>
        </div>
      </section>

      <Footer language={language} />
    </div>
  );
};

export default Contact; 