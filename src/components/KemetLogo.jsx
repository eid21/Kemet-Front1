import React from 'react';

export const KemetLogo = ({ theme = 'dark', className = '', showText = true }) => {
  const iconColorPrimary = '#41d800'; // Green
  const iconColorSecondary = theme === 'dark' ? '#ffffff' : '#0a0b0d';

  return (
    <div className={`KemetLogoContainer ${className}`} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <svg 
        viewBox="150 50 600 600" 
        style={{ height: '42px', width: 'auto', flexShrink: 0 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path fill={theme === 'dark' ? "var(--text-white)" : "#111827"} d="M358.41,53.84h-124.43c-43.39,0-78.57,35.18-78.57,78.57v185.46L358.41,53.84Z"/>
        <path fill={iconColorPrimary} d="M328.78,326.67l104.21,61c22.07,12.92,50.3,7.37,65.84-12.94L744.33,53.84h-240.78c-24.47,0-47.53,11.4-62.4,30.83L184.09,420.66c-69.53,90.89-4.73,222.06,109.7,222.06h446.92l-.05-.04-411.87-316.01ZM458.14,311.14c14,0,25.35,11.35,25.35,25.35s-11.35,25.35-25.35,25.35-25.35-11.35-25.35-25.35,11.35-25.35,25.35-25.35ZM290.09,560.39c-31.91,0-57.78-25.87-57.78-57.78s25.87-57.78,57.78-57.78,57.78,25.87,57.78,57.78-25.87,57.78-57.78,57.78Z"/>
        <circle fill={iconColorPrimary} cx="290.09" cy="502.61" r="25.35"/>
      </svg>
      
      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '4px' }}>
          <span className="KemetLogoText" style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 900,
            fontSize: '34px',
            letterSpacing: '0.01em',
            color: theme === 'dark' ? 'var(--text-white)' : '#111827',
            lineHeight: 1
          }}>
            KEMET
          </span>
          <span className="KemetLogoTagline" style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            fontSize: '8px',
            letterSpacing: '0.15em',
            color: theme === 'dark' ? '#a5aab5' : '#505663',
            lineHeight: 1,
            marginTop: '4px',
            textTransform: 'uppercase'
          }}>
            THE POWER TO BUILD HORIZONS
          </span>
        </div>
      )}
    </div>
  );
};

export default KemetLogo;
