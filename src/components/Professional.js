import React, { useEffect, useRef, useState } from "react";
import "./Professional.css";
import Footer from "./Footer";
import ProfessionalModal from "./ProfessionalModal";

const Professional = ({ language }) => {
  const titleRef = useRef(null);
  const managementRef = useRef(null);
  const part1Ref = useRef(null);
  const part2Ref = useRef(null);
  const part3Ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    // 초기 상태 설정 (투명하게)
    if (titleRef.current) {
      titleRef.current.style.opacity = "0";
      titleRef.current.style.transform = "translateY(30px)";
      titleRef.current.classList.remove("animate-fade-in-up");
    }
    if (managementRef.current) {
      managementRef.current.style.opacity = "0";
      managementRef.current.style.transform = "translateY(30px)";
      managementRef.current.classList.remove("animate-fade-in-up");
    }
    if (part1Ref.current) {
      part1Ref.current.style.opacity = "0";
      part1Ref.current.style.transform = "translateY(30px)";
      part1Ref.current.classList.remove("animate-fade-in-up");
    }
    if (part2Ref.current) {
      part2Ref.current.style.opacity = "0";
      part2Ref.current.style.transform = "translateY(30px)";
      part2Ref.current.classList.remove("animate-fade-in-up");
    }
    if (part3Ref.current) {
      part3Ref.current.style.opacity = "0";
      part3Ref.current.style.transform = "translateY(30px)";
      part3Ref.current.classList.remove("animate-fade-in-up");
    }

    // 페이지 로드 시 애니메이션
    const titleTimer = setTimeout(() => {
      if (titleRef.current) {
        titleRef.current.classList.add("animate-fade-in-up");
      }
    }, 100);

    const managementTimer = setTimeout(() => {
      if (managementRef.current) {
        managementRef.current.classList.add("animate-fade-in-up");
      }
    }, 300);

    const part1Timer = setTimeout(() => {
      if (part1Ref.current) {
        part1Ref.current.classList.add("animate-fade-in-up");
      }
    }, 500);

    const part2Timer = setTimeout(() => {
      if (part2Ref.current) {
        part2Ref.current.classList.add("animate-fade-in-up");
      }
    }, 700);

    const part3Timer = setTimeout(() => {
      if (part3Ref.current) {
        part3Ref.current.classList.add("animate-fade-in-up");
      }
    }, 900);

    return () => {
      clearTimeout(titleTimer);
      clearTimeout(managementTimer);
      clearTimeout(part1Timer);
      clearTimeout(part2Timer);
      clearTimeout(part3Timer);
    };
  }, [language]);

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

  const content = {
    EN: {
      title: "Professional",
      subtitle: `On the
      Path of Value`,
      management: {
        title: "Management",
        members: [
          {
            name: "Ho Soon Yim",
            position: "CEO",
            experience: [
              "Current Gravity Asset Management​ CEO",
              "LB AMC Managing Director​",
              "Mirae Asset GI Senior Manager​",
              "Deloitte Anjin LLC FAS Manager",
            ],
            education: [
              "New York University, Masters in Real Estate Finance",
              "Kyunghee University, Bachelor of Architectural Engineering",
            ],
          },
          {
            name: "Ki Sun Kim",
            position: "Senior MD",
            experience: [
              "Current Gravity Asset Management Investment Management Division Senior Managing Director​",
              "LB AMC Managing Director​",
              "Mirae Asset GI Senior Manager",
            ],
            education: [
              "Konkuk University, Masters in Real Estate Finance",
              "Seoul National University, Masters in Industrial Engineering",
              "KAIST,Bachelor of Industrial Engineering",
            ],
          },
          {
            name: "Seung Gun Lee",
            position: "Compliance Officer",
            experience: [
              "Current Gravity Asset Management​ Compliance Officer",
              "LF Asset Management Compliance Officer",
              "Modu Tour REIT Compliance Officer",
            ],
            education: ["Chonnam National University, Bachelor of Statistics"],
          },
        ],
      },
      investment: {
        title: "Investment Management",
        parts: [
          {
            title: "Part. 1",
            members: [
              {
                name: "Jun Hwi Seo",
                position: "Part Leader",
                experience: [
                  "Current head of Gravity Asset Management's investment management part 1",
                  "LB Asset Management Investment Headquarters 3 Investment Team",
                  "DLENC Architectural Quotation Team"
                ],
                education: [
                  "Yonsei University,Graduate School of Architectural Engineering"
                ]
              },
              {
                name: "Jeong Hwan Park",
                position: "Team Leader",
                experience: [
                  "Current head of Gravity Asset Management Investment Management Part 1",
                  "Maston Investment Management, Head of Real Estate Investment Management Headquarters",
                  "Lotte Construction Housing Development Business Management"
                ],
                education: [
                  "Seoul National University,Department of Architecture/Architecture Engineer"
                ]
              },
              {
                name: "Jong Chul Pi",
                position: "Team Leader",
                experience: [
                  "Current head of Gravity Asset Management Investment Management Part 1",
                  "Investment Team at LB Asset Management Investment Management Headquarters 3",
                  "Maston Investment Management Headquarters 1"
                ],
                education: [
                  "University of Nottingham, Bachelor of Economics"
                ]
              },
            ],
          },
          {
            title: "Part. 2",
            members: [
              { 
                name: "Chang Hoon Lee", 
                position: "Part Leader",
                experience: [
                  "Current Head of Gravity Asset Management Part.2",
                  "LB Asset Management Investment Management Team Leader",
                  "Real Estate Investment Team, Mirae Asset Asset Management"
                ],
                education: [
                  "Seoul National University, Department of Business Administration"
                ]
              },
              { 
                name: "Jun Hong Park", 
                position: "Team Leader",
                experience: [
                  "Current Gravity Asset Management Part.2 Team Leader",
                  "LB Asset Management Investment Management Team",
                  "Real Estate Investment Team, Mirae Asset Asset Management"
                ],
                education: [
                  "Yonsei University, Department of Business Administration"
                ]
              },
              { 
                name: "Sung Jae Choi", 
                position: "Team Leader",
                experience: [
                  "Current Gravity Asset Management Part.2 Team Leader",
                  "LB Asset Management Investment Management Team",
                  "Real Estate Investment Team, Mirae Asset Asset Management"
                ],
                education: [
                  "Korea University, Department of Business Administration"
                ]
              },
            ],
          },
          {
            title: "Part. 3",
            members: [
              { 
                name: "Suk Kim", 
                position: "Part Leader",
                experience: [
                  "Current Head of Gravity Asset Management Part.3",
                  "LB Asset Management Investment Management Team Leader",
                  "Real Estate Investment Team, Mirae Asset Asset Management"
                ],
                education: [
                  "Seoul National University,Department of Business Administration"
                ]
              },
              { 
                name: "Yoon Min Kwon", 
                position: "Team Leader",
                experience: [
                  "Current Gravity Asset Management Part.3 Team Leader",
                  "LB Asset Management Investment Management Team",
                  "Real Estate Investment Team, Mirae Asset Asset Management"
                ],
                education: [
                  "Yonsei University, Department of Business Administration"
                ]
              },
            ],
          },
        ],
      },
    },
    KO: {
      title: "Professional",
      subtitle: `On the
      Path of Value`,
      management: {
        title: "경영진",
        members: [
          {
            name: "임호순",
            position: "대표이사 ㅣ CEO",
            experience: [
              "現 그래비티자산운용 대표이사",
              "엘비자산운용 투자운용3본부장",
              "미래에셋자산운용 부동산부문 투자팀",
              "딜로이트 안진 회계법인 FAS팀",
            ],
            education: [
              "美 New York University 부동산금융 석사",
              "경희대학교 건축공학과",
            ],
          },
          {
            name: "김기선",
            position: "본부장 ㅣ Senior MD",
            experience: [
              "現 그래비티 자산운용 전무이사 / 투자운용본부장",
              "엘비자산운용 투자운용 3본부장",
              "미래에셋자산운용 부동산 투자팀",
            ],
            education: [
              "건국대학교 부동산금융투자 석사",
              "서울대학교 산업공학 석사",
              "KAIST 산업공학과",
            ],
          },
          {
            name: "이승건",
            position: "준법감사인 ㅣ Compliance Officer",
            experience: [
              "現 그래비티자산운용 준법감시인",
              "엘에프자산운용 준법감시인",
              "모두투어자기관리부동산투자회사 준법감시인",
            ],
            education: ["전남대학교 자연과학대학 계산통계학"],
          },
        ],
      },
      investment: {
        title: "투자운용",
        parts: [
          {
            title: "Part. 1",
            members: [
              { 
                name: "서준휘", 
                position: "파트장 ㅣ Part Leader",
                experience: [
                  "現 그래비티자산운용 투자운용1파트 파트장",
                  "엘비자산운용 투자운용3본부 투자팀장",
                  "디엘이앤씨 건축견적팀"
                ],
                education: [
                  "연세대학교 대학원 건축공학 석사/건축기사"
                ]
              },
              { 
                name: "박정환", 
                position: "팀장 ㅣ Team Leader",
                experience: [
                  "現 그래비티자산운용 투자운용1파트 팀장",
                  "마스턴투자운용 부동산투자운용본부 팀장",
                  "롯데건설 주택개발사업관리"
                ],
                education: [
                  "서울대학교 건축학과/건축기사"
                ]
              },
              { 
                name: "피종철", 
                position: "팀장 ㅣ Team Leader",
                experience: [
                  "現 그래비티자산운용 투자운용1파트 팀장",
                  "엘비자산운용 투자운용3본부 투자팀",
                  "마스턴투자운용 투자운용1본부"
                ],
                education: [
                  "University of Nottingham, Bachelor of Economics"
                ]
              },
            ],
          },
          {
            title: "Part. 2",
            members: [
              { 
                name: "이창훈", 
                position: "파트장 ㅣ Part Leader",
                experience: [
                  "現 그래비티자산운용 투자운용2파트 파트장",
                  "엘비자산운용 투자운용3본부 투자팀",
                  "미래에셋자산운용 부동산부문 투자팀"
                ],
                education: [
                  "연세대학교 경영학과/KICPA"
                ]
              },
              { 
                name: "박준홍", 
                position: "팀장 ㅣ Team Leader",
                experience: [
                  "現 그래비티자산운용 투자운용2파트 팀장",
                  "CBRE IM 부동산펀드운용부문",
                  "미래에셋자산운용 부동산해외투자팀"
                ],
                education: [
                  "University of Sydney, Bachelor of Commerce"
                ]
              },
              { 
                name: "최성재", 
                position: "팀장 ㅣ Team Leader",
                experience: [
                  "現 그래비티자산운용 투자운용2파트 팀장",
                  "보고펀드자산운용 글로벌부동산투자본부"
                ],
                education: [
                  "Lehigh University, Bachelor of Accounting and BIS"
                ]
              },
            ],
          },
          {
            title: "Part. 3",
            members: [
              { 
                name: "김석", 
                position: "파트장 ㅣ Part Leader",
                experience: [
                  "現 그래비티자산운용 투자운용3파트 파트장",
                  "엘비자산운용 투자운용3본부 투자팀",
                  "미래에셋자산운용 부동산부문 자산관리팀"
                ],
                education: [
                  "Fudan University, Bachelor of Journalism"
                ]
              },
              { 
                name: "권윤민", 
                position: "팀장 ㅣ Team Leader",
                experience: [
                  "現 그래비티자산운용 투자운용3파트 팀장",
                  "삼정회계법인 Deal Advisory4본부",
                  "삼일회계법인 FS본부 감사팀"
                ],
                education: [
                  "성균관대학교 글로벌경영학과/KICPA"
                ]
              },
            ],
          },
        ],
      },
    },
  };

  const currentContent = content[language];

  const handleMemberClick = (member) => {
    console.log('Clicked member:', member); // 디버깅용 로그
    setSelectedMember(member);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedMember(null);
  };

  return (
    <div className="professional-page">
      {/* Header Section */}
      <section className="professional-header">
        <div className="professional-header-content">
          <h1 ref={titleRef} className="professional-title">
            {currentContent.title}
          </h1>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="professional-main">
        <div className="professional-container">
          <div className="professional-content">
            {/* Management Section */}
            <div ref={managementRef} className="professional-section">
              <h2 className="professional-section-title">
                {currentContent.management.title}
              </h2>
              <div className="members-grid">
                {currentContent.management.members.map((member, index) => (
                  <div
                    key={index}
                    className={`member-card member-card-${language.toLowerCase()}`}
                    onClick={() => handleMemberClick(member)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="member-info">
                      <div className="member-name">{member.name}</div>
                      <div className="member-position">{member.position}</div>
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

            {/* Investment Operations Group */}
            <div className="investment-group">
              {/* Investment Operations Part 1 */}
              <div ref={part1Ref} className="professional-section">
                <h2 className="professional-section-title">
                  {isTablet 
                    ? (language === "KO" ? "투자운용 Part. 1" : "Investment Operations Part. 1")
                    : (
                      <div className="part-title-wrapper">
                        <p
                          className={
                            language === "KO" ? "part-title-ko" : "part-title-en"
                          }
                        >
                          {language === "KO" ? "투자운용" : "Investment Operations"}
                        </p>
                        <span>Part. 1</span>
                      </div>
                    )
                  }
                </h2>
                <div className="members-grid">
                  {currentContent.investment.parts[0].members.map(
                    (member, memberIndex) => (
                      <div
                        key={memberIndex}
                        className={`member-card member-card-${language.toLowerCase()}`}
                        onClick={() => handleMemberClick(member)}
                        style={{ cursor: "pointer" }}
                      >
                        <div className="member-info">
                          <div className="member-name">{member.name}</div>
                          <div className="member-position">
                            {member.position}
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

              {/* Investment Operations Part 2 */}
              <div ref={part2Ref} className="professional-section">
                <h2 className="professional-section-title">
                  {isTablet 
                    ? (language === "KO" ? "투자운용 Part. 2" : "Investment Operations Part. 2")
                    : currentContent.investment.parts[1].title}
                </h2>
                <div className="members-grid">
                  {currentContent.investment.parts[1].members.map(
                    (member, memberIndex) => (
                      <div
                        key={memberIndex}
                        className={`member-card member-card-${language.toLowerCase()}`}
                        onClick={() => handleMemberClick(member)}
                        style={{ cursor: "pointer" }}
                      >
                        <div className="member-info">
                          <div className="member-name">{member.name}</div>
                          <div className="member-position">
                            {member.position}
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

              {/* Investment Operations Part 3 */}
              <div ref={part3Ref} className="professional-section">
                <h2 className="professional-section-title">
                  {isTablet 
                    ? (language === "KO" ? "투자운용 Part. 3" : "Investment Operations Part. 3")
                    : currentContent.investment.parts[2].title}
                </h2>
                <div className="members-grid">
                  {currentContent.investment.parts[2].members.map(
                    (member, memberIndex) => (
                      <div
                        key={memberIndex}
                        className={`member-card member-card-${language.toLowerCase()}`}
                        onClick={() => handleMemberClick(member)}
                        style={{ cursor: "pointer" }}
                      >
                        <div className="member-info">
                          <div className="member-name">{member.name}</div>
                          <div className="member-position">
                            {member.position}
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

      <ProfessionalModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        member={selectedMember}
        language={language}
      />
    </div>
  );
};

export default Professional;
