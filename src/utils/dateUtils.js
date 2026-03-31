// 날짜 포맷팅 유틸리티 함수들

/**
 * Firestore Timestamp 또는 Date 객체를 일관된 Date 객체로 변환
 */
export const normalizeDate = (timestamp) => {
  if (!timestamp) return null;
  
  if (timestamp?.toDate) {
    // Firestore Timestamp
    return timestamp.toDate();
  } else if (timestamp instanceof Date) {
    // Already a Date object
    return timestamp;
  } else {
    // String or other format
    return new Date(timestamp);
  }
};

/**
 * 날짜를 datetime-local input 형식으로 변환 (YYYY-MM-DDTHH:MM)
 */
export const formatForDateTimeInput = (timestamp) => {
  const date = normalizeDate(timestamp);
  if (!date) return '';
  
  // 로컬 시간으로 변환
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

/**
 * 날짜를 표시용 형식으로 변환 (한국 형식)
 */
export const formatForDisplay = (timestamp, options = {}) => {
  const date = normalizeDate(timestamp);
  if (!date) return '';
  
  const defaultOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  };
  
  // 시간 표시 여부에 따라 옵션 조정
  const formatOptions = options.includeTime 
    ? { ...defaultOptions, ...options }
    : { 
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        ...options 
      };
  
  return date.toLocaleDateString('ko-KR', formatOptions);
};

/**
 * 날짜를 간단한 형식으로 변환 (YYYY-MM-DD)
 */
export const formatSimpleDate = (timestamp) => {
  const date = normalizeDate(timestamp);
  if (!date) return '';
  
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
};

/**
 * 모바일용 간단한 날짜 형식 (MM/DD)
 */
export const formatMobileDate = (timestamp) => {
  const date = normalizeDate(timestamp);
  if (!date) return '';
  
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return `${month}/${day}`;
};

/**
 * publishDate 우선, 없으면 createdAt 사용
 */
export const getDisplayDate = (item) => {
  return item.publishDate || item.createdAt;
};

/**
 * datetime-local input 값을 Date 객체로 변환
 * 로컬 타임존 정보를 유지
 */
export const parseDateTime = (dateTimeValue) => {
  if (!dateTimeValue) return new Date();
  
  // datetime-local 값은 이미 로컬 시간이므로 그대로 Date 객체로 변환
  return new Date(dateTimeValue);
};

/**
 * 날짜 정렬 헬퍼 함수
 */
export const sortByDate = (items, ascending = false) => {
  return items.sort((a, b) => {
    const dateA = normalizeDate(getDisplayDate(a));
    const dateB = normalizeDate(getDisplayDate(b));
    
    if (!dateA && !dateB) return 0;
    if (!dateA) return 1;
    if (!dateB) return -1;
    
    const timeA = dateA.getTime();
    const timeB = dateB.getTime();
    
    return ascending ? timeA - timeB : timeB - timeA;
  });
};

/**
 * 중요공지 우선, 날짜순 정렬
 */
export const sortWithImportant = (items, ascending = false) => {
  return items.sort((a, b) => {
    // 중요공지 우선
    if (a.isImportant && !b.isImportant) return -1;
    if (!a.isImportant && b.isImportant) return 1;
    
    // 둘 다 중요공지이거나 둘 다 일반인 경우 날짜로 정렬
    const dateA = normalizeDate(getDisplayDate(a));
    const dateB = normalizeDate(getDisplayDate(b));
    
    if (!dateA && !dateB) return 0;
    if (!dateA) return 1;
    if (!dateB) return -1;
    
    const timeA = dateA.getTime();
    const timeB = dateB.getTime();
    
    return ascending ? timeA - timeB : timeB - timeA;
  });
};