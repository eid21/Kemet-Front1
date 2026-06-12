import React from 'react';
import Hero from '../../sections/Hero/Hero.jsx';
import CategoryShowcase from '../../sections/Showcase/CategoryShowcase.jsx';
import BrandAdvantages from '../../sections/Advantages/BrandAdvantages.jsx';
import ConsultationCTA from '../../sections/CTA/ConsultationCTA.jsx';

export const HomePage = ({ 
  setActiveTab, 
  setCategoryFilter,
  setShowConsultationModal,
  setInquirySubmitted,
  setInquiryName,
  setInquiryEmail,
  setInquiryPhone,
  setInquiryMessage 
}) => {
  return (
    <>
      <Hero 
        setActiveTab={setActiveTab} 
        setCategoryFilter={setCategoryFilter} 
      />
      <CategoryShowcase 
        setActiveTab={setActiveTab} 
        setCategoryFilter={setCategoryFilter} 
      />
      <BrandAdvantages />
      <ConsultationCTA 
        setShowConsultationModal={setShowConsultationModal}
        setInquirySubmitted={setInquirySubmitted}
        setInquiryName={setInquiryName}
        setInquiryEmail={setInquiryEmail}
        setInquiryPhone={setInquiryPhone}
        setInquiryMessage={setInquiryMessage}
      />
    </>
  );
};

export default HomePage;
