import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Header.css';

const Header = ({ language, onLanguageChange }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuHovered, setIsMenuHovered] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(90);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const navMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 모바일 메뉴 열려있을 때 스크롤 방지
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const calculateHeaderHeight = () => {
    if (!navMenuRef.current) return 90;
    
    const baseHeight = 90;
    const submenuDropdowns = navMenuRef.current.querySelectorAll('.submenu-dropdown');
    
    if (submenuDropdowns.length === 0) return baseHeight;
    
    let maxSubmenuHeight = 0;
    submenuDropdowns.forEach(dropdown => {
      const rect = dropdown.getBoundingClientRect();
      if (rect.height > maxSubmenuHeight) {
        maxSubmenuHeight = rect.height;
      }
    });
    
    return baseHeight + maxSubmenuHeight + 20;
  };

  const handleMenuEnter = () => {
    setIsMenuHovered(true);
    setTimeout(() => {
      const calculatedHeight = calculateHeaderHeight();
      setHeaderHeight(calculatedHeight);
    }, 0);
  };

  const handleMenuLeave = () => {
    setIsMenuHovered(false);
    setHeaderHeight(90);
  };

  const handlePageChange = (page) => {
    navigate(`/${page}`);
    setIsMobileMenuOpen(false); // 모바일 메뉴 닫기
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // 현재 경로에 따라 active 메뉴 확인
  const getActiveMenu = () => {
    const currentPath = location.pathname;
    
    // 각 메뉴 아이템과 서브메뉴를 확인
    for (const item of menuItems) {
      // 서브메뉴가 있는 경우
      if (item.submenu) {
        for (const subItem of item.submenu) {
          if (currentPath === `/${subItem.page}`) {
            return item.name;
          }
        }
      }
      // 서브메뉴가 없는 경우
      else if (item.page && currentPath === `/${item.page}`) {
        return item.name;
      }
    }
    
    // 홈페이지인 경우
    if (currentPath === '/' || currentPath === '') {
      return null;
    }
    
    return null;
  };

  const menuItems = [
    {
      name: 'ABOUT US',
      submenu: [
        { name: 'Overview', page: 'overview' },
        { name: 'Organization', page: 'organization' },
        { name: 'Professional', page: 'professional' },
        { name: 'Contact us', page: 'contact' }
      ]
    },
    {
      name: 'PORTFOLIO',
      submenu: [],
      page: 'portfolio'
    },
    {
      name: 'BUSINESS STRATEGY',
      submenu: [
        { name: 'Investment Strategy', page: 'investment-strategy' },
        { name: 'Investment System', page: 'investment-system' },
        { name: 'Risk & Compliance', page: 'risk-compliance' }
      ]
    },
    {
      name: 'NEWS',
      submenu: [
        { name: '소식', page: 'news' },
        { name: '공시', page: 'disclosure' }
      ]
    }
  ];

  return (
    <>
      {/* Header Overlay - header와 분리 */}
      <div className={`header-overlay ${isMenuHovered ? 'show' : ''}`}></div>
      
      {/* Header */}
      <header 
        ref={headerRef}
        className={`header ${isScrolled ? 'scrolling' : ''} ${isMenuHovered ? 'menu-hovered' : ''}`}
        style={{ height: `${headerHeight}px` }}
      >
        {/* Mobile Menu Overlay */}
        <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'show' : ''}`} onClick={toggleMobileMenu}></div>
        <div className="header-container">
          <div className="logo">
            <img 
              className='logo-white' 
              src="https://pub-71c3fd18357f4781993d048dfb1872c9.r2.dev/logo_white.png" 
              alt="Gravity Asset Management" 
              onClick={() => handlePageChange('')}
              style={{ cursor: 'pointer' }}
            />
            <img 
              className='logo-navy' 
              src="https://pub-71c3fd18357f4781993d048dfb1872c9.r2.dev/logo_navy.png" 
              alt="Gravity Asset Management" 
              onClick={() => handlePageChange('')}
              style={{ cursor: 'pointer' }}
            />
          </div>
          
          {/* Mobile Menu Button */}
          <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
            <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
            <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
            <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
          </button>
          
          <nav className="navigation">
            <ul 
              ref={navMenuRef}
              className="nav-menu"
              onMouseEnter={handleMenuEnter}
              onMouseLeave={handleMenuLeave}
            >
              {menuItems.map((item, index) => {
                // EN 모드에서 NEWS 메뉴 숨기기
                if (language === 'EN' && item.name === 'NEWS') {
                  return null;
                }
                
                return (
                  <li key={index} className="nav-item">
                    <a 
                      href={`#${item.name.toLowerCase().replace(' ', '-')}`}
                      className={getActiveMenu() === item.name ? 'active' : ''}
                      onClick={(e) => {
                        e.preventDefault();
                        // 서브메뉴가 있고 실제 항목이 있는 경우에만 클릭 비활성화
                        if (item.submenu && item.submenu.length > 0) {
                          return false;
                        }
                        // page 속성이 있는 경우 해당 페이지로 이동
                        if (item.page) {
                          handlePageChange(item.page);
                        }
                      }}
                      style={{ 
                        cursor: (item.submenu && item.submenu.length > 0) ? 'default' : 'pointer',
                        pointerEvents: (item.submenu && item.submenu.length > 0) ? 'none' : 'auto'
                      }}
                    >
                      {item.name}
                    </a>
                    {item.submenu && (
                      <ul className="submenu-dropdown">
                        {item.submenu.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            <a 
                              href={`#${subItem.name.toLowerCase().replace(' ', '-')}`}
                              onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(subItem.page);
                              }}
                            >
                              {subItem.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
            
            <div className="language-selector">
              <div className="language-divider"></div>
              <button 
                className={`lang-btn ${language === 'KO' ? 'active' : ''}`}
                onClick={() => onLanguageChange('KO')}
              >
                KO
              </button>
              <div className="language-separator">/</div>
              <button 
                className={`lang-btn ${language === 'EN' ? 'active' : ''}`}
                onClick={() => {
                  // News 페이지, NewsDetail 페이지, 공시 페이지, 공시 상세 페이지에서 EN 버튼을 누르면 홈으로 이동
                  if (location.pathname === '/news' || location.pathname.startsWith('/news/') || 
                      location.pathname === '/disclosure' || location.pathname.startsWith('/disclosure/')) {
                    handlePageChange('');
                  } else {
                    onLanguageChange('EN');
                  }
                }}
              >
                EN
              </button>
            </div>
          </nav>
          
          {/* Mobile Menu */}
          <div ref={mobileMenuRef} className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
            <div className="mobile-menu-content">
              
              <nav className="mobile-navigation">
                <ul className="mobile-nav-menu">
                  {menuItems.map((item, index) => {
                    // EN 모드에서 NEWS 메뉴 숨기기
                    if (language === 'EN' && item.name === 'NEWS') {
                      return null;
                    }
                    
                    return (
                      <li key={index} className="mobile-nav-item">
                        {item.submenu ? (
                          <div className="mobile-menu-group">
                            <div 
                              className="mobile-menu-title"
                              onClick={(e) => {
                                e.preventDefault();
                                if (item.page) {
                                  handlePageChange(item.page);
                                }
                              }}
                              style={{ cursor: item.page ? 'pointer' : 'default' }}
                            >
                              {item.name}
                            </div>
                            {item.submenu.length > 0 && (
                              <ul className="mobile-submenu">
                                {item.submenu.map((subItem, subIndex) => (
                                  <li key={subIndex}>
                                    <a 
                                      href={`#${subItem.name.toLowerCase().replace(' ', '-')}`}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        handlePageChange(subItem.page);
                                      }}
                                    >
                                      {subItem.name}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ) : (
                          <a 
                            href={`#${item.name.toLowerCase().replace(' ', '-')}`}
                            className={getActiveMenu() === item.name ? 'active' : ''}
                            onClick={(e) => {
                              e.preventDefault();
                              if (item.page) {
                                handlePageChange(item.page);
                              }
                            }}
                          >
                            {item.name}
                          </a>
                        )}
                      </li>
                    );
                  })}
                </ul>
                
                <div className="mobile-language-selector">
                  <button 
                    className={`mobile-lang-btn ${language === 'KO' ? 'active' : ''}`}
                    onClick={() => {
                      onLanguageChange('KO');
                      setIsMobileMenuOpen(false); // 모바일 메뉴 닫기
                    }}
                  >
                    KO
                  </button>
                  <div className="mobile-language-separator">/</div>
                  <button 
                    className={`mobile-lang-btn ${language === 'EN' ? 'active' : ''}`}
                    onClick={() => {
                      if (location.pathname === '/news' || location.pathname.startsWith('/news/') || 
                          location.pathname === '/disclosure' || location.pathname.startsWith('/disclosure/')) {
                        handlePageChange('');
                      } else {
                        onLanguageChange('EN');
                      }
                      setIsMobileMenuOpen(false); // 모바일 메뉴 닫기
                    }}
                  >
                    EN
                  </button>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header; 