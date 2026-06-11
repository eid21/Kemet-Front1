import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { fleetList } from '../../data/fleetData.js';
import useApi from '../../hooks/useApi.js';
import { getEquipments, getCategories, getEquipmentStats } from '../../services/apiServices.js';
import { mapApiEquipmentsToFleet, mapApiCategories } from '../../utils/dataMappers.js';

export const CatalogPage = ({ 
  activeCategoryFilter, 
  setCategoryFilter, 
  setSelectedProduct, 
  setShowBrochureModal, 
  setActiveTab, 
  downloadSpecPDF 
}) => {
  const { t, i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilters, setSelectedCategoryFilters] = useState([]);
  const [selectedYearFilter, setSelectedYearFilter] = useState('ALL');
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Fetch equipments from API with fallback
  const { data: apiEquipments } = useApi(
    () => getEquipments(),
    null,
    [i18n.language]
  );
  const equipmentList = apiEquipments ? mapApiEquipmentsToFleet(apiEquipments) : fleetList;

  // Fetch categories from API with fallback
  const { data: apiCategories } = useApi(
    () => getCategories(),
    null,
    [i18n.language]
  );

  // Fetch stats from API
  const { data: apiStats } = useApi(
    () => getEquipmentStats(),
    null,
    [i18n.language]
  );

  let filteredFleet = equipmentList;

  if (searchQuery.trim()) {
    const searchString = searchQuery.toLowerCase();
    filteredFleet = filteredFleet.filter(vehicle =>
      t(`fleet.${vehicle.id}.name`).toLowerCase().includes(searchString) ||
      vehicle.modelCode.toLowerCase().includes(searchString) ||
      vehicle.category.toLowerCase().includes(searchString) ||
      t(`fleet.${vehicle.id}.description`).toLowerCase().includes(searchString)
    );
  }

  if (selectedCategoryFilters.length > 0) {
    filteredFleet = filteredFleet.filter(vehicle =>
      selectedCategoryFilters.includes(vehicle.category)
    );
  }

  if (activeCategoryFilter !== 'ALL' && selectedCategoryFilters.length === 0) {
    filteredFleet = filteredFleet.filter(vehicle => vehicle.category === activeCategoryFilter);
  }

  if (selectedYearFilter !== 'ALL') {
    filteredFleet = filteredFleet.filter(vehicle => vehicle.year === selectedYearFilter);
  }

  const toggleCategorySelection = (category) => {
    setSelectedCategoryFilters(prevFilters =>
      prevFilters.includes(category) 
        ? prevFilters.filter(item => item !== category) 
        : [...prevFilters, category]
    );
    setCategoryFilter('ALL');
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategoryFilters([]);
    setSelectedYearFilter('ALL');
    setCategoryFilter('ALL');
  };

  const isFilterActive = searchQuery.trim() || selectedCategoryFilters.length > 0 || selectedYearFilter !== 'ALL';

  const categoryOptions = apiCategories
    ? mapApiCategories(apiCategories).map(c => c.name)
    : ['EXCAVATORS', 'LOADERS', 'TRACTORS', 'TRUCKS', 'GRADERS'];
  const manufacturingYears = ['ALL', '2026', '2025', '2024', '2023'];

  return (
    <div className="CatalogPageWrapper">
      <section className="CatalogBannerBlock">
        <div className="CatalogBannerMediaFrame">
          <div className="CatalogBannerAsset" style={{ backgroundImage: `url('/catalog-new.jpg')` }}></div>
          <div className="CatalogBannerVignette"></div>
        </div>
        <div className="CatalogBannerInfoPanel">
          <div className="CatalogBannerSegmentBadge">
            <span className="BadgeAccentLine"></span>
            <span className="BadgeLabelText">{t('catalog.badge')}</span>
            <span className="BadgeAccentLine"></span>
          </div>
          <h1 className="CatalogBannerMainHeadline">{t('catalog.headline_1')}<br /><span>{t('catalog.headline_2')}</span></h1>
          <p className="CatalogBannerParagraph">
            {t('catalog.summary')}
          </p>
          <div className="CatalogBannerActionGroup">
            <button className="ButtonPrimary" id="btn-download-pdf-hero" onClick={() => setShowBrochureModal(true)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="CatalogButtonIcon" style={{ width: '18px', height: '18px', marginRight: '8px' }}>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              {t('catalog.download_pdf')}
            </button>
            <button className="ButtonSecondary" id="btn-request-quote-hero" onClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              } else {
                setActiveTab('HOME');
                setTimeout(() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }
            }}>
              GET A CUSTOM QUOTE &rarr;
            </button>
          </div>
        </div>

        <div className="CatalogMetricStrip">
          <div className="CatalogMetricItem">
            <div className="stat-circle-wrapper">
              <svg className="stat-circle" viewBox="0 0 36 36">
                <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="circle-fill" strokeDasharray="80, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <span className="catalog-stat-value">{apiStats?.total_models || equipmentList.length}</span>
            </div>
            <span className="catalog-stat-label">{t('catalog.total_models')}</span>
          </div>
          <div className="CatalogMetricItem">
            <div className="stat-circle-wrapper">
              <svg className="stat-circle" viewBox="0 0 36 36">
                <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="circle-fill" strokeDasharray="100, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <span className="catalog-stat-value">{apiStats?.categories_count || categoryOptions.length}</span>
            </div>
            <span className="catalog-stat-label">{t('catalog.categories')}</span>
          </div>
          <div className="CatalogMetricItem">
            <div className="stat-circle-wrapper">
              <svg className="stat-circle" viewBox="0 0 36 36">
                <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="circle-fill" strokeDasharray="75, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <span className="catalog-stat-value">{apiStats?.new_units || equipmentList.filter(e => e.year === '2026').length}</span>
            </div>
            <span className="catalog-stat-label">{t('catalog.new_units')}</span>
          </div>
          <div className="CatalogMetricItem">
            <div className="stat-circle-wrapper">
              <svg className="stat-circle" viewBox="0 0 36 36">
                <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="circle-fill" strokeDasharray="90, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <span className="catalog-stat-value">{apiStats?.active_stock || equipmentList.filter(e => e.status === 'In Stock').length}</span>
              <span className="telemetry-pulse"></span>
            </div>
            <span className="catalog-stat-label">{t('catalog.active_stock')}</span>
          </div>
        </div>
      </section>

      <section className="CatalogInventoryBlock">
        <div className="CatalogSearchToolbar">
          <div className="CatalogSearchToolbarLayout">
            <div className="SearchTextInputFieldFrame">
              <svg className="SearchVectorIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                id="catalog-search-input"
                type="text"
                className="SearchTextInputBox"
                placeholder={t('catalog.search_placeholder')}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button className="SearchClearInputButton" onClick={() => setSearchQuery('')} aria-label="Clear search">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '14px', height: '14px' }}>
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              )}
            </div>
            <div className="SearchFilteringMetadata">
              <span className="SearchResultsCounter">
                <strong>{filteredFleet.length}</strong> {filteredFleet.length === 1 ? t('catalog.model_found') : t('catalog.models_found')}
              </span>
              {isFilterActive && (
                <button className="SearchResetAllFiltersButton" onClick={resetFilters}>
                  {t('catalog.clear_all')}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '13px', height: '13px' }}>
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              )}
              <button className="CatalogMobileDrawerTrigger" onClick={() => setDrawerOpen(prev => !prev)} id="btn-mobile-filters">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', height: '16px' }}>
                  <line x1="4" y1="6" x2="20" y2="6"/>
                  <line x1="8" y1="12" x2="16" y2="12"/>
                  <line x1="11" y1="18" x2="13" y2="18"/>
                </svg>
                {t('catalog.filters')} {isFilterActive && <span className="filter-active-dot"></span>}
              </button>
            </div>
          </div>
        </div>

        <div className="CatalogGridLayout">
          <aside className={`CatalogSidebarFilters ${drawerOpen ? 'open' : ''}`}>
            <div className="csb-header">
              <span className="csb-title">{t('catalog.filters')}</span>
              {isFilterActive && (
                <button className="csb-clear-btn" onClick={resetFilters}>{t('catalog.clear_all')}</button>
              )}
            </div>

            <div className="csb-section">
              <span className="csb-section-label">{t('catalog.category')}</span>
              <div className="csb-check-list">
                {categoryOptions.map(cat => {
                  const count = equipmentList.filter(i => i.category === cat).length;
                  const checked = selectedCategoryFilters.includes(cat);
                  return (
                    <label key={cat} className={`csb-check-item ${checked ? 'checked' : ''}`}>
                      <span className={`csb-checkbox ${checked ? 'checked' : ''}`}>
                        {checked && (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ width: '11px', height: '11px' }}>
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                        )}
                      </span>
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleCategorySelection(cat)}
                        style={{ display: 'none' }}
                      />
                      <span className="csb-check-label">{cat.charAt(0) + cat.slice(1).toLowerCase()}</span>
                      <span className="csb-check-count">{count}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="csb-divider"></div>

            <div className="csb-section">
              <span className="csb-section-label">{t('catalog.manufacturing_year')}</span>
              <div className="csb-select-wrapper">
                <select
                  id="catalog-year-select"
                  className="csb-select"
                  value={selectedYearFilter}
                  onChange={e => setSelectedYearFilter(e.target.value)}
                >
                  {manufacturingYears.map(y => (
                    <option key={y} value={y}>{y === 'ALL' ? t('catalog.all_years') : y}</option>
                  ))}
                </select>
                <svg className="csb-select-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </div>
            </div>

            <div className="csb-divider"></div>

            <div className="csb-section">
              <span className="csb-section-label">{t('catalog.availability')}</span>
              <div className="csb-availability-list">
                <div className="csb-avail-item">
                  <span className="csb-avail-dot green"></span>
                  <span className="csb-avail-label">{t('catalog.in_stock')}</span>
                  <span className="csb-check-count">{equipmentList.filter(i => i.status === 'In Stock').length}</span>
                </div>
                <div className="csb-avail-item">
                  <span className="csb-avail-dot orange"></span>
                  <span className="csb-avail-label">{t('catalog.available')}</span>
                  <span className="csb-check-count">{equipmentList.filter(i => i.status === 'Available').length}</span>
                </div>
              </div>
            </div>
          </aside>

          <div className="CatalogFleetInventoryGrid">
            <div className="PremiumBanner" style={{ textAlign: 'center', margin: '0 0 30px 0', padding: '20px', backgroundColor: 'rgba(255, 153, 0, 0.05)', border: '1px solid rgba(255, 153, 0, 0.2)', borderRadius: '8px', color: 'var(--text-white)' }}>
              <div style={{ color: 'var(--accent-orange)', marginBottom: '8px' }}>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</div>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '1.2rem', fontWeight: '800' }}>Premium Heavy Machinery Collection</h3>
              <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-gray)' }}>Built for Construction • Mining • Infrastructure</p>
              <div style={{ color: 'var(--accent-orange)', marginTop: '8px' }}>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</div>
            </div>

            <div className="CatalogInventoryGridHeader">
              <h2 className="CatalogInventoryGridTitle">
                {selectedCategoryFilters.length > 0
                  ? selectedCategoryFilters.join(' · ')
                  : activeCategoryFilter === 'ALL' ? t('catalog.all_equipment') : activeCategoryFilter}
              </h2>
              <span className="CatalogInventoryGridCounter">{filteredFleet.length} {t('catalog.models_available')}</span>
            </div>

            {filteredFleet.length === 0 ? (
              <div className="CatalogEmptyStateFeedback">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '48px', height: '48px', color: 'var(--text-dim)' }}>
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <h3>{t('catalog.no_equipment')}</h3>
                <p>{t('catalog.try_adjusting')}</p>
                <button className="ButtonPrimary" onClick={resetFilters}>{t('catalog.reset_filters')}</button>
              </div>
            ) : (
              <div className="CatalogVehiclesGridLayout">
                {filteredFleet.map((vehicle) => (
                  <div key={vehicle.id} className="CatalogVehicleInventoryCard">
                    <div className="InventoryCardMediaViewport">
                      <img src={vehicle.image} alt={vehicle.name} className="InventoryCardAsset" />
                      <div className="InventoryCardMediaOverlay"></div>
                    </div>
                    <div className="InventoryCardSpecificationBlock">
                      <span className="InventoryCardVehicleCode">{vehicle.modelCode}</span>
                      <h3 className="InventoryCardVehicleHeading">{t(`fleet.${vehicle.id}.name`)}</h3>
                      <p className="InventoryCardVehicleSummary">{t(`fleet.${vehicle.id}.description`)}</p>
                      <span 
                        className="InventoryCardDetailsTrigger" 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProduct(vehicle);
                        }}
                      >
                        {t('catalog.read_more')} &rarr;
                      </span>
                      
                      <div className="InventoryCardQuickSpecsGrid">
                        {vehicle.specs.slice(0, 2).map((spec, index) => {
                          const specLabelKey = spec.label.toLowerCase().replace(/[\s\(\)\/]+/g, '_').replace(/_+$/, '');
                          const specValueKey = spec.value.toLowerCase().replace(/[\s\(\)\/]+/g, '_').replace(/_+$/, '');
                          return (
                            <div key={index} className="InventoryCardQuickSpecItem">
                              <span className="spec-label">
                                {spec.label.toLowerCase().includes('payload') || spec.label.toLowerCase().includes('operating weight') 
                                  ? '⚖ Payload' 
                                  : spec.label.toLowerCase().includes('engine') 
                                    ? '⚙ Engine' 
                                    : t(`specs.labels.${specLabelKey}`, { defaultValue: spec.label })}
                              </span>
                              <span className="spec-value">{t(`specs.values.${specValueKey}`, { defaultValue: spec.value })}</span>
                            </div>
                          );
                        })}
                      </div>

                      <div className="InventoryCardActionGroup">
                        <button className="ButtonPrimary InventoryCardPrimaryAction" id={`btn-details-${vehicle.id}`} onClick={() => {
                          setSelectedProduct(vehicle);
                        }}>
                          {t('catalog.details')} <span>&rarr;</span>
                        </button>
                        <button className="InventoryCardSecondaryAction" title="Download Spec Sheet PDF" id={`btn-spec-${vehicle.id}`} onClick={() => downloadSpecPDF(vehicle)}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '14px', height: '14px', flexShrink: 0 }}>
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                          </svg>
                          {t('catalog.pdf')}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="CatalogPromoCTASection">
        <div className="CatalogPromoCTAContainer">
          <div className="CatalogPromoCTAMainText">
            <span className="download-banner-pill">{t('catalog.promo_badge')}</span>
            <h2 className="download-banner-title">{t('catalog.promo_title')}</h2>
            <p className="download-banner-desc">
              {t('catalog.promo_desc')}
            </p>
          </div>
          <div className="CatalogPromoCTAActionGroup">
            <button className="ButtonPrimary cta-btn download-pdf-btn" id="btn-download-pdf-footer" onClick={() => setShowBrochureModal(true)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '18px', height: '18px', marginRight: '8px' }}>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              {t('catalog.download_12mb')}
            </button>
            <button className="ButtonSecondary contact-sales-btn" id="btn-contact-sales-footer" onClick={() => {
              setActiveTab('HOME');
              setTimeout(() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}>
              {t('catalog.contact_sales')}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CatalogPage;
