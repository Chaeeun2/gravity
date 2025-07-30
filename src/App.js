import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Overview from './components/Overview';
import Organization from './components/Organization';
import Professional from './components/Professional';
import Contact from './components/Contact';
import Portfolio from './components/Portfolio';
import InvestmentStrategy from './components/InvestmentStrategy';
import InvestmentSystem from './components/InvestmentSystem';
import RiskCompliance from './components/RiskCompliance';
import News from './components/News';
import NewsDetail from './components/NewsDetail';
import Disclosure from './components/Disclosure';
import DisclosureDetail from './components/DisclosureDetail';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const [language, setLanguage] = useState('KO');

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Header 
          language={language} 
          onLanguageChange={handleLanguageChange}
        />
        <Routes>
          <Route path="/" element={<Hero language={language} />} />
          <Route path="/overview" element={<Overview language={language} />} />
          <Route path="/organization" element={<Organization language={language} />} />
          <Route path="/professional" element={<Professional language={language} />} />
          <Route path="/contact" element={<Contact language={language} />} />
          <Route path="/portfolio" element={<Portfolio language={language} />} />
                  <Route path="/investment-strategy" element={<InvestmentStrategy language={language} />} />
        <Route path="/investment-system" element={<InvestmentSystem language={language} />} />
          <Route path="/risk-compliance" element={<RiskCompliance language={language} />} />
          <Route path="/news" element={<News language={language} />} />
          <Route path="/news/:id" element={<NewsDetail language={language} />} />
          <Route path="/disclosure" element={<Disclosure language={language} />} />
          <Route path="/disclosure/:id" element={<DisclosureDetail language={language} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
