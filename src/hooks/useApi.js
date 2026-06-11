/**
 * Generic React hook for calling API service functions.
 *
 * Usage:
 *   const { data, loading, error } = useApi(
 *     () => getSettings(),        // API function (must return a promise)
 *     fallbackSettingsData,       // used when API returns null (offline / error)
 *     [locale]                    // re-fetch whenever locale changes
 *   );
 *
 * Behaviour:
 *   - Calls `apiFn` on mount and whenever `deps` change
 *   - If the API returns null (server down, timeout, non-2xx),
 *     `data` is set to `fallbackData` so the UI always has something to render
 *   - Stale closures are avoided with an `active` flag
 */

import { useState, useEffect, useCallback } from 'react';

/**
 * @param {() => Promise<object|null>} apiFn        — A function that returns a promise from apiClient
 * @param {*}                          [fallbackData=null] — Static data used when API fails
 * @param {Array}                      [deps=[]]    — Dependency array; refetch when any value changes
 * @returns {{ data: *, loading: boolean, error: string|null, refetch: () => void }}
 */
export default function useApi(apiFn, fallbackData = null, deps = []) {
  const [data, setData] = useState(fallbackData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (active) => {
    setLoading(true);
    setError(null);

    try {
      const result = await apiFn();

      // Guard against unmount / stale effect
      if (!active.current) return;

      if (result === null) {
        // API unreachable → fall back gracefully
        setData(fallbackData);
        setError('API unavailable — showing cached data');
      } else {
        // Unwrap envelope: prefer result.data, but keep full object if data key is absent
        setData(result.data !== undefined ? result.data : result);
      }
    } catch (err) {
      // Should rarely happen since apiClient swallows errors, but just in case
      if (!active.current) return;
      setData(fallbackData);
      setError(err.message || 'Unexpected error');
    } finally {
      if (active.current) {
        setLoading(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiFn]);

  useEffect(() => {
    const active = { current: true };
    fetchData(active);

    return () => {
      active.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  /** Manually re-trigger the fetch (e.g. retry button). */
  const refetch = useCallback(() => {
    const active = { current: true };
    fetchData(active);
  }, [fetchData]);

  return { data, loading, error, refetch };
}
