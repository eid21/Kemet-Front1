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
      <div className="FooterLayoutContainer">
        
        <div className="FooterColumnsGrid">
          
          {/* Column 1: Brand */}
          <div className="FooterColumn BrandColumn">
            <div className="FooterBrandLogoImage" style={{ marginBottom: '15px' }}>
              <KemetLogo theme={theme} />
              <a href="https://www.dxbalpha.com" target="_blank" rel="noopener noreferrer" className="FooterBrandTag" style={{ display: 'block', marginTop: '5px' }}>
                by alpha sino
              </a>
            </div>
            <p className="FooterBrandDesc">
              {t('footer.brand_desc_new', 'Trusted global partner in heavy machinery solutions, delivering power, precision, and reliability across construction, mining, and industries.')}
            </p>
            <div className="FooterSocialIcons">
              <a href="#" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>
              <a href="#" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg></a>
              <a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
              <a href="#" aria-label="YouTube"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg></a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="FooterColumn">
            <h3 className="FooterColTitle">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
              {t('footer.nav_title', 'Quick Links')}
            </h3>
            <ul className="FooterLinkList">
              <li><a href="#home" onClick={(e) => { e.preventDefault(); setActiveTab('HOME'); window.scrollTo(0,0); }}><span>&rsaquo;</span> {t('nav.home', 'Home')}</a></li>
              <li><a href="#about" onClick={(e) => { e.preventDefault(); setActiveTab('HOME'); setTimeout(() => document.getElementById('about')?.scrollIntoView({behavior:'smooth'}), 100); }}><span>&rsaquo;</span> {t('nav.about', 'About Us')}</a></li>
              <li><a href="#products" onClick={(e) => { e.preventDefault(); setActiveTab('HOME'); setTimeout(() => document.getElementById('products')?.scrollIntoView({behavior:'smooth'}), 100); }}><span>&rsaquo;</span> {t('nav.products', 'Products')}</a></li>
              <li><a href="#catalog" onClick={(e) => { e.preventDefault(); setActiveTab('CATALOG'); if(setCategoryFilter) setCategoryFilter('ALL'); window.scrollTo(0,0); }}><span>&rsaquo;</span> {t('nav.catalog', 'Catalogue')}</a></li>
              <li><a href="#services" onClick={(e) => { e.preventDefault(); setActiveTab('HOME'); }}><span>&rsaquo;</span> {t('nav.services', 'Services')}</a></li>
              <li><a href="#contact" onClick={(e) => { e.preventDefault(); setActiveTab('CONTACT'); window.scrollTo(0,0); }}><span>&rsaquo;</span> {t('nav.contact', 'Contact Us')}</a></li>
              <li><a href="#faq" onClick={(e) => { e.preventDefault(); setActiveTab('FAQ'); window.scrollTo(0,0); }}><span>&rsaquo;</span> {t('nav.faq', 'FAQ')}</a></li>
            </ul>
          </div>

          {/* Column 3: Products */}
          <div className="FooterColumn">
            <h3 className="FooterColTitle">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
              {t('footer.products_title', 'Products')}
            </h3>
            <ul className="FooterLinkList">
              <li><a href="#catalog" onClick={(e) => { e.preventDefault(); setActiveTab('CATALOG'); if(setCategoryFilter) setCategoryFilter('EXCAVATORS'); window.scrollTo(0,0); }}><span>&rsaquo;</span> {t('footer.prod_earthmoving', 'Earthmoving Equipment')}</a></li>
              <li><a href="#catalog" onClick={(e) => { e.preventDefault(); setActiveTab('CATALOG'); if(setCategoryFilter) setCategoryFilter('LOADERS'); window.scrollTo(0,0); }}><span>&rsaquo;</span> {t('footer.prod_mining', 'Mining Equipment')}</a></li>
              <li><a href="#catalog" onClick={(e) => { e.preventDefault(); setActiveTab('CATALOG'); if(setCategoryFilter) setCategoryFilter('TRACTORS'); window.scrollTo(0,0); }}><span>&rsaquo;</span> {t('footer.prod_construction', 'Construction Equipment')}</a></li>
              <li><a href="#catalog" onClick={(e) => { e.preventDefault(); setActiveTab('CATALOG'); if(setCategoryFilter) setCategoryFilter('TRUCKS'); window.scrollTo(0,0); }}><span>&rsaquo;</span> {t('footer.prod_material', 'Material Handling')}</a></li>
              <li><a href="#catalog" onClick={(e) => { e.preventDefault(); setActiveTab('CATALOG'); }}><span>&rsaquo;</span> {t('footer.prod_parts', 'Spare Parts')}</a></li>
              <li><a href="#catalog" onClick={(e) => { e.preventDefault(); setActiveTab('CATALOG'); }}><span>&rsaquo;</span> {t('footer.prod_attachments', 'Attachments')}</a></li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="FooterColumn">
            <h3 className="FooterColTitle">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              {t('footer.contact_title', 'Contact Us')}
            </h3>
            <ul className="FooterContactList">
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>{settings?.address || t('footer.address', 'Dubai Airport Building, Office 104, Port Said Area, Dubai, UAE')}</span>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                <a href={`tel:${settings?.phone || '+971588603711'}`}>{settings?.phone || '+971 58 860 3711'}</a>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                <a href={`https://wa.me/${(settings?.whatsapp || '971588603711').replace(/\D/g, '')}`}>{settings?.whatsapp || '+971 58 860 3711'}</a>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <a href={`mailto:${settings?.email || 'info@dxbalpha.com'}`}>{settings?.email || 'info@dxbalpha.com'}</a>
              </li>
            </ul>
            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="MapButton">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              {t('footer.view_map', 'VIEW ON MAP')} &rarr;
            </a>
          </div>

          {/* Column 5: Our Services */}
          <div className="FooterColumn">
            <h3 className="FooterColTitle">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
              {t('footer.services_title', 'Our Services')}
            </h3>
            <ul className="FooterServicesList">
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg> {t('footer.svc_parts', 'Genuine Spare Parts')}</li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg> {t('footer.svc_support', 'Technical Support')}</li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg> {t('footer.svc_maintenance', 'Equipment Maintenance')}</li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg> {t('footer.svc_shipping', 'Global Shipping')}</li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg> {t('footer.svc_247', '24/7 Service')}</li>
            </ul>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;
