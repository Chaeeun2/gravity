import { collection, getDocs } from '@firebase/firestore';
import { db } from '../admin/lib/firebase';

// 이미지 preload 함수
const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = () => reject(src);
    img.src = src;
  });
};

// Portfolio 이미지들을 preload하는 함수
export const preloadPortfolioImages = async () => {
  try {
    if (!db) return;

    // Portfolio 컬렉션에서 모든 이미지 URL 가져오기
    const querySnapshot = await getDocs(collection(db, 'portfolio'));
    const imageUrls = [];
    
    querySnapshot.docs.forEach(doc => {
      const data = doc.data();
      // portfolio 항목의 이미지만 추출 (operational-status 등 제외)
      if (data.image && data.titleKo) {
        imageUrls.push(data.image);
      }
    });

    // 모든 이미지를 병렬로 preload
    const preloadPromises = imageUrls.map(url => 
      preloadImage(url).catch(err => {
        console.warn('Failed to preload image:', err);
        return null; // 실패한 이미지는 무시
      })
    );

    await Promise.all(preloadPromises);
    console.log(`Successfully preloaded ${imageUrls.length} portfolio images`);
    
  } catch (error) {
    console.error('Error preloading portfolio images:', error);
  }
};

// 특정 시간 후에 preload 시작하는 함수 (페이지 로드 우선순위 고려)
export const startDelayedPreload = (delayMs = 2000) => {
  setTimeout(() => {
    preloadPortfolioImages();
  }, delayMs);
};