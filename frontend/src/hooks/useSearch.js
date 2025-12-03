import { useState } from 'react';

/**
 * Custom hook to manage search state and API calls
 */
export function useSearch() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const search = async (query, filters) => {
    setLoading(true);
    setError(null);
    setHasSearched(true);

    // Create abort controller with 60 second timeout for AI processing
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000);

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          ...filters
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Search failed: ${response.statusText}`);
      }

      const data = await response.json();
      setResults(data.results || []);
    } catch (err) {
      clearTimeout(timeoutId);
      if (err.name === 'AbortError') {
        setError('Search timed out. The AI is taking longer than expected. Please try again.');
      } else {
        setError(err.message);
      }
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setResults([]);
    setError(null);
    setHasSearched(false);
  };

  return {
    results,
    loading,
    error,
    hasSearched,
    search,
    reset
  };
}

