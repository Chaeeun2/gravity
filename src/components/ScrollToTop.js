import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // 페이지 이동 시 스크롤을 top -300으로 설정
    window.scrollTo({
      top: -300,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
}

export default ScrollToTop; 