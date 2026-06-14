import React from 'react';
import { useTranslation } from 'react-i18next';

export const KemetLogo = ({ theme = 'dark', className = '', showText = true }) => {
  const { t } = useTranslation();
  const iconColorPrimary = '#41d800'; // Green
  
  return (
    <div 
      className={`KemetLogoContainer ${className}`} 
      style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '12px' }}
      onClick={() => window.location.href = '/'}
    >
      <svg 
        viewBox="150 50 600 600" 
        className="kemet-logo-svg"
        style={{ height: '60px', width: 'auto', flexShrink: 0 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path fill={theme === 'dark' ? "#ffffff" : "#0f172a"} d="M358.41,53.84h-124.43c-43.39,0-78.57,35.18-78.57,78.57v185.46L358.41,53.84Z"/>
        <path fill={iconColorPrimary} d="M328.78,326.67l104.21,61c22.07,12.92,50.3,7.37,65.84-12.94L744.33,53.84h-240.78c-24.47,0-47.53,11.4-62.4,30.83L184.09,420.66c-69.53,90.89-4.73,222.06,109.7,222.06h446.92l-.05-.04-411.87-316.01ZM458.14,311.14c14,0,25.35,11.35,25.35,25.35s-11.35,25.35-25.35,25.35-25.35-11.35-25.35-25.35,11.35-25.35,25.35-25.35ZM290.09,560.39c-31.91,0-57.78-25.87-57.78-57.78s25.87-57.78,57.78-57.78,57.78,25.87,57.78,57.78-25.87,57.78-57.78,57.78Z"/>
        <path fill={iconColorPrimary} d="M474,427 l80,-25 l-30,70 Z M554,488 l80,-25 l-30,70 Z M634,550 l80,-25 l-30,70 Z" />
        <circle fill={iconColorPrimary} cx="290.09" cy="502.61" r="25.35"/>
      </svg>
      
      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', marginTop: '3px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', position: 'relative' }}>
            <span className="KemetLogoRegistered" style={{
              position: 'absolute',
              top: '-10px',
              left: '2px',
              fontSize: '18px',
              fontWeight: 'bold',
              color: theme === 'dark' ? '#ffffff' : '#0f172a',
              WebkitFontSmoothing: 'antialiased'
            }}>®</span>
            <span className="KemetLogoText" style={{
              fontFamily: "'Roboto Slab', serif",
              fontWeight: 900,
              fontSize: '46px',
              letterSpacing: '-0.02em',
              color: theme === 'dark' ? '#ffffff' : '#0f172a',
              lineHeight: 1,
              textTransform: 'uppercase',
              WebkitFontSmoothing: 'antialiased'
            }}>
              KEMET
            </span>
          </div>
          <span className="KemetLogoTagline" style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 800,
            fontSize: '11px',
            letterSpacing: '0.05em',
            color: theme === 'dark' ? '#ffffff' : '#0f172a',
            lineHeight: 1,
            marginTop: '4px',
            textTransform: 'uppercase',
            WebkitFontSmoothing: 'antialiased'
          }}>
            THE POWER TO BUILD NATIONS
          </span>
        </div>
      )}
    </div>
  );
};

export default KemetLogo;
