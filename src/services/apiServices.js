/**
 * API service functions for every public endpoint.
 *
 * Each function returns the full JSON envelope { code, message, data, pagination }
 * on success, or null when the API is unreachable / returns an error.
 *
 * Endpoint reference:  Kemet-API.postman_collection.json
 */

import apiClient from '../utils/apiClient.js';

// ─── Settings & Content ──────────────────────────────────────────────

/** Global site settings (branding, contact, social, SEO, logo, favicon). */
export const getSettings = () => apiClient('/settings');

/** About page content (description, banner, image). */
export const getAboutUs = () => apiClient('/about-us');

/** Privacy policy page content. */
export const getPrivacy = () => apiClient('/privacy');

/** Terms & conditions page content. */
export const getTerms = () => apiClient('/terms');

/**
 * Paginated FAQ list.
 * @param {number} [page=1]
 * @param {number} [perPage=10]
 */
export const getFaqs = (page = 1, perPage = 10) =>
  apiClient('/faq', {
    params: { page, per_page: perPage },
  });

/** Active homepage banners. */
export const getBanners = () => apiClient('/banners');

/** Downloadable product-catalog PDF URL. */
export const getCatalogPdf = () => apiClient('/catalog');

// ─── Categories ──────────────────────────────────────────────────────

/** All active equipment categories with product counts. */
export const getCategories = () => apiClient('/categories');

// ─── Equipments ──────────────────────────────────────────────────────

/** Aggregate catalog statistics (total models, categories, featured, in-stock). */
export const getEquipmentStats = () => apiClient('/equipments/stats');

/**
 * List equipments with optional filters.
 * @param {object} [filters]
 * @param {string} [filters.category_slug] — e.g. "loaders", "excavators"
 * @param {number|string} [filters.featured] — 1 or 0
 * @param {string} [filters.search] — free-text search
 */
export const getEquipments = (filters = {}) =>
  apiClient('/equipments', {
    params: {
      ...(filters.category_slug && { category_slug: filters.category_slug }),
      ...(filters.featured !== undefined && { featured: filters.featured }),
      ...(filters.search && { search: filters.search }),
    },
  });

/** Full equipment detail by slug. */
export const getEquipmentBySlug = (slug) => apiClient(`/equipments/${encodeURIComponent(slug)}`);

// ─── Forms (POST) ───────────────────────────────────────────────────

/**
 * Submit contact form.
 * @param {{ name: string, email: string, phone: string, message: string }} data
 */
export const postContact = (data) =>
  apiClient('/contact', {
    method: 'POST',
    body: data,
  });

/**
 * Submit consultation request.
 * @param {{ name: string, email: string, phone: string, equipment_id: number, message: string }} data
 */
export const postConsultation = (data) =>
  apiClient('/consultation', {
    method: 'POST',
    body: data,
  });
