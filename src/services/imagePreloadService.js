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

// 정적 이미지 URL 목록
const STATIC_IMAGES = [
  'https://pub-71c3fd18357f4781993d048dfb1872c9.r2.dev/main.jpg?format=webp&quality=85',
  'https://pub-71c3fd18357f4781993d048dfb1872c9.r2.dev/favicon.jpg',
  'https://pub-71c3fd18357f4781993d048dfb1872c9.r2.dev/thumbnail.jpg',
];

// Portfolio 이미지들을 preload하는 함수
export const preloadPortfolioImages = async () => {
  try {
    if (!db) return [];

    const querySnapshot = await getDocs(collection(db, 'portfolio'));
    const imageUrls = [];

    querySnapshot.docs.forEach(doc => {
      const data = doc.data();
      if (data.image && data.titleKo) {
        imageUrls.push(data.image);
      }
    });

    return imageUrls;
  } catch (error) {
    return [];
  }
};

// Leadership 이미지들을 preload하는 함수
export const preloadLeadershipImages = async () => {
  try {
    if (!db) return [];

    const querySnapshot = await getDocs(collection(db, 'leadership'));
    const imageUrls = [];

    querySnapshot.docs.forEach(doc => {
      const data = doc.data();
      if (data.image) {
        imageUrls.push(data.image);
      }
    });

    return imageUrls;
  } catch (error) {
    return [];
  }
};

// News 이미지들을 preload하는 함수
export const preloadNewsImages = async () => {
  try {
    if (!db) return [];

    const querySnapshot = await getDocs(collection(db, 'news'));
    const imageUrls = [];

    querySnapshot.docs.forEach(doc => {
      const data = doc.data();
      if (data.image) {
        imageUrls.push(data.image);
      }
    });

    return imageUrls;
  } catch (error) {
    return [];
  }
};

// Disclosure 이미지들을 preload하는 함수
export const preloadDisclosureImages = async () => {
  try {
    if (!db) return [];

    const querySnapshot = await getDocs(collection(db, 'disclosure'));
    const imageUrls = [];

    querySnapshot.docs.forEach(doc => {
      const data = doc.data();
      if (data.image) {
        imageUrls.push(data.image);
      }
    });

    return imageUrls;
  } catch (error) {
    return [];
  }
};

// 모든 이미지를 preload하는 함수
export const preloadAllImages = async () => {
  try {
    // 모든 이미지 URL 수집
    const [portfolioUrls, leadershipUrls, newsUrls, disclosureUrls] = await Promise.all([
      preloadPortfolioImages(),
      preloadLeadershipImages(),
      preloadNewsImages(),
      preloadDisclosureImages(),
    ]);

    // 정적 이미지 + 동적 이미지 결합
    const allImageUrls = [
      ...STATIC_IMAGES,
      ...portfolioUrls,
      ...leadershipUrls,
      ...newsUrls,
      ...disclosureUrls,
    ];

    // 중복 제거
    const uniqueUrls = [...new Set(allImageUrls)];

    // 모든 이미지를 병렬로 preload
    const preloadPromises = uniqueUrls.map(url =>
      preloadImage(url).catch(() => null) // 실패한 이미지는 무시
    );

    await Promise.all(preloadPromises);

  } catch (error) {
  }
};

// 특정 시간 후에 preload 시작하는 함수 (페이지 로드 우선순위 고려)
export const startDelayedPreload = (delayMs = 2000) => {
  setTimeout(() => {
    preloadAllImages();
  }, delayMs);
};