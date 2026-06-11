/**
 * Transforms API equipment data into the fleetData.js shape
 * used by existing components (CatalogPage, DetailsPage, etc.)
 * 
 * This ensures backward compatibility — components don't need to know
 * whether data came from the API or from the static fallback.
 */

/**
 * Map a single API equipment object to the local fleet item shape.
 * @param {Object} apiItem - Equipment object from /equipments endpoint
 * @returns {Object} - Fleet item in local shape
 */
export function mapApiEquipmentToFleet(apiItem) {
  if (!apiItem) return null;

  // Extract card_specs into the specs array format
  const specs = (apiItem.card_specs || apiItem.highlights || []).map(s => ({
    label: s.label,
    value: s.value
  }));

  // Extract full specifications into extraSpecs
  const extraSpecs = (apiItem.specifications || []).map(s => ({
    label: s.label,
    value: s.value
  }));

  // Build gallery from images array
  const gallery = apiItem.images || (apiItem.image ? [apiItem.image] : []);

  // Map stock status
  let status = 'In Stock';
  if (apiItem.stock_status === 'out_of_stock') {
    status = 'Out of Stock';
  } else if (apiItem.stock_status === 'pre_order' || apiItem.stock_status === 'available') {
    status = 'Available';
  }

  // Extract year from series (e.g. "KL-950 — 2026 SERIES" => "2026")
  let year = '';
  if (apiItem.series) {
    const yearMatch = apiItem.series.match(/(\d{4})/);
    if (yearMatch) year = yearMatch[1];
  }

  // Extract model code from name or slug
  let modelCode = '';
  if (apiItem.name) {
    const codeMatch = apiItem.name.match(/^([A-Z]{1,3}-?\d+)/i);
    if (codeMatch) modelCode = codeMatch[1].toUpperCase();
  }
  if (!modelCode && apiItem.sku) {
    modelCode = apiItem.sku.replace('KEMET-', '');
  }

  return {
    id: apiItem.id,
    category: apiItem.category?.name?.toUpperCase() || 'UNCATEGORIZED',
    name: apiItem.name,
    modelCode: modelCode,
    image: apiItem.image,
    year: year,
    description: apiItem.description,
    longDescription: apiItem.long_description || apiItem.description,
    specs: specs,
    extraSpecs: extraSpecs,
    gallery: gallery,
    status: status,
    slug: apiItem.slug,
    series: apiItem.series,
    isFeatured: apiItem.is_featured,
    features: apiItem.features || [],
    specSheet: apiItem.spec_sheet
  };
}

/**
 * Map an array of API equipment objects to fleet items.
 * @param {Array} apiItems - Array of equipment objects from API
 * @returns {Array} - Array of fleet items in local shape
 */
export function mapApiEquipmentsToFleet(apiItems) {
  if (!Array.isArray(apiItems)) return [];
  return apiItems.map(mapApiEquipmentToFleet).filter(Boolean);
}

/**
 * Map API categories response to the local category options format.
 * @param {Array} apiCategories - Array from /categories endpoint
 * @returns {Array} - Array of { name, slug, count } objects
 */
export function mapApiCategories(apiCategories) {
  if (!Array.isArray(apiCategories)) return [];
  return apiCategories.map(cat => ({
    name: cat.name?.toUpperCase() || '',
    slug: cat.slug || '',
    description: cat.description || '',
    count: cat.products_count || 0,
    image: cat.image
  }));
}
