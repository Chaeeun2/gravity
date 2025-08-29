import React, { useEffect, useRef, useState } from "react";
import "./Leadership.css";
import Footer from "./Footer";
import LeadershipModal from "./LeadershipModal";
import { collection, getDocs } from '@firebase/firestore';
import { db } from '../admin/lib/firebase';

const Leadership = ({ language }) => {
  const titleRef = useRef(null);
  const managementRef = useRef(null);
  const part1Ref = useRef(null);
  const part2Ref = useRef(null);
  const part3Ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [leadershipData, setLeadershipData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Firebase에서 Leadership 데이터 로드
  useEffect(() => {
    const loadLeadershipData = async () => {
      try {
        setLoading(true);
        if (!db) {
          setLoading(false);
          return;
        }

        const querySnapshot = await getDocs(collection(db, 'leadership'));
        if (!querySnapshot.empty) {
          const data = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          
          // order 필드를 기준으로 정렬 (어드민에서 설정한 순서)
          const sortedData = data.sort((a, b) => {
            // 카테고리별로 먼저 정렬
            const categoryOrder = { 'management': 0, 'part1': 1, 'part2': 2, 'part3': 3 };
            const orderA = categoryOrder[a.category] ?? 999;
            const orderB = categoryOrder[b.category] ?? 999;
            
            if (orderA !== orderB) {
              return orderA - orderB;
            }
            
            // 같은 카테고리 내에서는 order 필드로 정렬
            const itemOrderA = a.order ?? 999;
            const itemOrderB = b.order ?? 999;
            return itemOrderA - itemOrderB;
          });
          
          setLeadershipData(sortedData);
        }
      } catch (error) {
        // console.error('Leadership 데이터 로딩 오류:', error);
      } finally {
        setLoading(false);
      }
    };

    loadLeadershipData();
  }, []);

  // 애니메이션 실행 함수
  const startAnimation = () => {
    // 모든 요소에서 애니메이션 클래스 제거
    const resetElement = (ref) => {
      if (ref.current) {
        ref.current.classList.remove("animate-fade-in-up");
      }
    };

    // 즉시 초기화
    resetElement(titleRef);
    resetElement(managementRef);
    resetElement(part1Ref);
    resetElement(part2Ref);
    resetElement(part3Ref);

    // 애니메이션 시작
    const titleTimer = setTimeout(() => {
      if (titleRef.current) {
        titleRef.current.classList.add("animate-fade-in-up");
      }
    }, 300);

    const managementTimer = setTimeout(() => {
      if (managementRef.current) {
        managementRef.current.classList.add("animate-fade-in-up");
      }
    }, 500);

    const part1Timer = setTimeout(() => {
      if (part1Ref.current) {
        part1Ref.current.classList.add("animate-fade-in-up");
      }
    }, 700);

    const part2Timer = setTimeout(() => {
      if (part2Ref.current) {
        part2Ref.current.classList.add("animate-fade-in-up");
      }
    }, 800);

    const part3Timer = setTimeout(() => {
      if (part3Ref.current) {
        part3Ref.current.classList.add("animate-fade-in-up");
      }
    }, 1000);

    return () => {
      clearTimeout(titleTimer);
      clearTimeout(managementTimer);
      clearTimeout(part1Timer);
      clearTimeout(part2Timer);
      clearTimeout(part3Timer);
    };
  };

  // 컴포넌트 마운트 시 애니메이션 시작
  useEffect(() => {
    // 페이지 로드 완료 후 애니메이션 시작
    const handleLoad = () => {
      setTimeout(startAnimation, 200);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []); // 컴포넌트 마운트 시에만 실행

  // 언어 변경 시 애니메이션 재실행
  useEffect(() => {
    setTimeout(startAnimation, 100);
  }, [language]); // 언어 변경 시 실행

  // 모바일 및 태블릿 감지
  useEffect(() => {
    const checkScreenSize = () => {
      const newIsMobile = window.innerWidth <= 768;
      const newIsTablet = window.innerWidth <= 1200;
      setIsMobile(newIsMobile);
      setIsTablet(newIsTablet);
    };

    // 초기 체크
    checkScreenSize();

    // 리사이즈 시 체크
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  // 스크롤 애니메이션
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // 로딩 중일 때 표시할 내용
  if (loading) {
    return (
      <div className="leadership-page">
        <section className="leadership-header">
          <div className="leadership-header-content">
            <h1 className="leadership-title">Leadership</h1>
          </div>
        </section>
        <section className="leadership-main">
          <div className="leadership-container">
          </div>
        </section>
        <Footer language={language} />
      </div>
    );
  }

  // 데이터가 없을 때 표시할 내용
  if (leadershipData.length === 0) {
    return (
      <div className="leadership-page">
        <section className="leadership-header">
          <div className="leadership-header-content">
            <h1 className="leadership-title">Leadership</h1>
          </div>
        </section>
        <section className="leadership-main">
          <div className="leadership-container">
          </div>
        </section>
        <Footer language={language} />
      </div>
    );
  }

  // Firebase 데이터를 사용하여 동적으로 콘텐츠 생성
  const currentContent = {
    title: "Leadership",
    management: {
      title: language === 'KO' ? "경영진" : "Management",
      members: leadershipData.filter(item => item.category === 'management').map(item => ({
        ...item,
        experience: language === 'KO' ? (item.experienceKo || []) : (item.experienceEn || []),
        education: language === 'KO' ? (item.educationKo || []) : (item.educationEn || [])
      }))
    },
    parts: [
      {
        title: "Part. 1",
        members: leadershipData.filter(item => item.category === 'part1').map(item => ({
          ...item,
          experience: language === 'KO' ? (item.experienceKo || []) : (item.experienceEn || []),
          education: language === 'KO' ? (item.educationKo || []) : (item.educationEn || [])
        }))
      },
      {
        title: "Part. 2", 
        members: leadershipData.filter(item => item.category === 'part2').map(item => ({
          ...item,
          experience: language === 'KO' ? (item.experienceKo || []) : (item.experienceEn || []),
          education: language === 'KO' ? (item.educationKo || []) : (item.educationEn || [])
        }))
      },
      {
        title: "Part. 3",
        members: leadershipData.filter(item => item.category === 'part3').map(item => ({
          ...item,
          experience: language === 'KO' ? (item.experienceKo || []) : (item.experienceEn || []),
          education: language === 'KO' ? (item.educationKo || []) : (item.educationEn || [])
        }))
      }
    ]
  };

  const handleMemberClick = (member) => {
    setSelectedMember(member);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedMember(null);
  };

  return (
    <div className="leadership-page">
      {/* Header Section */}
      <section className="leadership-header">
        <div className="leadership-header-content">
          <h1 ref={titleRef} className="leadership-title">
            Leadership
          </h1>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="leadership-main">
        <div className="leadership-container">
          <div className="leadership-content">
            {/* Management Section */}
            <div ref={managementRef} className="leadership-section">
              <h2 className="leadership-section-title">
                {currentContent.management.title}
              </h2>
              <div className="members-grid">
                {currentContent.management.members.map((member, memberIndex) => (
                  <div
                    key={memberIndex}
                    className={`member-card member-card-${language.toLowerCase()}`}
                    onClick={() => handleMemberClick(member)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="member-info">
                      <div className="member-name">
                        {language === 'KO' ? member.nameKo : member.nameEn}
                      </div>
                      <div className="member-position">
                        {language === 'KO' ? member.positionKo : member.positionEn}
                      </div>
                    </div>
                    <div className="member-arrow">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 12 20"
                      >
                        <path
                          fill="currentColor"
                          d="M1.39 0L0 1.406 8.261 10.013 7.38 10.931 7.385 10.926 0.045 18.573 1.414 20C3.443 17.887 9.107 11.986 11 10.013 9.594 8.547 10.965 9.976 1.39 0"
                        />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Investment Management Group */}
            <div className="investment-group">
              {/* Investment Management Part 1 */}
              <div ref={part1Ref} className="leadership-section">
                <h2 className="leadership-section-title">
                  {isTablet 
                    ? (language === "KO" ? "투자운용 Part. 1" : "Investment Management Part. 1")
                    : (
                      <div className="part-title-wrapper">
                        <p
                          className={
                            language === "KO" ? "part-title-ko" : "part-title-en"
                          }
                        >
                          {language === "KO" ? "투자운용" : "Investment Management"}
                        </p>
                        <span>Part. 1</span>
                      </div>
                    )
                  }
                </h2>
                <div className="members-grid">
                  {currentContent.parts[0].members.map(
                    (member, memberIndex) => (
                      <div
                        key={memberIndex}
                        className={`member-card member-card-${language.toLowerCase()}`}
                        onClick={() => handleMemberClick(member)}
                        style={{ cursor: "pointer" }}
                      >
                        <div className="member-info">
                          <div className="member-name">
                            {language === 'KO' ? member.nameKo : member.nameEn}
                          </div>
                          <div className="member-position">
                            {language === 'KO' ? member.positionKo : member.positionEn}
                          </div>
                        </div>
                        <div className="member-arrow">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 12 20"
                          >
                            <path
                              fill="currentColor"
                              d="M1.39 0L0 1.406 8.261 10.013 7.38 10.931 7.385 10.926 0.045 18.573 1.414 20C3.443 17.887 9.107 11.986 11 10.013 9.594 8.547 10.965 9.976 1.39 0"
                            />
                          </svg>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Investment Management Part 2 */}
              <div ref={part2Ref} className="leadership-section">
                <h2 className="leadership-section-title">
                  {isTablet 
                    ? (language === "KO" ? "투자운용 Part. 2" : "Investment Management Part. 2")
                    : currentContent.parts[1].title}
                </h2>
                <div className="members-grid">
                  {currentContent.parts[1].members.map(
                    (member, memberIndex) => (
                      <div
                        key={memberIndex}
                        className={`member-card member-card-${language.toLowerCase()}`}
                        onClick={() => handleMemberClick(member)}
                        style={{ cursor: "pointer" }}
                      >
                        <div className="member-info">
                          <div className="member-name">
                            {language === 'KO' ? member.nameKo : member.nameEn}
                          </div>
                          <div className="member-position">
                            {language === 'KO' ? member.positionKo : member.positionEn}
                          </div>
                        </div>
                        <div className="member-arrow">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 12 20"
                          >
                            <path
                              fill="currentColor"
                              d="M1.39 0L0 1.406 8.261 10.013 7.38 10.931 7.385 10.926 0.045 18.573 1.414 20C3.443 17.887 9.107 11.986 11 10.013 9.594 8.547 10.965 9.976 1.39 0"
                            />
                          </svg>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Investment Management Part 3 */}
              <div ref={part3Ref} className="leadership-section">
                <h2 className="leadership-section-title">
                  {isTablet 
                    ? (language === "KO" ? "투자운용 Part. 3" : "Investment Management Part. 3")
                    : currentContent.parts[2].title}
                </h2>
                <div className="members-grid">
                  {currentContent.parts[2].members.map(
                    (member, memberIndex) => (
                      <div
                        key={memberIndex}
                        className={`member-card member-card-${language.toLowerCase()}`}
                        onClick={() => handleMemberClick(member)}
                        style={{ cursor: "pointer" }}
                      >
                        <div className="member-info">
                          <div className="member-name">
                            {language === 'KO' ? member.nameKo : member.nameEn}
                          </div>
                          <div className="member-position">
                            {language === 'KO' ? member.positionKo : member.positionEn}
                          </div>
                        </div>
                        <div className="member-arrow">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 12 20"
                          >
                            <path
                              fill="currentColor"
                              d="M1.39 0L0 1.406 8.261 10.013 7.38 10.931 7.385 10.926 0.045 18.573 1.414 20C3.443 17.887 9.107 11.986 11 10.013 9.594 8.547 10.965 9.976 1.39 0"
                            />
                          </svg>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer language={language} />

      <LeadershipModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        member={selectedMember}
        language={language}
      />
    </div>
  );
};

export default Leadership;
