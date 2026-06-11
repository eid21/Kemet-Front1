import React from 'react';
import { useTranslation } from 'react-i18next';
import useApi from '../../hooks/useApi.js';
import { getTerms } from '../../services/apiServices.js';
import '../Legal/LegalPage.css';

export const TermsPage = () => {
  const { t, i18n } = useTranslation();

  const { data: termsData, loading } = useApi(
    () => getTerms(),
    null,
    [i18n.language]
  );

  return (
    <section className="LegalPageSection" id="terms-page" style={{ paddingTop: '140px' }}>
      <div className="LegalContainer">
        <div className="LegalHeader fade-up-reveal">
          <h1>{termsData?.title || t('terms.heading', 'Terms & Conditions')}</h1>
          <p>{t('terms.last_updated', 'Last Updated')}: {termsData?.updated_at ? new Date(termsData.updated_at).toLocaleDateString() : '2026'}</p>
        </div>

        {loading ? (
          <div className="LegalLoading">{t('common.loading', 'Loading...')}</div>
        ) : (
          <div className="LegalContent fade-up-reveal speed-2">
            {termsData?.content ? (
              <div dangerouslySetInnerHTML={{ __html: termsData.content }} />
            ) : (
              <div className="LegalFallbackContent">
                <h2>1. {t('terms.section_1_title', 'Agreement to Terms')}</h2>
                <p>{t('terms.section_1_desc', 'By accessing or using our services, you agree to be bound by these terms and conditions.')}</p>
                
                <h2>2. {t('terms.section_2_title', 'Equipment Sales & Warranty')}</h2>
                <p>{t('terms.section_2_desc', 'All machinery sales are subject to our standard OEM warranty unless otherwise specified in your contract.')}</p>
                
                <h2>3. {t('terms.section_3_title', 'Shipping & Delivery')}</h2>
                <p>{t('terms.section_3_desc', 'Delivery timelines are estimates. We are not liable for delays caused by customs, port authorities, or maritime transport issues.')}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default TermsPage;
