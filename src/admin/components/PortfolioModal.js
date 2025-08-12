import React, { useState, useEffect } from 'react';
import { imageService } from '../services/imageService';

const PortfolioModal = ({ isOpen, onClose, onSave, portfolio, categories = [] }) => {
  // 카테고리 옵션을 props로 받아서 사용
  const categoryOptions = categories.length > 0 ? categories : [
    { id: 'office', label: 'Office' },
    { id: 'logistics', label: 'Logistics' },
    { id: 'residence', label: 'Residence' },
    { id: 'hotel', label: 'Hotel' },
    { id: 'others', label: 'Others' }
  ];

  const [formData, setFormData] = useState({
    image: '',
    category: 'office', // 기본값을 office로 설정
    categoryKo: '',
    categoryEn: '',
    titleKo: '',
    titleEn: '',
    locationKo: '',
    locationEn: '',
    gfa: '',
    floors: ''
  });
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (portfolio) {
      setFormData({
        image: portfolio.image || '',
        category: portfolio.category || 'office',
        categoryKo: portfolio.categoryKo || '',
        categoryEn: portfolio.categoryEn || '',
        titleKo: portfolio.titleKo || '',
        titleEn: portfolio.titleEn || '',
        locationKo: portfolio.locationKo || '',
        locationEn: portfolio.locationEn || '',
        gfa: portfolio.gfa || '',
        floors: portfolio.floors || ''
      });
      setImagePreview(portfolio.image || '');
    } else {
      setFormData({
        image: '',
        category: 'office',
        categoryKo: '',
        categoryEn: '',
        titleKo: '',
        titleEn: '',
        locationKo: '',
        locationEn: '',
        gfa: '',
        floors: ''
      });
      setImagePreview('');
      setImageFile(null);
    }
  }, [portfolio]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // 2MB 이하 체크
      const maxSize = 2 * 1024 * 1024; // 2MB
      if (file.size > maxSize) {
        const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
        alert(`이미지 파일 크기가 너무 큽니다.\n\n현재 파일 크기: ${fileSizeMB}MB\n최대 허용 크기: 2MB\n\n더 작은 이미지 파일을 선택해주세요.`);
        e.target.value = '';
        return;
      }

      // 파일 타입 체크 (이미지 파일만 허용)
      if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 업로드 가능합니다.\n\n지원되는 형식: JPG, PNG, GIF, WebP 등');
        e.target.value = '';
        return;
      }

      setImageFile(file);
      
      // 미리보기 생성
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.titleKo && !formData.titleEn) {
      alert('국문 또는 영문 제목을 입력해주세요.');
      return;
    }

    if (!formData.categoryKo && !formData.categoryEn) {
      alert('국문 또는 영문 분류를 입력해주세요.');
      return;
    }

    try {
      setSaving(true);
      
      // 이미지 파일이 있으면 업로드 처리 (실제 구현에서는 이미지 서비스 사용)
      let finalImageUrl = formData.image;
      if (imageFile) {
        // 여기서 이미지 업로드 서비스 호출
        // finalImageUrl = await imageService.upload(imageFile);
        finalImageUrl = imagePreview; // 임시로 미리보기 URL 사용
      }

      const portfolioData = {
        ...formData,
        image: finalImageUrl
      };

      // 새로 추가하는 경우에만 createdAt과 order 설정
      if (!portfolio) {
        portfolioData.createdAt = new Date();
        portfolioData.order = 999;
      }

      await onSave(portfolioData);
    } catch (error) {
      console.error('저장 오류:', error);
      alert('저장에 실패했습니다.');
    } finally {
      setSaving(false);
    }
  };

  const handleClose = async () => {
    if (saving) return;
    
    // 작성 중인 내용이 있는지 확인
    const hasContent = 
      formData.image || 
      imageFile || 
      formData.categoryKo || 
      formData.categoryEn || 
      formData.titleKo || 
      formData.titleEn || 
      formData.locationKo || 
      formData.locationEn || 
      formData.gfa || 
      formData.floors;
    
    if (hasContent) {
      if (window.confirm('작성 중인 내용이 있습니다. 닫으시겠습니까?')) {
        // 이미지가 Cloudflare에 업로드된 경우 삭제
        if (formData.image && formData.image !== portfolio?.image) {
          try {
            await imageService.deleteFromCloudflare(formData.image);
          } catch (error) {
            console.error('Cloudflare 이미지 삭제 실패:', error);
          }
        }
        
        // 모든 내용 초기화
        setFormData({
          image: '',
          category: 'office',
          categoryKo: '',
          categoryEn: '',
          titleKo: '',
          titleEn: '',
          locationKo: '',
          locationEn: '',
          gfa: '',
          floors: ''
        });
        setImageFile(null);
        setImagePreview('');
        
        onClose();
      }
    } else {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="admin-modal-overlay">
      <div className="admin-modal-content" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
                  <div className="admin-modal-header">
          <h3>{portfolio ? '포트폴리오 수정' : '새 포트폴리오 추가'}</h3>
          <div className="admin-button-group">
            <button
              type="button"
              className="admin-button admin-button-secondary"
              onClick={handleClose}
              disabled={saving}
            >
              취소
            </button>
            <button
              type="submit"
              className="admin-button"
              disabled={saving}
            >
              {saving ? '저장 중...' : (portfolio ? '수정' : '추가')}
            </button>
          </div>
        </div>

                  <div className="admin-modal-body">
            {/* 이미지 업로드 */}
            <div className="admin-form-section">
              <h4>이미지</h4>
              <div className="admin-form-group" style={{ marginBottom: 0 }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="admin-input"
                  id="portfolio-image"
                />
                <small className="admin-form-help-text" style={{paddingTop: '0px', marginBottom: '10px', lineHeight: '1.6' }}>
                  지원 형식: JPG, PNG, GIF, WebP | 최대 크기: 2MB<br/><a href="https://www.adobe.com/kr/express/feature/image/resize/jpg" target="_blank" rel="noopener noreferrer" style={{color: '#666', textDecoration: 'underline'}}>이미지 용량 줄이기 →</a>
                </small>
                {imagePreview && (
                  <div className="admin-image-preview">
                    <img src={imagePreview} alt="미리보기" />
                  </div>
                )}
              </div>
            </div>

            {/* 카테고리 선택 */}
            <div className="admin-form-section">
              <h4>카테고리</h4>
              <div className="admin-form-group" style={{ marginBottom: 0 }}>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="admin-select"
                >
                  {categoryOptions.map(option => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 분류 */}
            <div className="admin-form-section">
              <h4>운용 펀드</h4>
              <div className="admin-form-row">
                <div className="admin-form-group" style={{ marginBottom: 0 }}>
                  <label>국문</label>
                  <input
                    type="text"
                    value={formData.categoryKo}
                    onChange={(e) => handleInputChange('categoryKo', e.target.value)}
                    placeholder="운용 펀드(국문)을 입력하세요"
                    className="admin-input"
                  />
                </div>
                <div className="admin-form-group" style={{ marginBottom: 0 }}>
                  <label>영문</label>
                  <input
                    type="text"
                    value={formData.categoryEn}
                    onChange={(e) => handleInputChange('categoryEn', e.target.value)}
                    placeholder="운용 펀드(영문)을 입력하세요"
                    className="admin-input"
                  />
                </div>
              </div>
            </div>

            {/* 제목 */}
            <div className="admin-form-section">
              <h4>펀드명</h4>
              <div className="admin-form-row">
                <div className="admin-form-group" style={{ marginBottom: 0 }}>
                  <label>국문</label>
                  <input
                    type="text"
                    value={formData.titleKo}
                    onChange={(e) => handleInputChange('titleKo', e.target.value)}
                    placeholder="펀드명(국문)을 입력하세요"
                    className="admin-input"
                  />
                </div>
                <div className="admin-form-group" style={{ marginBottom: 0 }}>
                  <label>영문</label>
                  <input
                    type="text"
                    value={formData.titleEn}
                    onChange={(e) => handleInputChange('titleEn', e.target.value)}
                    placeholder="펀드명(영문)을 입력하세요"
                    className="admin-input"
                  />
                </div>
              </div>
            </div>

            {/* 위치 */}
            <div className="admin-form-section">
              <h4>위치</h4>
              <div className="admin-form-row">
                <div className="admin-form-group" style={{ marginBottom: 0 }}>
                  <label>국문</label>
                  <input
                    type="text"
                    value={formData.locationKo}
                    onChange={(e) => handleInputChange('locationKo', e.target.value)}
                    placeholder="위치(국문)을 입력하세요"
                    className="admin-input"
                  />
                </div>
                <div className="admin-form-group" style={{ marginBottom: 0 }}>
                  <label>영문</label>
                  <input
                    type="text"
                    value={formData.locationEn}
                    onChange={(e) => handleInputChange('locationEn', e.target.value)}
                    placeholder="위치(영문)을 입력하세요"
                    className="admin-input"
                  />
                </div>
              </div>
            </div>

            {/* GFA & 층수 */}
            <div className="admin-form-section">
              <h4>건물 정보</h4>
              <div className="admin-form-row">
                <div className="admin-form-group" style={{ marginBottom: 0 }}>
                  <label>GFA</label>
                  <input
                    type="text"
                    value={formData.gfa}
                    onChange={(e) => handleInputChange('gfa', e.target.value)}
                    placeholder="GFA를 입력하세요"
                    className="admin-input"
                  />
                </div>
                <div className="admin-form-group" style={{ marginBottom: 0 }}>
                  <label>Floor</label>
                  <input
                    type="text"
                    value={formData.floors}
                    onChange={(e) => handleInputChange('floors', e.target.value)}
                    placeholder="층수를 입력하세요"
                    className="admin-input"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PortfolioModal;
