import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { postContact, getSettings } from '../../services/apiServices.js';
import useApi from '../../hooks/useApi.js';
import './ContactPage.css';

export const ContactPage = () => {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('idle');

  const { data: settings } = useApi(() => getSettings(), null, [i18n.language]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await postContact(formData);
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <section className="ContactPageSection" id="contact-page" style={{ paddingTop: '140px' }}>
      <div className="ContactContainer">
        <div className="ContactHeader fade-up-reveal">
          <h1>{t('contact.heading', 'Get in Touch')}</h1>
          <p>{t('contact.subheading', 'Our global team is ready to assist you with machinery, parts, and technical support.')}</p>
        </div>

        <div className="ContactGrid">
          <div className="ContactInfoSide fade-up-reveal speed-2">
            <h2>{t('contact.info_title', 'Contact Information')}</h2>
            
            <div className="ContactInfoItem">
              <span className="InfoIcon">📍</span>
              <div className="InfoText">
                <strong>{t('contact.hq', 'Global Headquarters')}</strong>
                <p>{settings?.address || t('contact.address', 'Dubai Airport Building, Office 104, Port Said Area, Dubai, UAE')}</p>
              </div>
            </div>

            <div className="ContactInfoItem">
              <span className="InfoIcon">📞</span>
              <div className="InfoText">
                <strong>{t('contact.phone_title', 'Direct Line')}</strong>
                <p><a href={`tel:${settings?.phone || '+971588603711'}`}>{settings?.phone || '+971 58 860 3711'}</a></p>
              </div>
            </div>

            <div className="ContactInfoItem">
              <span className="InfoIcon">✉️</span>
              <div className="InfoText">
                <strong>{t('contact.email_title', 'Email')}</strong>
                <p><a href={`mailto:${settings?.email || 'info@dxbalpha.com'}`}>{settings?.email || 'info@dxbalpha.com'}</a></p>
              </div>
            </div>

            <div className="ContactInfoItem">
              <span className="InfoIcon">💬</span>
              <div className="InfoText">
                <strong>{t('contact.whatsapp_title', 'WhatsApp')}</strong>
                <p><a href={`https://wa.me/${(settings?.whatsapp || '971588603711').replace(/\D/g, '')}`}>{settings?.whatsapp || '+971 58 860 3711'}</a></p>
              </div>
            </div>
          </div>

          <div className="ContactFormSide fade-up-reveal speed-3">
            {status === 'success' ? (
              <div className="ContactSuccessMessage">
                <div className="SuccessIcon">✓</div>
                <h3>{t('contact.success_title', 'Message Sent!')}</h3>
                <p>{t('contact.success_desc', 'Thank you for reaching out. Our team will contact you shortly.')}</p>
                <button className="ButtonSecondary" onClick={() => setStatus('idle')}>
                  {t('contact.send_another', 'Send Another Message')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="ContactForm">
                <div className="FormRow">
                  <div className="FormGroup">
                    <label>{t('contact.form_name', 'Full Name')}</label>
                    <input 
                      type="text" 
                      required 
                      value={formData.name} 
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="FormGroup">
                    <label>{t('contact.form_email', 'Email Address')}</label>
                    <input 
                      type="email" 
                      required 
                      value={formData.email} 
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      placeholder="john@company.com"
                    />
                  </div>
                </div>
                <div className="FormGroup">
                  <label>{t('contact.form_phone', 'Phone Number')}</label>
                  <input 
                    type="tel" 
                    required 
                    value={formData.phone} 
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    placeholder="+971 50 000 0000"
                  />
                </div>
                <div className="FormGroup">
                  <label>{t('contact.form_message', 'Your Message')}</label>
                  <textarea 
                    rows="5" 
                    required 
                    value={formData.message} 
                    onChange={e => setFormData({...formData, message: e.target.value})}
                    placeholder={t('contact.form_message_placeholder', 'How can we help you?')}
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="ButtonPrimary SubmitButton" 
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? t('contact.sending', 'Sending...') : t('contact.submit', 'Send Message')} &rarr;
                </button>
                {status === 'error' && (
                  <p className="ErrorMessage" style={{ color: 'red', marginTop: '10px' }}>
                    {t('contact.error', 'An error occurred. Please try again.')}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
