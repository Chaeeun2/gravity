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
                  <a href="#privacy">
                    {currentContent.privacy}
                  </a>
                  <span className="separator">ㅣ</span>
                  <a href="#credit">{currentContent.credit}</a>
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
