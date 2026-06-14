import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { postConsultation } from '../../services/apiServices.js';

export const DetailsPage = ({ item, setSelectedProduct, downloadSpecPDF }) => {
  const { t } = useTranslation();
  const [selectedDetailImage, setSelectedDetailImage] = useState(item.image);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientMessage, setClientMessage] = useState('');
  const [clientInquirySent, setClientInquirySent] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    setSelectedDetailImage(item.image);
    setClientInquirySent(false);
    setClientName('');
    setClientEmail('');
    setClientPhone('');
    setClientMessage('');
  }, [item]);

  const handleInquirySubmission = async (e) => {
    e.preventDefault();
    try {
      await postConsultation({
        name: clientName,
        email: clientEmail,
        phone: clientPhone,
        message: clientMessage,
        equipment_id: item.id
      });
    } catch (err) {
      console.error(err);
    } finally {
      setClientInquirySent(true);
    }
  };

  const copyLinkToClipboard = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (err) {
      console.error("Link copying failed:", err);
    }
  };

  const shareProductSheet = async () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}?eq=${item.id}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `KEMET - ${t(`fleet.${item.id}.name`, { defaultValue: item.name })}`,
          text: `Check out the ${t(`fleet.${item.id}.name`, { defaultValue: item.name })} (${item.modelCode}) on KEMET Heavy Machinery.`,
          url: shareUrl,
        });
      } catch (err) {
        console.error("Sharing failed:", err);
        copyLinkToClipboard(shareUrl);
      }
    } else {
      copyLinkToClipboard(shareUrl);
    }
  };

  const keyEngineeringChips = [
    { icon: '⚡', label: 'High Power Output' },
    { icon: '🛡️', label: 'OEM Certified' },
    { icon: '🌐', label: 'GCC Ready' },
    { icon: '🔧', label: 'Full Warranty' },
  ];

  return (
    <div className="ProductSpecsLayoutWrapper">
      <div className="ProductSpecsBannerBlock">
        <div
          className="ProductSpecsBannerAsset"
          style={{ backgroundColor: 'var(--bg-dark)' }}
        />
        <div className="ProductSpecsBannerVignette" />
        <div className="ProductSpecsBannerDetailsPanel">
          <button className="ProductSpecsDismissButton" onClick={() => setSelectedProduct(null)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', height: '16px' }}>
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            {t('details.back_to_catalog')}
          </button>
          <div className="ProductSpecsBannerBadgeGroup">
            <span className="ProductSpecsCategoryBadge">{item.category}</span>
            <span className="ProductSpecsStockBadge">{item.status === 'In Stock' ? t('catalog.in_stock') : t('catalog.available')}</span>
          </div>
          <h1 className="ProductSpecsBannerHeadline">{t(`fleet.${item.id}.name`, { defaultValue: item.name })}</h1>
          <p className="ProductSpecsBannerVehicleModel">{item.modelCode} — 2026 {t('details.series')}</p>
          <div className="ProductSpecsBannerChipsPanel">
            {keyEngineeringChips.map((chip, idx) => (
              <div key={idx} className="ProductSpecsFeatureChipItem">
                <span className="ProductSpecsFeatureChipVector">{chip.icon}</span>
                <span className="ProductSpecsFeatureChipLabel">{chip.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="ProductSpecsCoreBody">
        <div className="ProductSpecsShowcaseSplit">
          <div className="ProductSpecsMediaGallery">
            <div className="ProductSpecsGalleryFrame">
              <img src={selectedDetailImage} alt={t(`fleet.${item.id}.name`, { defaultValue: item.name })} className="ProductSpecsGalleryAsset" />
              <div className="ProductSpecsGalleryShimmerOverlay" />
            </div>
            <div className="ProductSpecsThumbnailsStrip">
              {item.gallery.map((galleryAsset, idx) => (
                <button
                  key={idx}
                  className={`ProductSpecsThumbnailFrame ${selectedDetailImage === galleryAsset ? 'active' : ''}`}
                  onClick={() => setSelectedDetailImage(galleryAsset)}
                >
                  <img src={galleryAsset} alt={`Angle ${idx + 1}`} className="ProductSpecsThumbnailAsset" />
                  {selectedDetailImage === galleryAsset && <div className="ProductSpecsThumbnailGlowOverlay" />}
                </button>
              ))}
            </div>
          </div>

          <div className="ProductSpecsQuickSummaryPanel">
            <p className="ProductSpecsLongDescription">{t(`fleet.${item.id}.description`, { defaultValue: item.longDescription || item.description })}</p>

            <div className="ProductSpecsPrimaryMetricsGrid">
              {item.specs.map((spec, idx) => {
                const specLabelKey = spec.label.toLowerCase().replace(/[\s\(\)\/]+/g, '_').replace(/_+$/, '');
                const specValueKey = spec.value.toLowerCase().replace(/[\s\(\)\/]+/g, '_').replace(/_+$/, '');
                return (
                  <div key={idx} className="ProductSpecsMetricTile">
                    <span className="ProductSpecsMetricTileValue">{t(`specs.values.${specValueKey}`, { defaultValue: spec.value })}</span>
                    <span className="ProductSpecsMetricTileLabel">{t(`specs.labels.${specLabelKey}`, { defaultValue: spec.label })}</span>
                  </div>
                );
              })}
            </div>

            <div className="ProductSpecsActionStrip">
              <button className="ProductSpecsActionPrimaryButton" onClick={() => downloadSpecPDF(item)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '17px', height: '17px' }}>
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                {t('details.download_spec')}
              </button>
              <button className="ProductSpecsActionSecondaryButton" onClick={shareProductSheet}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '17px', height: '17px', marginRight: '8px', verticalAlign: 'middle' }}>
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
                {linkCopied ? t('details.link_copied') : t('details.share_product')}
              </button>
            </div>
          </div>
        </div>

        <div className="ProductSpecsTableBlock">
          <div className="ProductSpecsTableBlockHeader">
            <span className="ProductSpecsTableBlockHeaderAccentLine" />
            <h2 className="ProductSpecsTableBlockHeaderTitle">{t('details.tech_specs')}</h2>
          </div>
          <div className="ProductSpecsTableGridLayout">
            {[...item.specs, ...item.extraSpecs].map((spec, idx) => {
              const specLabelKey = spec.label.toLowerCase().replace(/[\s\(\)\/]+/g, '_').replace(/_+$/, '');
              const specValueKey = spec.value.toLowerCase().replace(/[\s\(\)\/]+/g, '_').replace(/_+$/, '');
              return (
                <div key={idx} className="ProductSpecsTableRow">
                  <span className="ProductSpecsTableRowName">{t(`specs.labels.${specLabelKey}`, { defaultValue: spec.label })}</span>
                  <span className="ProductSpecsTableRowDotLeader" />
                  <span className="ProductSpecsTableRowValue">{t(`specs.values.${specValueKey}`, { defaultValue: spec.value })}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="ProductSpecsInquiryFormBlock" id="dpv2-inquiry">
          <div className="ProductSpecsTableBlockHeader">
            <span className="ProductSpecsTableBlockHeaderAccentLine" />
            <h2 className="ProductSpecsTableBlockHeaderTitle">{t('details.request_quote')}</h2>
          </div>
          <div className="ProductSpecsInquiryFormLayout">
            <div className="ProductSpecsInquiryInformationSidebar">
              <h3 className="ProductSpecsInquiryHeadline">{t('details.get_pricing')}</h3>
              <p className="ProductSpecsInquirySubText">{t('details.advisor_text')}</p>
              <div className="ProductSpecsInquiryTrustGrid">
                <div className="ProductSpecsInquiryTrustTile">
                  <span className="ProductSpecsInquiryTrustTileIcon">⏱</span>
                  <span>{t('details.trust_1')}</span>
                </div>
                <div className="ProductSpecsInquiryTrustTile">
                  <span className="ProductSpecsInquiryTrustTileIcon">🚢</span>
                  <span>{t('details.trust_2')}</span>
                </div>
                <div className="ProductSpecsInquiryTrustTile">
                  <span className="ProductSpecsInquiryTrustTileIcon">📋</span>
                  <span>{t('details.trust_3')}</span>
                </div>
                <div className="ProductSpecsInquiryTrustTile">
                  <span className="ProductSpecsInquiryTrustTileIcon">🛡️</span>
                  <span>{t('details.trust_4')}</span>
                </div>
              </div>
            </div>
            <div className="ProductSpecsInquiryFormContainer">
              {clientInquirySent ? (
                <div className="ProductSpecsInquirySuccessFeedback fade-in">
                  <div className="consult-success-icon" style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', width: '50px', height: '50px', border: '2px solid var(--primary)', borderRadius: '50%', color: 'var(--primary)', marginBottom: '15px' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ width: '30px', height: '30px' }}>
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3>{t('details.inquiry_sent')}</h3>
                  <p>{t('details.inquiry_sent_desc_1')} <strong>{t(`fleet.${item.id}.name`, { defaultValue: item.name })}</strong> ({item.modelCode}) {t('details.inquiry_sent_desc_2')}</p>
                  <button className="ProductSpecsActionSecondaryButton" style={{ marginTop: '15px' }} onClick={() => setClientInquirySent(false)}>{t('details.send_another')} &rarr;</button>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmission} className="ProductSpecsInquiryFormElement">
                  <div className="ProductSpecsInquiryFormRow">
                    <div className="ProductSpecsInquiryFormField">
                      <label htmlFor="dpv2-name">{t('details.form_name')}</label>
                      <input id="dpv2-name" type="text" required placeholder={t('details.form_name_placeholder')} value={clientName} onChange={(e) => setClientName(e.target.value)} />
                    </div>
                    <div className="ProductSpecsInquiryFormField">
                      <label htmlFor="dpv2-email">{t('details.form_email')}</label>
                      <input id="dpv2-email" type="email" required placeholder="you@company.com" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} />
                    </div>
                  </div>
                  <div className="ProductSpecsInquiryFormField">
                    <label htmlFor="dpv2-phone">{t('details.form_phone')}</label>
                    <input id="dpv2-phone" type="tel" required placeholder="+971 50 000 0000" value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} />
                  </div>
                  <div className="ProductSpecsInquiryFormField">
                    <label htmlFor="dpv2-msg">{t('details.form_msg')}</label>
                    <textarea id="dpv2-msg" rows="4" required placeholder={t('details.form_msg_placeholder').replace('%model%', item.modelCode)} value={clientMessage} onChange={(e) => setClientMessage(e.target.value)} />
                  </div>
                  <button type="submit" className="ProductSpecsActionPrimaryButton" id="btn-submit-inquiry" style={{ width: '100%', justifyContent: 'center' }}>
                    {t('details.submit_inquiry')} &rarr;
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DetailsPage;
