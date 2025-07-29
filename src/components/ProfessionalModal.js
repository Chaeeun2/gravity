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
      <div className={`modal-content ${isClosing ? 'closing' : ''}`} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={handleClose}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path fill="currentColor" d="M40 5.172 24 21.172 8 5.172 5.171 8 21.172 24 5.171 40 8 42.828 24 26.828 40 42.828 42.829 40 26.828 24 42.829 8Z"/></svg>
        </button>
        
        <div className="modal-header">
          <h2 className="modal-name">{member.name}</h2>
          <p className="modal-position">{member.position}</p>
        </div>
        
        <div className="modal-body">
          <div className="modal-section">
            <h3 className="experience-title">{currentContent.majorExperience}</h3>
            <ul className="experience-list">
              {member.experience && member.experience.map((exp, index) => (
                <li key={index} className="experience-item">{exp}</li>
              ))}
            </ul>
          </div>
          
          <div className="modal-section">
            <h3 className="education-title">{currentContent.education}</h3>
            <ul className="education-list">
              {member.education && member.education.map((edu, index) => (
                <li key={index} className="education-item">{edu}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalModal; 