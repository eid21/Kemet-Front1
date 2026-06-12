import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { navigationItems } from '../../data/navigationData.js';
import LanguageSwitcher from './LanguageSwitcher.jsx';
import KemetLogo from '../KemetLogo.jsx';

export const Navbar = ({ 
  activeTab, 
  setActiveTab, 
  setSelectedProduct, 
  theme, 
  toggleTheme, 
  setCategoryFilter 
}) => {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="NavbarHeader">
      <div 
        className="LogoBranding" 
        onClick={() => { 
          setSelectedProduct(null); 
          setActiveTab('HOME'); 
          setIsMobileMenuOpen(false);
          window.scrollTo({ top: 0, behavior: 'smooth' }); 
        }}
      >
        <KemetLogo theme={theme} />
        <div className="LogoSubTagline">
          <a 
            href="https://www.dxbalpha.com/" 
            target="_blank" 
            rel="noopener noreferrer" 
            onClick={(e) => e.stopPropagation()}
          >
            by alpha gino
          </a>
        </div>
      </div>
      
      <nav>
        <ul 
          className={`NavigationList ${isMobileMenuOpen ? 'mobile-open' : ''}`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          {navigationItems.map((item) => {
            const key = item.label === 'About Us' ? 'about' : item.label.toLowerCase();
            return (
              <li key={item.id}>
                <a 
                  href={item.href} 
                  className={`NavigationAnchor ${activeTab === item.tab ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedProduct(null);
                    setActiveTab(item.tab);
                    if (item.tab === 'CATALOG' && setCategoryFilter) {
                      setCategoryFilter('ALL');
                    }
                    setIsMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  id={item.id}
                >
                  {t(`nav.${key}`, item.label)}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="HeaderActions">
        <button 
          className="MobileMenuToggle" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="5" x2="21" y2="5"></line><line x1="3" y1="19" x2="21" y2="19"></line></svg>
          )}
        </button>
        <LanguageSwitcher />

        <button 
          className="ThemeSwitcher" 
          onClick={toggleTheme} 
          aria-label="Toggle Light/Dark Theme"
          id="btn-theme-toggle"
        >
          {theme === 'dark' ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="ThemeVectorIcon">
              <circle cx="12" cy="12" r="4"></circle>
              <path d="M12 2v2"></path>
              <path d="M12 20v2"></path>
              <path d="M4.93 4.93l1.41 1.41"></path>
              <path d="M17.66 17.66l1.41 1.41"></path>
              <path d="M2 12h2"></path>
              <path d="M20 12h2"></path>
              <path d="M6.34 17.66l-1.41 1.41"></path>
              <path d="M19.07 4.93l-1.41 1.41"></path>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="ThemeVectorIcon">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          )}
        </button>
        <button 
          className="ButtonPrimary NavQuoteButton" 
          id="btn-get-quote-nav"
          aria-label={t('nav.request_quote')}
          onClick={() => {
            setSelectedProduct(null);
            setActiveTab('HOME');
            setIsMobileMenuOpen(false);
            setTimeout(() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }}
        >
          <span className="NavQuoteLabelFull">{t('nav.request_quote')}</span>
          <span className="NavQuoteLabelShort">{t('nav.request_quote_short')}</span>
          <span className="NavQuoteArrow" aria-hidden="true">&rarr;</span>
          <svg className="NavQuoteIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
