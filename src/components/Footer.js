import React, { useState, useEffect } from "react";
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../admin/lib/firebase';
import { imageService } from '../admin/services/imageService';
import "./Footer.css";

const Footer = ({ language = 'KO' }) => {
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Firebase에서 Contact 데이터 로드
  useEffect(() => {
    const loadContactData = async () => {
      try {
        if (db) {
          // contact 컬렉션의 main 문서에서 직접 데이터 가져오기
          const contactRef = doc(db, 'contact', 'main');
          const contactSnap = await getDoc(contactRef);
          
          if (contactSnap.exists()) {
            const data = contactSnap.data();
            setContactData(data);
          }
        }
      } catch (error) {
        // console.error('Contact 데이터 로드 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContactData();
  }, []);

  const content = {
    EN: {
      address: contactData?.addressEn || "23F, 41, Cheonggyecheon-ro, Jongno-gu, Seoul, Republic of Korea",
      tel: contactData?.tel || "+82-2-6952-4790",
      fax: contactData?.fax || "+82-2-6952-4791",
      privacy: "Privacy Policy",
      credit: "Credit Information System",
      copyright: "Copyright © GRAVITY ASSET MANAGEMENT Inc. All Rights Reserved."
    },
    KO: {
      address: contactData?.addressKo || "서울특별시 종로구 청계천로 41, 23층 (서린동, 영풍빌딩)",
      tel: contactData?.tel || "+82-2-6952-4790",
      fax: contactData?.fax || "+82-2-6952-4791",
      privacy: "개인정보처리 및 영상정보처리기기운영관리 방침",
      credit: "신용정보활용체제",
      copyright: "Copyright © GRAVITY ASSET MANAGEMENT Inc. All Rights Reserved."
    }
  };

  // PDF 다운로드 함수
  const handleDownload = async (pdfUrl, filename) => {
    if (!pdfUrl) {
      // console.error('PDF URL이 없습니다.');
      return;
    }

    // 모바일 기기 감지
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    try {
      if (isMobile) {
        // 모바일: 새 창에서 열기 (브라우저가 다운로드 옵션 제공)
        const newWindow = window.open(pdfUrl, '_blank');
        
        // iOS Safari의 경우 추가 처리
        if (isIOS && newWindow) {
          // iOS에서는 명시적으로 다운로드 속성 지원 안함
          // 사용자가 직접 공유 버튼 → 파일로 저장 선택하도록 유도
          setTimeout(() => {
            if (newWindow && !newWindow.closed) {
              // 팝업이 차단되지 않았으면 아무것도 하지 않음
            } else {
              // 팝업이 차단된 경우 현재 창에서 열기
              window.location.href = pdfUrl;
            }
          }, 100);
        }
      } else {
        // PC: 기존 blob 다운로드 방식
        const response = await fetch(pdfUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = filename;
        link.style.display = 'none';
        
        document.body.appendChild(link);
        link.click();
        
        // 정리
        setTimeout(() => {
          document.body.removeChild(link);
          window.URL.revokeObjectURL(blobUrl);
        }, 100);
      }
    } catch (error) {
      // console.error('다운로드 처리 오류:', error);
      
      // Fallback: 새 탭에서 열기
      try {
        window.open(pdfUrl, '_blank');
      } catch (finalError) {
        // console.error('최종 fallback도 실패:', finalError);
        }
      }
    }
  };

  const currentContent = content[language];

  if (loading) {
    return (
      <footer className={`overview-footer overview-footer-${language.toLowerCase()}`}>
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-left">
              <div className="footer-logo">
                <img
                  className="footer-logo-navy"
                  src="https://pub-71c3fd18357f4781993d048dfb1872c9.r2.dev/logo_navy.png"
                  alt="Gravity Asset Management"
                />
              </div>
              <div className={`footer-info footer-info-${language.toLowerCase()}`}>
                {currentContent.address}
                <br />
                <span className="footer-info-strong">TEL</span> {currentContent.tel} ㅣ <span className="footer-info-strong">FAX</span> {currentContent.fax}
              </div>
            </div>
            <div className="footer-right">
              <div className="footer-links">
                <div className="footer-policies">
                  <span style={{ color: '#999' }}>PDF 로딩 중...</span>
                </div>
                <div className="footer-copyright">
                  {currentContent.copyright}
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className={`overview-footer overview-footer-${language.toLowerCase()}`}>
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-left">
            <div className="footer-logo">
              <img
                className="footer-logo-navy"
                src="https://pub-71c3fd18357f4781993d048dfb1872c9.r2.dev/logo_navy.png"
                alt="Gravity Asset Management"
              />
            </div>
            <div className={`footer-info footer-info-${language.toLowerCase()}`}>
              {currentContent.address}
              <br />
              <span className="footer-info-strong">TEL</span> {currentContent.tel} ㅣ <span className="footer-info-strong">FAX</span> {currentContent.fax}
            </div>
          </div>
          <div className="footer-right">
            <div className="footer-links">
                <div className="footer-policies">
                  <a 
                    href="#privacy"
                    onClick={(e) => {
                      e.preventDefault();
                      if (contactData?.privacyVideoPolicyPdf) {
                        // 파일명을 원본 파일명으로 변환
                        const storedFileName = contactData.privacyVideoPolicyPdf.split('/').pop();
                        const originalFileName = imageService.getOriginalFileName(storedFileName);
                        
                        handleDownload(
                          contactData.privacyVideoPolicyPdf,
                          originalFileName
                        );
                      }
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    {currentContent.privacy}
                  </a>
                  <span className="separator">ㅣ</span>
                  <a 
                    href="#credit"
                    onClick={(e) => {
                      e.preventDefault();
                      if (contactData?.creditInfoPdf) {
                        // 파일명을 원본 파일명으로 변환
                        const storedFileName = contactData.creditInfoPdf.split('/').pop();
                        const originalFileName = imageService.getOriginalFileName(storedFileName);
                        
                        handleDownload(
                          contactData.creditInfoPdf,
                          originalFileName
                        );
                      }
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    {currentContent.credit}
                  </a>
                </div>
              <div className="footer-copyright">
                {currentContent.copyright}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
