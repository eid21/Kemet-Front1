import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import HomePage from './pages/Home/HomePage.jsx';
import CatalogPage from './pages/Catalog/CatalogPage.jsx';
import DetailsPage from './pages/Details/DetailsPage.jsx';
import AboutPage from './pages/About/AboutPage.jsx';

import FAQPage from './pages/FAQ/FAQPage.jsx';
import PrivacyPage from './pages/Privacy/PrivacyPage.jsx';
import TermsPage from './pages/Terms/TermsPage.jsx';
import { generateSpecSheetPDF, generateCatalogPDF } from './utils/pdfGenerator.js';
import { useTranslation } from 'react-i18next';
import useApi from './hooks/useApi.js';
import { getEquipments } from './services/apiServices.js';
import { mapApiEquipmentsToFleet } from './utils/dataMappers.js';

export const App = () => {
  const { i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('HOME');
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });
  
  const [activeCategoryFilter, setCategoryFilter] = useState('ALL');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { data: apiEquipments } = useApi(
    () => getEquipments(),
    null,
    [i18n.language]
  );
  const equipmentList = apiEquipments ? mapApiEquipmentsToFleet(apiEquipments) : [];
  
  // Consultation Modal states
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  // Brochure download states
  const [showBrochureModal, setShowBrochureModal] = useState(false);
  const [subscriberName, setSubscriberName] = useState('');
  const [subscriberEmail, setSubscriberEmail] = useState('');
  const [subscriberPhone, setSubscriberPhone] = useState('');
  const [brochureCategories, setBrochureCategories] = useState([
    'EXCAVATORS', 'LOADERS', 'TRACTORS', 'TRUCKS', 'GRADERS'
  ]);
  const [brochureSent, setBrochureSent] = useState(false);

  // Query parameter synchronization
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const vehicleQueryId = searchParams.get('eq');
    if (vehicleQueryId && equipmentList.length > 0) {
      const matchVehicle = equipmentList.find(vehicle => vehicle.id.toString() === vehicleQueryId);
      if (matchVehicle) {
        setSelectedProduct(matchVehicle);
      }
    }
  }, [equipmentList]);

  useEffect(() => {
    if (selectedProduct) {
      window.scrollTo(0, 0);
      const updatedUrl = `${window.location.origin}${window.location.pathname}?eq=${selectedProduct.id}`;
      window.history.pushState({ path: updatedUrl }, '', updatedUrl);
    } else {
      const resetUrl = `${window.location.origin}${window.location.pathname}`;
      window.history.pushState({ path: resetUrl }, '', resetUrl);
    }
  }, [selectedProduct]);

  // Theme configuration
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const handleCatalogDownload = (e) => {
    e.preventDefault();
    if (brochureCategories.length === 0) {
      alert('Please select at least one machinery category.');
      return;
    }
    setBrochureSent(true);
    const selectedFleetItems = equipmentList.filter(item => brochureCategories.includes(item.category));
    generateCatalogPDF(selectedFleetItems, {
      name: subscriberName,
      email: subscriberEmail,
      phone: subscriberPhone
    });
  };

  return (
    <div className="AppLayout">
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        setSelectedProduct={setSelectedProduct} 
        theme={theme} 
        toggleTheme={toggleTheme} 
        setCategoryFilter={setCategoryFilter}
      />

      {selectedProduct ? (
        <DetailsPage 
          item={selectedProduct} 
          setSelectedProduct={setSelectedProduct} 
          downloadSpecPDF={generateSpecSheetPDF}
        />
      ) : activeTab === 'HOME' ? (
        <HomePage 
          setActiveTab={setActiveTab} 
          setCategoryFilter={setCategoryFilter}
          setShowConsultationModal={setShowConsultationModal}
          setInquirySubmitted={setInquirySubmitted}
          setInquiryName={setInquiryName}
          setInquiryEmail={setInquiryEmail}
          setInquiryPhone={setInquiryPhone}
          setInquiryMessage={setInquiryMessage}
        />
      ) : activeTab === 'ABOUT' ? (
        <AboutPage />
      ) : activeTab === 'FAQ' ? (
        <FAQPage />
      ) : activeTab === 'PRIVACY' ? (
        <PrivacyPage />
      ) : activeTab === 'TERMS' ? (
        <TermsPage />
      ) : (
        <CatalogPage 
          activeCategoryFilter={activeCategoryFilter} 
          setCategoryFilter={setCategoryFilter} 
          setSelectedProduct={setSelectedProduct} 
          setShowBrochureModal={setShowBrochureModal} 
          setActiveTab={setActiveTab} 
          downloadSpecPDF={generateSpecSheetPDF}
        />
      )}

      <Footer 
        setActiveTab={setActiveTab} 
        setSelectedProduct={setSelectedProduct} 
        setCategoryFilter={setCategoryFilter}
        theme={theme}
      />

      {/* Consultation Modal */}
      {showConsultationModal && (
        <div 
          className="ModalBackdrop" 
          onClick={(e) => { 
            if (e.target.classList.contains('ModalBackdrop')) setShowConsultationModal(false); 
          }}
        >
          <div className="ModalDialogWindow">
            <button className="ModalDismissButton" onClick={() => setShowConsultationModal(false)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{width:'18px',height:'18px'}}>
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>

            {inquirySubmitted ? (
              <div className="ModalSuccessState">
                <div className="consult-success-icon" style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', width: '60px', height: '60px', border: '2px solid var(--primary)', borderRadius: '50%', color: 'var(--primary)', marginBottom: '15px' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{width:'40px',height:'40px'}}>
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <h3>Inquiry Sent!</h3>
                <p>Our specialists will contact you within 2 business hours with a tailored proposal.</p>
                <button className="ButtonPrimary" style={{marginTop:'20px'}} onClick={() => setShowConsultationModal(false)}>Close</button>
              </div>
            ) : (
              <div className="ModalDialogGrid">
                <div className="ModalMetadataSidebar">
                  <div className="ModalDialogWindow-pill">Get In Touch</div>
                  <h2 className="ModalDialogWindow-title">Request a<br/>Consultation</h2>
                  <p className="ModalDialogWindow-desc">Our heavy equipment advisors respond within 2 hours with tailored quotes, shipping terms, and delivery timelines.</p>
                  <ul className="consult-feature-list">
                    {[
                      { icon: '⚡', text: '2-Hour Response Guarantee' },
                      { icon: '🌍', text: 'Global Shipping Available' },
                      { icon: '📋', text: 'Custom Financing Options' },
                      { icon: '🛡️', text: 'Full Warranty Included' },
                    ].map((feature, idx) => (
                      <li key={idx} className="consult-feature-item">
                        <span className="consult-feature-icon">{feature.icon}</span>
                        <span>{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="ModalFormContent">
                  <div className="consult-form-row">
                    <div className="consult-form-group">
                      <label className="FormFieldLabelText">FULL NAME</label>
                      <input className="FormFieldTextBox" type="text" placeholder="Your name" value={inquiryName} onChange={e => setInquiryName(e.target.value)} />
                    </div>
                    <div className="consult-form-group">
                      <label className="FormFieldLabelText">CORPORATE EMAIL</label>
                      <input className="FormFieldTextBox" type="email" placeholder="you@company.com" value={inquiryEmail} onChange={e => setInquiryEmail(e.target.value)} />
                    </div>
                  </div>
                  <div className="consult-form-group">
                    <label className="FormFieldLabelText">PHONE / WHATSAPP</label>
                    <input className="FormFieldTextBox" type="tel" placeholder="+971 50 000 0000" value={inquiryPhone} onChange={e => setInquiryPhone(e.target.value)} />
                  </div>
                  <div className="consult-form-group">
                    <label className="FormFieldLabelText">MESSAGE</label>
                    <textarea
                      className="FormFieldTextArea"
                      rows={4}
                      placeholder="I am interested in KEMET heavy machinery and would like pricing, shipping terms, and delivery timeline options."
                      value={inquiryMessage}
                      onChange={e => setInquiryMessage(e.target.value)}
                    />
                  </div>
                  <button
                    className="ButtonPrimary FormFieldSubmitButton"
                    onClick={() => {
                      if (inquiryName && inquiryEmail) {
                        setInquirySubmitted(true);
                      }
                    }}
                  >
                    Submit Inquiry &rarr;
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Brochure Compilation Modal */}
      {showBrochureModal && (
        <div className="ModalBackdrop download-modal-overlay">
          <div className="ModalDialogWindow download-modal">
            <button className="ModalDismissButton" onClick={() => { setShowBrochureModal(false); setBrochureSent(false); }} aria-label="Close modal">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', height: '16px' }}>
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
            <div className="ModalDialogGrid download-modal-body">
              <div className="ModalMetadataSidebar download-modal-left">
                <div className="ModalDialogWindow-pill">Brochure Center</div>
                <h2 className="ModalDialogWindow-title">Customized<br /><span>Catalog 2026</span></h2>
                <p className="ModalDialogWindow-desc">
                  Select your machinery categories of interest. We will dynamically compile a tailored engineering specification manual with your contact details stamped on the cover page.
                </p>
                
                <div className="download-modal-benefits">
                  <div className="benefit-item">
                    <span className="benefit-icon">✓</span>
                    <span>High-Resolution Spec Sheets</span>
                  </div>
                  <div className="benefit-item">
                    <span className="benefit-icon">✓</span>
                    <span>Full Powertrain & Mechanical Dimensions</span>
                  </div>
                  <div className="benefit-item">
                    <span className="benefit-icon">✓</span>
                    <span>GCC Climate Adaptive Performance Ratings</span>
                  </div>
                </div>
              </div>
              
              <div className="ModalFormContent download-modal-right">
                {!brochureSent ? (
                  <form onSubmit={handleCatalogDownload} className="download-form">
                    <div className="download-step-section">
                      <label className="FormFieldLabelText">1. Choose Machinery Classes</label>
                      <div className="download-category-grid">
                        {['EXCAVATORS', 'LOADERS', 'TRACTORS', 'TRUCKS', 'GRADERS'].map(category => {
                          const checked = brochureCategories.includes(category);
                          return (
                            <label key={category} className={`download-cat-card ${checked ? 'checked' : ''}`}>
                              <input 
                                type="checkbox"
                                checked={checked}
                                onChange={() => {
                                  setBrochureCategories(prevList => 
                                    prevList.includes(category) 
                                      ? prevList.filter(item => item !== category) 
                                      : [...prevList, category]
                                  );
                                }}
                                style={{ display: 'none' }}
                              />
                              <div className="cat-card-checkbox">
                                {checked && <span className="cat-card-check-dot"></span>}
                              </div>
                              <span className="cat-card-label">{category.charAt(0) + category.slice(1).toLowerCase()}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                    
                    <div className="download-step-section" style={{ marginTop: '10px' }}>
                      <label className="FormFieldLabelText">2. Requestor Details</label>
                      <div className="consult-form-group">
                        <input 
                          type="text"
                          className="FormFieldTextBox"
                          placeholder="Your Full Name"
                          required
                          value={subscriberName}
                          onChange={e => setSubscriberName(e.target.value)}
                        />
                      </div>
                      <div className="consult-form-row">
                        <div className="consult-form-group">
                          <input 
                            type="email"
                            className="FormFieldTextBox"
                            placeholder="Corporate Email"
                            required
                            value={subscriberEmail}
                            onChange={e => setSubscriberEmail(e.target.value)}
                          />
                        </div>
                        <div className="consult-form-group">
                          <input 
                            type="tel"
                            className="FormFieldTextBox"
                            placeholder="Mobile Phone"
                            required
                            value={subscriberPhone}
                            onChange={e => setSubscriberPhone(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <button type="submit" className="ButtonPrimary FormFieldSubmitButton" style={{ marginTop: '15px' }}>
                      Compile & Download Custom PDF
                    </button>
                  </form>
                ) : (
                  <div className="ModalSuccessState download-success">
                    <div className="success-icon-wrapper" style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', width: '60px', height: '60px', border: '2px solid var(--primary)', borderRadius: '50%', color: 'var(--primary)', marginBottom: '15px' }}>
                      <svg className="success-checkmark" viewBox="0 0 52 52" style={{ width: '40px', height: '40px' }}>
                        <circle className="success-checkmark-circle" cx="26" cy="26" r="25" fill="none" stroke="currentColor" strokeWidth="2"/>
                        <path className="success-checkmark-check" fill="none" stroke="currentColor" strokeWidth="3" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                      </svg>
                    </div>
                    <h3 className="success-title">Compiling Successful</h3>
                    <p className="success-desc">
                      Your custom catalog has been built. The print window should open automatically. If it was blocked, click below to re-print.
                    </p>
                    <button 
                      className="ButtonPrimary" 
                      onClick={() => generateCatalogPDF(equipmentList.filter(item => brochureCategories.includes(item.category)), { name: subscriberName, email: subscriberEmail, phone: subscriberPhone })}
                      style={{ padding: '12px 24px', fontSize: '0.88rem' }}
                    >
                      Re-open PDF Document
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
