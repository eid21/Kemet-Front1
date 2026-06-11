/**
 * Centralized API client using native fetch().
 *
 * - Reads base URL from VITE_API_BASE_URL env var
 * - Injects Accept: application/json and X-Locale headers automatically
 * - 5-second timeout via AbortController
 * - Returns parsed JSON data on success, null on ANY failure (network, timeout, non-2xx)
 *   so the frontend can gracefully fall back to static data
 */

import i18n from '../i18n.js';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://kemetmachinery.com/api';
const TIMEOUT_MS = 5000;

/**
 * @param {string}  endpoint  — API path (e.g. "/settings"), appended to BASE_URL
 * @param {object}  [options] — Optional fetch options override
 * @param {string}  [options.method]  — HTTP method, defaults to "GET"
 * @param {object}  [options.body]    — Request body (will be JSON-stringified)
 * @param {object}  [options.params]  — Query-string parameters (key/value pairs)
 * @param {object}  [options.headers] — Additional headers to merge
 * @returns {Promise<object|null>} Parsed response data, or null on failure
 */
export default async function apiClient(endpoint, options = {}) {
  const { method = 'GET', body, params, headers: extraHeaders } = options;

  // ── Build URL with optional query params ───────────────────────────
  const url = new URL(`${BASE_URL}${endpoint}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.append(key, value);
      }
    });
  }

  // ── Resolve current locale ─────────────────────────────────────────
  const locale = i18n.language || 'en';

  // ── Merge headers ──────────────────────────────────────────────────
  const headers = {
    Accept: 'application/json',
    'X-Locale': locale,
    ...extraHeaders,
  };

  // POST / PUT / PATCH with a body → set Content-Type
  if (body) {
    headers['Content-Type'] = 'application/json';
  }

  // ── Abort controller for timeout ───────────────────────────────────
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(url.toString(), {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // Non-2xx → silent failure
    if (!response.ok) {
      if (import.meta.env.DEV) {
        console.warn(
          `[apiClient] ${method} ${endpoint} → ${response.status} ${response.statusText}`
        );
      }
      return null;
    }

    const json = await response.json();

    // Return the full envelope so consumers can access data, pagination, message, etc.
    return json;
  } catch (error) {
    clearTimeout(timeoutId);

    if (import.meta.env.DEV) {
      const reason =
        error.name === 'AbortError'
          ? 'Request timed out'
          : error.message;
      console.warn(`[apiClient] ${method} ${endpoint} — ${reason}`);
    }

    return null;
  }
}
