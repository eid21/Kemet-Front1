import React from 'react';
import { useTranslation } from 'react-i18next';

export const CategoryShowcase = () => {
  const { t } = useTranslation();

  const handleScrollToContact = (e) => {
    e.preventDefault();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="FleetShowcaseSection" id="products">
      <div className="ShowcaseGridContainer">
        <div className="ShowcaseSectionHeader">
          <div className="HeaderGroupingLeft">
            <div className="SectionSegmentPill">
              <span className="PillAccentLine"></span>
              <span className="PillLabelText">{t('showcase.badge')}</span>
            </div>
            <h2 className="ShowcaseSectionTitle">
              {t('showcase.title_line1')}<br />
              {t('showcase.title_line2')}
            </h2>
          </div>
          <div className="HeaderGroupingRight">
            <button 
              className="ShowAllCategoriesButton" 
              onClick={handleScrollToContact}
              id="btn-all-categories"
            >
              {t('showcase.all_btn')} <span>&rarr;</span>
            </button>
          </div>
        </div>

        <div className="ShowcaseGridLayout">
          <div className="FleetCategoryCard" id="card-excavators">
            <div className="CardMediaViewport">
              <img src="/a87db3e6-167b-4cb8-8774-7159388a521e.png" alt="Excavator" className="CardVehicleAsset" />
            </div>
            <div className="CardSpecificationContent">
              <h3 className="CardVehicleHeading">{t('showcase.excavators_title')}</h3>
              <p className="CardVehicleSummary">
                {t('showcase.excavators_desc')}
              </p>
              <button 
                className="CardActionAnchor" 
                onClick={handleScrollToContact}
                id="btn-view-excavators"
              >
                {t('showcase.view_range')}
              </button>
            </div>
          </div>

          <div className="FleetCategoryCard" id="card-loaders">
            <div className="CardMediaViewport">
              <img src="/49c6df76-530e-409d-a3d5-923cc1a96cb3.png" alt="Loader" className="CardVehicleAsset" />
            </div>
            <div className="CardSpecificationContent">
              <h3 className="CardVehicleHeading">{t('showcase.loaders_title')}</h3>
              <p className="CardVehicleSummary">
                {t('showcase.loaders_desc')}
              </p>
              <button 
                className="CardActionAnchor" 
                onClick={handleScrollToContact}
                id="btn-view-loaders"
              >
                {t('showcase.view_range')}
              </button>
            </div>
          </div>

          <div className="FleetCategoryCard" id="card-tractors">
            <div className="CardMediaViewport">
              <img src="/b5b3107c-92a0-4d8e-b337-7ca794dc5668.png" alt="Tractor" className="CardVehicleAsset" />
            </div>
            <div className="CardSpecificationContent">
              <h3 className="CardVehicleHeading">{t('showcase.tractors_title')}</h3>
              <p className="CardVehicleSummary">
                {t('showcase.tractors_desc')}
              </p>
              <button 
                className="CardActionAnchor" 
                onClick={handleScrollToContact}
                id="btn-view-tractors"
              >
                {t('showcase.view_range')}
              </button>
            </div>
          </div>

          <div className="FleetCategoryCard" id="card-trucks">
            <div className="CardMediaViewport">
              <img src="/983b9ffe-f2aa-499a-8b93-26222d25fa8c.png" alt="Truck" className="CardVehicleAsset" />
            </div>
            <div className="CardSpecificationContent">
              <h3 className="CardVehicleHeading">{t('showcase.trucks_title')}</h3>
              <p className="CardVehicleSummary">
                {t('showcase.trucks_desc')}
              </p>
              <button 
                className="CardActionAnchor" 
                onClick={handleScrollToContact}
                id="btn-view-trucks"
              >
                {t('showcase.view_range')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
