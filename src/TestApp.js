import React from 'react';

function TestApp() {
  return (
    <div style={{ padding: '20px', fontSize: '24px' }}>
      <h1>테스트 페이지</h1>
      <p>이 페이지가 보인다면 React가 정상 작동하고 있습니다.</p>
      <p>현재 시간: {new Date().toLocaleString()}</p>
    </div>
  );
}

export default TestApp;
