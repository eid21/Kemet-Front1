import React from 'react';
import { useTranslation } from 'react-i18next';
import useApi from '../../hooks/useApi.js';
import { getPrivacy } from '../../services/apiServices.js';
import '../Legal/LegalPage.css';

export const PrivacyPage = () => {
  const { t, i18n } = useTranslation();

  const { data: privacyData, loading } = useApi(
    () => getPrivacy(),
    null,
    [i18n.language]
  );

  return (
    <section className="LegalPageSection" id="privacy-page" style={{ paddingTop: '140px' }}>
      <div className="LegalContainer">
        <div className="LegalHeader fade-up-reveal">
          <h1>{privacyData?.title || t('privacy.heading', 'Privacy Policy')}</h1>
          <p>{t('privacy.last_updated', 'Last Updated')}: {privacyData?.updated_at ? new Date(privacyData.updated_at).toLocaleDateString() : '2026'}</p>
        </div>

        {loading ? (
          <div className="LegalLoading">{t('common.loading', 'Loading...')}</div>
        ) : (
          <div className="LegalContent fade-up-reveal speed-2">
            {privacyData?.content ? (
              <div dangerouslySetInnerHTML={{ __html: privacyData.content }} />
            ) : (
              <div className="LegalFallbackContent">
                <h2>1. {t('privacy.section_1_title', 'Information Collection')}</h2>
                <p>{t('privacy.section_1_desc', 'We collect information you provide directly to us when you request a quote, make a purchase, or contact customer support.')}</p>
                
                <h2>2. {t('privacy.section_2_title', 'Use of Information')}</h2>
                <p>{t('privacy.section_2_desc', 'We use the information we collect to process transactions, provide customer support, and send you technical notices.')}</p>
                
                <h2>3. {t('privacy.section_3_title', 'Data Security')}</h2>
                <p>{t('privacy.section_3_desc', 'We implement appropriate security measures to protect your personal information against unauthorized access.')}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default PrivacyPage;
