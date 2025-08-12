import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser, isAdmin, loading } = useAuth();

  console.log('🔒 ProtectedRoute 상태:', { currentUser: !!currentUser, isAdmin, loading });

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '1.8rem',
        fontFamily: 'Pretendard, sans-serif'
      }}>
        로딩 중...
      </div>
    );
  }

  if (!currentUser || !isAdmin) {
    console.log('❌ 인증 실패, 로그인 페이지로 리다이렉트');
    return <Navigate to="/admin/login" replace />;
  }

  console.log('✅ 인증 성공, 보호된 라우트 접근 허용');
  return children;
};

export default ProtectedRoute;
