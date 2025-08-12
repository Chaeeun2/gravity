import React, { useEffect, useRef, useState } from 'react';
import './Contact.css';
import Footer from './Footer';
import { collection, getDocs } from '@firebase/firestore';
import { db } from '../admin/lib/firebase';

// 애니메이션은 데이터 로딩 완료 후 자동으로 시작됨

const Contact = ({ language }) => {
  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const headquartersRef = useRef(null);
  const phoneRef = useRef(null);
  const faxRef = useRef(null);
  const emailRef = useRef(null);
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Firebase에서 Contact 데이터 로드
  useEffect(() => {
    const loadContactData = async () => {
      try {
        setLoading(true);
        if (!db) {
          console.log('Firebase가 초기화되지 않았습니다.');
          setLoading(false);
          return;
        }

        const querySnapshot = await getDocs(collection(db, 'contact'));
        if (!querySnapshot.empty) {
          const data = querySnapshot.docs[0].data();
          console.log('Firebase에서 로드된 데이터:', data);
          setContactData(data);
        } else {
          console.log('Firebase에 contact 데이터가 없습니다.');
          setContactData(null);
        }
      } catch (error) {
        console.error('Contact 데이터 로딩 오류:', error);
        setContactData(null);
      } finally {
        setLoading(false);
      }
    };

    loadContactData();
  }, []);

  // 데이터 로딩이 완료된 후 애니메이션 시작
  useEffect(() => {
    if (!loading) {
      // 애니메이션 클래스 제거 (재시작을 위해)
      const resetAnimation = () => {
        if (titleRef.current) titleRef.current.classList.remove("animate-fade-in-up");
        if (imageRef.current) imageRef.current.classList.remove("animate-fade-in-up");
        if (headquartersRef.current) headquartersRef.current.classList.remove("animate-fade-in-up");
        if (phoneRef.current) phoneRef.current.classList.remove("animate-fade-in-up");
        if (faxRef.current) faxRef.current.classList.remove("animate-fade-in-up");
        if (emailRef.current) emailRef.current.classList.remove("animate-fade-in-up");
      };

      // 즉시 애니메이션 클래스 제거
      resetAnimation();

      // 순차적으로 애니메이션 시작
      const titleTimer = setTimeout(() => {
        if (titleRef.current) titleRef.current.classList.add("animate-fade-in-up");
      }, 200);

      const imageTimer = setTimeout(() => {
        if (imageRef.current) imageRef.current.classList.add("animate-fade-in-up");
      }, 400);

      const headquartersTimer = setTimeout(() => {
        if (headquartersRef.current) headquartersRef.current.classList.add("animate-fade-in-up");
      }, 600);

      const phoneTimer = setTimeout(() => {
        if (phoneRef.current) phoneRef.current.classList.add("animate-fade-in-up");
      }, 800);

      const faxTimer = setTimeout(() => {
        if (faxRef.current) faxRef.current.classList.add("animate-fade-in-up");
      }, 1000);

      const emailTimer = setTimeout(() => {
        if (emailRef.current) emailRef.current.classList.add("animate-fade-in-up");
      }, 1200);

      return () => {
        clearTimeout(titleTimer);
        clearTimeout(imageTimer);
        clearTimeout(headquartersTimer);
        clearTimeout(phoneTimer);
        clearTimeout(faxTimer);
        clearTimeout(emailTimer);
      };
    }
  }, [loading, language]); // language 의존성 추가

  // 애니메이션은 데이터 로딩 완료 후 자동으로 시작됨

  // 기본 콘텐츠 (Firebase 데이터가 없을 때 사용)
  const defaultContent = {
    EN: {
      title: "Contact us",
      headquarters: "ADDRESS",
      address: "23F, 41, Cheonggyecheon-ro, Jongno-gu, Seoul, Republic of Korea",
      mainPhone: "TEL",
      phone: "+82-2-6952-4790",
      mainFax: "FAX",
      fax: "+82-2-6952-4791",
      mainEmail: "EMAIL",
      email: "info@gravityamc.com"
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
      email: "info@gravityamc.com"
    }
  };

  // Firebase 데이터가 있으면 사용, 없으면 기본값 사용
  const currentContent = {
    EN: {
      title: "Contact us",
      headquarters: "ADDRESS",
      address: contactData?.addressEn || defaultContent.EN.address,
      mainPhone: "TEL",
      phone: contactData?.phone || defaultContent.EN.phone,
      mainFax: "FAX",
      fax: contactData?.fax || defaultContent.EN.fax,
      mainEmail: "EMAIL",
      email: contactData?.email || defaultContent.EN.email
    },
    KO: {
      title: "Contact us",
      headquarters: "본사",
      address: contactData?.addressKo || defaultContent.KO.address,
      mainPhone: "대표전화",
      phone: contactData?.phone || defaultContent.KO.phone,
      mainFax: "대표팩스",
      fax: contactData?.fax || defaultContent.KO.fax,
      mainEmail: "대표메일",
      email: contactData?.email || defaultContent.KO.email
    }
  };

  // 현재 언어에 맞는 콘텐츠 선택
  const content = currentContent[language] || currentContent.KO;

  // 디버깅용 콘솔 출력
  console.log('현재 contactData:', contactData);
  console.log('현재 currentContent:', currentContent);
  console.log('현재 언어:', language);
  console.log('선택된 content:', content);

  // 로딩 중일 때는 기본 콘텐츠로 표시
  if (loading) {
    return (
      <div className={`contact-page contact-page-${language.toLowerCase()}`}>
        {/* Header Section */}
        <section className={`contact-header contact-header-${language.toLowerCase()}`}>
          <div className={`contact-header-content contact-header-content-${language.toLowerCase()}`}>
            <h1 ref={titleRef} className={`contact-title contact-title-${language.toLowerCase()}`}>
              {defaultContent[language].title}
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
                <h3 className={`contact-label contact-label-${language.toLowerCase()}`}>{defaultContent[language].headquarters}</h3>
                <p className={`contact-text contact-text-${language.toLowerCase()}`}>{defaultContent[language].address}</p>
              </div>
              <div ref={phoneRef} className={`contact-info-item contact-info-item-${language.toLowerCase()}`}>
                <h3 className={`contact-label contact-label-${language.toLowerCase()}`}>{defaultContent[language].mainPhone}</h3>
                <p className={`contact-text contact-text-${language.toLowerCase()}`}>{defaultContent[language].phone}</p>
              </div>
              <div ref={faxRef} className={`contact-info-item contact-info-item-${language.toLowerCase()}`}>
                <h3 className={`contact-label contact-label-${language.toLowerCase()}`}>{defaultContent[language].mainFax}</h3>
                <p className={`contact-text contact-text-${language.toLowerCase()}`}>{defaultContent[language].fax}</p>
                </div>
              <div ref={emailRef} className={`contact-info-item contact-info-item-${language.toLowerCase()}`}>
                <h3 className={`contact-label contact-label-${language.toLowerCase()}`}>{defaultContent[language].mainEmail}</h3>
                <p className={`contact-text contact-text-${language.toLowerCase()}`}>{defaultContent[language].email}</p>
              </div>
            </div>
          </div>
        </section>

        <Footer language={language} />
      </div>
    );
  }

  return (
    <div className={`contact-page contact-page-${language.toLowerCase()}`}>
      {/* Header Section */}
      <section className={`contact-header contact-header-${language.toLowerCase()}`}>
        <div className={`contact-header-content contact-header-content-${language.toLowerCase()}`}>
          <h1 ref={titleRef} className={`contact-title contact-title-${language.toLowerCase()}`}>
            {content.title}
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
              <h3 className={`contact-label contact-label-${language.toLowerCase()}`}>{content.headquarters}</h3>
              <p className={`contact-text contact-text-${language.toLowerCase()}`}>{content.address}</p>
            </div>
            <div ref={phoneRef} className={`contact-info-item contact-info-item-${language.toLowerCase()}`}>
              <h3 className={`contact-label contact-label-${language.toLowerCase()}`}>{content.mainPhone}</h3>
              <p className={`contact-text contact-text-${language.toLowerCase()}`}>{content.phone}</p>
            </div>
            <div ref={faxRef} className={`contact-info-item contact-info-item-${language.toLowerCase()}`}>
              <h3 className={`contact-label contact-label-${language.toLowerCase()}`}>{content.mainFax}</h3>
              <p className={`contact-text contact-text-${language.toLowerCase()}`}>{content.fax}</p>
            </div>
            <div ref={emailRef} className={`contact-info-item contact-info-item-${language.toLowerCase()}`}>
              <h3 className={`contact-label contact-label-${language.toLowerCase()}`}>{content.mainEmail}</h3>
              <p className={`contact-text contact-text-${language.toLowerCase()}`}>{content.email}</p>
            </div>
          </div>
        </div>
      </section>

      <Footer language={language} />
    </div>
  );
};

export default Contact; 