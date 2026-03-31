import React, { useState, useEffect } from 'react';
import './ProfessionalModal.css';

const ProfessionalModal = ({ isOpen, onClose, member, language }) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 150);
  };

  if (!isOpen || !member) return null;

  const content = {
    EN: {
          majorExperience: "Industry Experience",
      education: "Education",
    },
    KO: {
      majorExperience: "주요경력",
      education: "학력",
    },
  };

  const currentContent = content[language];

  return (
    <div className={`modal-overlay ${isClosing ? 'closing' : ''}`} onClick={handleClose}>
      <div className={`modal-content ${isClosing ? 'closing' : ''} modal-content-${language.toLowerCase()}`} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={handleClose}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path fill="currentColor" d="M40 5.172 24 21.172 8 5.172 5.171 8 21.172 24 5.171 40 8 42.828 24 26.828 40 42.828 42.829 40 26.828 24 42.829 8Z"/></svg>
        </button>
        
        <div className={`modal-header modal-header-${language.toLowerCase()}`}>
          <h2 className={`modal-name modal-name-${language.toLowerCase()}`}>{member.name}</h2>
          <p className={`modal-position modal-position-${language.toLowerCase()}`}>{member.position}</p>
        </div>
        
        <div className={`modal-body modal-body-${language.toLowerCase()}`}>
          <div className={`modal-section modal-section-${language.toLowerCase()}`}>
            <h3 className={`experience-title experience-title-${language.toLowerCase()}`}>{currentContent.majorExperience}</h3>
            <ul className={`experience-list experience-list-${language.toLowerCase()}`}>
              {member.experience && member.experience.map((exp, index) => (
                <li key={index} className={`experience-item experience-item-${language.toLowerCase()}`}>{exp}</li>
              ))}
            </ul>
          </div>
          
          <div className={`modal-section modal-section-${language.toLowerCase()}`}>
            <h3 className={`education-title education-title-${language.toLowerCase()}`}>{currentContent.education}</h3>
            <ul className={`education-list education-list-${language.toLowerCase()}`}>
              {member.education && member.education.map((edu, index) => (
                <li key={index} className={`education-item education-item-${language.toLowerCase()}`}>{edu}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalModal; 