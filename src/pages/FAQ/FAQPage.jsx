import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import useApi from '../../hooks/useApi.js';
import { getFaqs } from '../../services/apiServices.js';
import './FAQPage.css';

export const FAQPage = () => {
  const { t, i18n } = useTranslation();
  const [openIndex, setOpenIndex] = useState(null);

  const { data: faqData, loading } = useApi(
    () => getFaqs(1, 50),
    null,
    [i18n.language]
  );

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Extract items from pagination envelope if available
  const faqs = faqData?.data || faqData || [];

  return (
    <section className="FAQPageSection" id="faq-page" style={{ paddingTop: '140px' }}>
      <div className="FAQContainer">
        <div className="FAQHeader fade-up-reveal">
          <h1>{t('faq.heading', 'Frequently Asked Questions')}</h1>
          <p>{t('faq.subheading', 'Find answers to common questions about our machinery, shipping, and warranties.')}</p>
        </div>

        {loading ? (
          <div className="FAQLoading">{t('common.loading', 'Loading...')}</div>
        ) : (
          <div className="FAQAccordion fade-up-reveal speed-2">
            {faqs.length > 0 ? (
              faqs.map((faq, index) => (
                <div 
                  key={faq.id || index} 
                  className={`FAQItem ${openIndex === index ? 'open' : ''}`}
                  onClick={() => toggleAccordion(index)}
                >
                  <div className="FAQQuestion">
                    <h3>{faq.question}</h3>
                    <span className="FAQIcon">{openIndex === index ? '−' : '+'}</span>
                  </div>
                  <div className="FAQAnswer" style={{ maxHeight: openIndex === index ? '500px' : '0' }}>
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="FAQEmpty">
                <p>{t('faq.no_results', 'No FAQs available at the moment.')}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default FAQPage;
