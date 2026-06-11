import React from 'react';
import { useTranslation } from 'react-i18next';

export const ConsultationCTA = ({ 
  setShowConsultationModal, 
  setInquirySubmitted, 
  setInquiryName, 
  setInquiryEmail, 
  setInquiryPhone, 
  setInquiryMessage 
}) => {
  const { t } = useTranslation();

  const triggerConsultation = () => {
    setShowConsultationModal(true);
    if (setInquirySubmitted) setInquirySubmitted(false);
    if (setInquiryName) setInquiryName('');
    if (setInquiryEmail) setInquiryEmail('');
    if (setInquiryPhone) setInquiryPhone('');
    if (setInquiryMessage) setInquiryMessage('');
  };

  return (
    <section className="ConsultationCTASection" id="contact">
      <div className="ConsultationCTABackground" style={{ backgroundImage: `url('/e1585f91-87ab-4149-b8b6-1b7f88c5f1e7.png')` }}></div>
      <div className="ConsultationCTAOverlay"></div>
      <div className="ConsultationLayoutContainer">
        <div className="ConsultationMainPanel">
          <span className="ConsultationSegmentBadge">{t('cta.badge')}</span>
          <h2 className="ConsultationCoreHeading">{t('cta.heading')}</h2>
          <p className="ConsultationCoreSummary">
            {t('cta.summary')}
          </p>
          <div className="ConsultationActionFrame">
            <button
              className="ButtonPrimary ConsultationCTAButton"
              id="btn-request-consultation"
              onClick={triggerConsultation}
            >
              {t('cta.button')} <span>&rarr;</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultationCTA;
