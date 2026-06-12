import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useApi from '../../hooks/useApi.js';
import { getBanners } from '../../services/apiServices.js';

export const Hero = ({ setActiveTab, setCategoryFilter }) => {
  const { t, i18n } = useTranslation();
  
  const { data: apiBanners } = useApi(
    () => getBanners(),
    null,
    [i18n.language]
  );

  const defaultAssets = [
    '/e8b355cf-0bc2-46a5-b04d-df9c8c91c2e1.png',
    '/cb199604-395a-4c2b-880b-886c2ddd3ba7.png',
    '/19cd5b10-5085-4f4d-8707-b583f70539be.png'
  ];

  // If API returns banners, use their image URLs, else use defaults
  const slideshowAssets = apiBanners && apiBanners.length > 0 
    ? apiBanners.map(b => b.image_url || b.image || b) 
    : defaultAssets;

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const nextSlide = () => {
    setActiveSlideIndex((prev) => (prev + 1) % slideshowAssets.length);
  };

  const prevSlide = () => {
    setActiveSlideIndex((prev) => (prev - 1 + slideshowAssets.length) % slideshowAssets.length);
  };

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      if (i18n.dir() === 'rtl') prevSlide();
      else nextSlide();
    } else if (isRightSwipe) {
      if (i18n.dir() === 'rtl') nextSlide();
      else prevSlide();
    }
  };

  return (
    <section className="HeroBlock" id="home">
      <div 
        className="HeroSlideshowGrid"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {slideshowAssets.map((bgAsset, idx) => (
          <div 
            key={idx}
            className={`HeroSlideFrame ${activeSlideIndex === idx ? 'active' : ''}`}
            style={{ backgroundImage: `url(${bgAsset})` }}
          />
        ))}
        
        {slideshowAssets.length > 1 && (
          <>
            <button className="HeroSliderArrow PrevArrow" onClick={prevSlide} aria-label="Previous slide">
              &#10094;
            </button>
            <button className="HeroSliderArrow NextArrow" onClick={nextSlide} aria-label="Next slide">
              &#10095;
            </button>
            <div className="HeroSliderPagination">
              {slideshowAssets.map((_, idx) => (
                <button 
                  key={idx} 
                  className={`HeroSliderDot ${activeSlideIndex === idx ? 'active' : ''}`}
                  onClick={() => setActiveSlideIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="HeroVignetteOverlay"></div>

      <div className="HeroDetailsPanel">
        <div className="HeroSectorBadges fade-up-reveal speed-1">
          <span className="SectorBadge">{t('hero.sector_construction', 'Construction')}</span>
          <span className="SectorBadgeDot">•</span>
          <span className="SectorBadge">{t('hero.sector_mining', 'Mining')}</span>
          <span className="SectorBadgeDot">•</span>
          <span className="SectorBadge">{t('hero.sector_agriculture', 'Agriculture')}</span>
        </div>
        
        <h1 className="HeroCoreHeadline">
          <span className="fade-up-reveal speed-2">{t('hero.headline_1')}</span>
          <span className="fade-up-reveal speed-3">{t('hero.headline_2')}</span>
          <span className="fade-up-reveal highlight speed-4">{t('hero.headline_3')}</span>
        </h1>
        
        <p className="HeroBodyText fade-up-reveal speed-5">
          {t('hero.body')}
        </p>
        
        <div className="HeroActionGroup fade-up-reveal speed-6">
          <button 
            className="ButtonPrimary" 
            id="btn-browse-equipment" 
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {t('hero.btn_browse')} <span>&rarr;</span>
          </button>
          <button 
            className="ButtonSecondary" 
            id="btn-view-catalog" 
            onClick={() => { 
              setActiveTab('CATALOG'); 
              if (setCategoryFilter) setCategoryFilter('ALL'); 
              window.scrollTo({ top: 0, behavior: 'smooth' }); 
            }}
          >
            {t('hero.btn_catalog')}
          </button>
        </div>
      
      </div>

      <div className="HeroKeyMetricsPanel">
        <div className="MetricIndicatorCard">
          <div className="MetricVectorFrame">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="MetricVector">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <polyline points="9 11 11 13 15 9"/>
            </svg>
          </div>
          <div className="MetricCardContent">
            <span className="MetricLabel">{t('hero.metrics.original.title')}</span>
            <span className="MetricSubText">{t('hero.metrics.original.desc')}</span>
          </div>
        </div>
        
        <div className="MetricIndicatorCard">
          <div className="MetricVectorFrame">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="MetricVector">
              <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
              <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
            </svg>
          </div>
          <div className="MetricCardContent">
            <span className="MetricLabel">{t('hero.metrics.support.title')}</span>
            <span className="MetricSubText">{t('hero.metrics.support.desc')}</span>
          </div>
        </div>
        
        <div className="MetricIndicatorCard">
          <div className="MetricVectorFrame">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="MetricVector">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
          </div>
          <div className="MetricCardContent">
            <span className="MetricLabel">{t('hero.metrics.shipping.title')}</span>
            <span className="MetricSubText">{t('hero.metrics.shipping.desc')}</span>
          </div>
        </div>
        
        <div className="MetricIndicatorCard">
          <div className="MetricVectorFrame">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="MetricVector">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
          </div>
          <div className="MetricCardContent">
            <span className="MetricLabel">{t('hero.metrics.parts.title')}</span>
            <span className="MetricSubText">{t('hero.metrics.parts.desc')}</span>
          </div>
        </div>
      </div>
      <div className="HeroAmbientBrandname">{t('hero.kemet_watermark')}</div>
    </section>
  );
};

export default Hero;
