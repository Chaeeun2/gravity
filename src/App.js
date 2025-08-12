import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Overview from './components/Overview';
import Leadership from './components/Leadership';
import Portfolio from './components/Portfolio';
import InvestmentStrategy from './components/InvestmentStrategy';
import InvestmentProcess from './components/InvestmentProcess';
import RiskCompliance from './components/RiskCompliance';
import News from './components/News';
import NewsDetail from './components/NewsDetail';
import Contact from './components/Contact';
import Organization from './components/Organization';
import Disclosure from './components/Disclosure';
import DisclosureDetail from './components/DisclosureDetail';
import ScrollToTop from './components/ScrollToTop';
import AdminApp from './admin/Admin';

function App() {
  const [language, setLanguage] = useState('KO');

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Routes>
          <Route path="/" element={
            <>
              <Header language={language} onLanguageChange={handleLanguageChange} />
              <Hero language={language} />
            </>
          } />
          <Route path="/overview" element={
            <>
              <Header language={language} onLanguageChange={handleLanguageChange} />
              <Overview language={language} />
            </>
          } />
          <Route path="/leadership" element={
            <>
              <Header language={language} onLanguageChange={handleLanguageChange} />
              <Leadership language={language} />
            </>
          } />
          <Route path="/portfolio" element={
            <>
              <Header language={language} onLanguageChange={handleLanguageChange} />
              <Portfolio language={language} />
            </>
          } />
          <Route path="/investment-strategy" element={
            <>
              <Header language={language} onLanguageChange={handleLanguageChange} />
              <InvestmentStrategy language={language} />
            </>
          } />
          <Route path="/investment-process" element={
            <>
              <Header language={language} onLanguageChange={handleLanguageChange} />
              <InvestmentProcess language={language} />
            </>
          } />
          <Route path="/risk-compliance" element={
            <>
              <Header language={language} onLanguageChange={handleLanguageChange} />
              <RiskCompliance language={language} />
            </>
          } />
          <Route path="/news" element={
            <>
              <Header language={language} onLanguageChange={handleLanguageChange} />
              <News language={language} />
            </>
          } />
          <Route path="/news/:id" element={
            <>
              <Header language={language} onLanguageChange={handleLanguageChange} />
              <NewsDetail language={language} />
            </>
          } />
          <Route path="/contact" element={
            <>
              <Header language={language} onLanguageChange={handleLanguageChange} />
              <Contact language={language} />
            </>
          } />
          <Route path="/organization" element={
            <>
              <Header language={language} onLanguageChange={handleLanguageChange} />
              <Organization language={language} />
            </>
          } />
          <Route path="/disclosure" element={
            <>
              <Header language={language} onLanguageChange={handleLanguageChange} />
              <Disclosure language={language} />
            </>
          } />
          <Route path="/disclosure/:id" element={
            <>
              <Header language={language} onLanguageChange={handleLanguageChange} />
              <DisclosureDetail language={language} />
            </>
          } />
          <Route path="/test" element={
            <div style={{ padding: '20px', fontSize: '24px' }}>
              <h1>테스트 페이지</h1>
              <p>라우팅이 정상 작동합니다!</p>
            </div>
          } />
          
          {/* Admin Routes */}
          <Route path="/admin/*" element={<AdminApp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
