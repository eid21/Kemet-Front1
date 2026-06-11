import React from 'react';
import { useTranslation } from 'react-i18next';
import './Footer.css';
import KemetLogo from '../KemetLogo.jsx';
import useApi from '../../hooks/useApi.js';
import { getSettings } from '../../services/apiServices.js';

export const Footer = ({ setActiveTab, setSelectedProduct, setCategoryFilter, theme }) => {
  const { t, i18n } = useTranslation();
  const currentYear = new Date().getFullYear();

  const { data: settings } = useApi(
    () => getSettings(),
    null,
    [i18n.language]
  );

  return (
    <footer className="FooterSection">
      {/* Top Banner */}
      <div className="FooterTopBanner">
        <div className="BannerLine"></div>
        <span className="BannerText">{t('footer.top_banner', 'TRUSTED PARTNER FOR HEAVY MACHINERY SOLUTIONS WORLDWIDE')}</span>
        <div className="BannerLine"></div>
      </div>

      <div className="FooterLayoutContainer">
        
        <div className="FooterColumnsGrid">
          
          {/* Brand Column */}
          <div className="FooterColumn BrandColumn">
            <div className="FooterBrandLogoImage" style={{ marginBottom: '15px' }}>
              <KemetLogo theme={theme} />
              <a href="https://www.dxbalpha.com" target="_blank" rel="noopener noreferrer" className="FooterBrandTag" style={{ display: 'block', marginTop: '5px' }}>by alpha gino</a>
            </div>
            <p className="FooterBrandDesc">
              {t('footer.brand_desc')}
            </p>
            
            <ul className="FooterFeaturesList">
              <li>
                <span className="FeatureIcon">✓</span>
                <div className="FeatureText">
                  <strong>{t('footer.feature_1', 'Global Shipping')}</strong>
                </div>
              </li>
              <li>
                <span className="FeatureIcon">✓</span>
                <div className="FeatureText">
                  <strong>{t('footer.feature_2', 'Genuine Spare Parts')}</strong>
                </div>
              </li>
              <li>
                <span className="FeatureIcon">✓</span>
                <div className="FeatureText">
                  <strong>{t('footer.feature_3', 'Expert Technical Support')}</strong>
                </div>
              </li>
            </ul>
          </div>

          {/* Nav Column */}
          <div className="FooterColumn">
            <h3 className="FooterColTitle">{t('footer.nav_title')}</h3>
            <ul className="FooterLinkList">
              <li><a href="#home" onClick={(e) => { e.preventDefault(); setActiveTab('HOME'); window.scrollTo(0,0); }}>{t('nav.home')}</a></li>
              <li><a href="#about" onClick={(e) => { e.preventDefault(); setActiveTab('HOME'); setTimeout(() => document.getElementById('about')?.scrollIntoView({behavior:'smooth'}), 100); }}>{t('nav.about')}</a></li>
              <li><a href="#products" onClick={(e) => { e.preventDefault(); setActiveTab('HOME'); setTimeout(() => document.getElementById('products')?.scrollIntoView({behavior:'smooth'}), 100); }}>{t('nav.products')}</a></li>
              <li><a href="#catalog" onClick={(e) => { e.preventDefault(); setActiveTab('CATALOG'); if(setCategoryFilter) setCategoryFilter('ALL'); window.scrollTo(0,0); }}>{t('nav.catalog')}</a></li>
              <li><a href="#contact" onClick={(e) => { e.preventDefault(); setActiveTab('CONTACT'); window.scrollTo(0,0); }}>{t('nav.contact', 'Contact Us')}</a></li>
              <li><a href="#faq" onClick={(e) => { e.preventDefault(); setActiveTab('FAQ'); window.scrollTo(0,0); }}>{t('nav.faq', 'FAQ')}</a></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="FooterColumn">
            <h3 className="FooterColTitle">{t('footer.contact_title')}</h3>
            <ul className="FooterContactList">
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>{settings?.address || t('footer.address', 'Dubai Airport Building, Office 104, Port Said Area, Dubai, UAE')}</span>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <a href={`tel:${settings?.phone || '+971588603711'}`}>{settings?.phone || '+971 58 860 3711'} (Mobile)</a>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="2"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="currentColor"/></svg>
                <a href={`https://wa.me/${(settings?.whatsapp || '971588603711').replace(/\D/g, '')}`}>{settings?.whatsapp || '+971 58 860 3711'} (WhatsApp)</a>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <a href={`mailto:${settings?.email || 'info@dxbalpha.com'}`}>{settings?.email || 'info@dxbalpha.com'}</a>
              </li>
            </ul>
            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="MapButton">
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              {t('footer.view_map', 'View on Google Maps')} &rarr;
            </a>
          </div>

          {/* Status Column */}
          <div className="FooterColumn">
            <h3 className="FooterColTitle">{t('footer.status_title')}</h3>
            <div className="FooterStatusWidgets">
              <div className="StatusWidget">
                <span className="Dot Online"></span>
                <div className="WidgetText">
                  <strong>{t('footer.hq_title', 'Dubai HQ Dispatch')}</strong>
                  <span>{t('footer.hq_time', 'Mon - Sat: 9:00 AM - 6:00 PM')}</span>
                  <span style={{ color: '#ff4444', fontWeight: 'bold' }}>• {t('footer.sunday_closed', 'Sunday Closed')}</span>
                </div>
              </div>
              <div className="StatusWidget">
                <span className="Dot Standby"></span>
                <div className="WidgetText">
                  <strong>{t('footer.gcc_fleet', 'GCC Service Fleet')}</strong>
                  <span>{t('footer.dispatch_active', '24/7 Emergency Dispatch Active')}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Stats Row */}
        <div className="FooterStatsRow">
          <div className="StatItem">
            <span className="StatIcon">🌍</span>
            <span className="StatText">Worldwide Delivery</span>
          </div>
          <div className="StatItem">
            <span className="StatIcon">🛠</span>
            <span className="StatText">Genuine Parts</span>
          </div>
          <div className="StatItem">
            <span className="StatIcon">⚡</span>
            <span className="StatText">High Performance</span>
          </div>
          <div className="StatItem">
            <span className="StatIcon">🤝</span>
            <span className="StatText">Dedicated Support</span>
          </div>
        </div>

        <div className="FooterBottomRow">
          <div className="FooterCopyright">
            {t('footer.copyright', { year: currentYear })}
          </div>
          <div className="FooterSlogan">
            <span className="KemetLogomark">KEMET</span>
            {t('footer.slogan')}
          </div>
          <div className="FooterLegalLinks">
            <a href="#privacy" onClick={(e) => { e.preventDefault(); setActiveTab('PRIVACY'); window.scrollTo(0,0); }}>{t('footer.privacy', 'Privacy Policy')}</a>
            <span style={{ color: 'var(--text-gray)', margin: '0 10px' }}>|</span>
            <a href="#terms" onClick={(e) => { e.preventDefault(); setActiveTab('TERMS'); window.scrollTo(0,0); }}>{t('footer.terms', 'Terms & Conditions')}</a>
            <span style={{ color: 'var(--text-gray)', margin: '0 10px' }}>|</span>
            <a href="https://www.dxbalpha.com" target="_blank" rel="noopener noreferrer">dxbalpha.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
