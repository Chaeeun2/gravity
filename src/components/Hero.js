import React from 'react';
import './Hero.css';

const Hero = ({ language }) => {
  const content = {
    EN: {
      headline: "On the Path of Value",
      subtitle: "GRAVITY ASSET MANAGEMENT"
    },
    KO: {
      headline: "On the Path of Value",
      subtitle: "GRAVITY ASSET MANAGEMENT"
    }
  };

  const currentContent = content[language];

  return (
    <section className="hero">
      <img 
        src="https://pub-71c3fd18357f4781993d048dfb1872c9.r2.dev/main.jpg?format=webp&quality=85" 
        alt="Gravity Asset Management Building" 
        className="hero-background-image"
      />
      
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-headline">{currentContent.headline}</h1>
          <div className="headline-line"></div>
          <p className="hero-subtitle">{currentContent.subtitle}</p>
        </div>
      </div>
    </section>
  );
};

export default Hero; 