import React from "react";
import "./Footer.css";

const Footer = ({ language = 'KO' }) => {
  const content = {
    EN: {
      address: "23F, 41, Cheonggyecheon-ro, Jongno-gu, Seoul, Republic of Korea",
      tel: "+82-2-6952-4790",
      fax: "+82-2-6952-4791",
      privacy: "Privacy Policy",
      credit: "Credit Information System",
      copyright: "Copyright © GRAVITY ASSET MANAGEMENT Inc. All Rights Reserved."
    },
    KO: {
      address: "서울특별시 종로구 청계천로 41, 23층 (서린동, 영풍빌딩)",
      tel: "+82-2-6952-4790",
      fax: "+82-2-6952-4791",
      privacy: "개인정보처리 및 영상정보처리기기운용관리 방침",
      credit: "신용정보활용체제",
      copyright: "Copyright © GRAVITY ASSET MANAGEMENT Inc. All Rights Reserved."
    }
  };

  // PDF 다운로드 함수
  const handleDownload = (url, filename) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const currentContent = content[language];
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
                    target="_blank"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDownload(
                        'https://pub-71c3fd18357f4781993d048dfb1872c9.r2.dev/%E1%84%80%E1%85%A2%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%87%E1%85%A9%E1%84%8E%E1%85%A5%E1%84%85%E1%85%B5%20%E1%84%87%E1%85%A1%E1%86%BC%E1%84%8E%E1%85%B5%E1%86%B7%20%E1%84%86%E1%85%B5%E1%86%BE%20%E1%84%8B%E1%85%A7%E1%86%BC%E1%84%89%E1%85%A1%E1%86%BC%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%87%E1%85%A9%E1%84%8E%E1%85%A5%E1%84%85%E1%85%B5%E1%84%80%E1%85%B5%E1%84%80%E1%85%B5%E1%84%8B%E1%85%AE%E1%86%AB%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%80%E1%85%AA%E1%86%AB%E1%84%85%E1%85%B5%20%E1%84%87%E1%85%A1%E1%86%BC%E1%84%8E%E1%85%B5%E1%86%B7.pdf',
                        language === 'KO' ? '개인정보처리방침.pdf' : 'Privacy_Policy.pdf'
                      );
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    {currentContent.privacy}
                  </a>
                  <span className="separator">ㅣ</span>
                  <a 
                    href="#credit"
                    target="_blank"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDownload(
                        'https://pub-71c3fd18357f4781993d048dfb1872c9.r2.dev/%E1%84%89%E1%85%B5%E1%86%AB%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%87%E1%85%A9%E1%84%92%E1%85%AA%E1%86%AF%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%8E%E1%85%A6%E1%84%8C%E1%85%A6.pdf',
                        language === 'KO' ? '신용정보활용체제.pdf' : 'Credit_Info_System.pdf'
                      );
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
