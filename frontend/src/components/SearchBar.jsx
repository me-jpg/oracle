import React, { useState, useMemo, useRef } from 'react';
import { exampleQueries } from '../data/exampleQueries';

export function SearchBar({ onSearch, loading }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  
  const randomExamples = useMemo(() => {
    const shuffled = [...exampleQueries].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 2);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  const handleFeelingLucky = () => {
    const randomQuery = exampleQueries[Math.floor(Math.random() * exampleQueries.length)];
    setQuery(randomQuery);
    onSearch(randomQuery);
  };

  return (
    <div className="w-full space-y-6">
      <form onSubmit={handleSubmit}>
        <div className="relative group">
          {/* Enhanced purple glow - contained */}
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-purple-500 rounded-xl blur-xl opacity-20 group-hover:opacity-35 group-focus-within:opacity-45 transition-opacity duration-1000"></div>
          
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Describe what you're in the mood for..."
              className="w-full px-8 py-5 rounded-xl bg-black border-2 border-white/20 text-white text-lg placeholder-white/40 focus:outline-none focus:border-white/40 focus:bg-black transition-all duration-300 font-medium shadow-2xl"
              disabled={loading}
              style={{ paddingRight: '150px' }}
            />
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 px-8 py-3.5 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white text-base font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 hover:scale-105"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Searching...
                </span>
              ) : (
                'Search'
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Real-time AI search & Personalized results indicators */}
      <div className="flex items-center gap-6 pl-2">
        <div className="flex items-center gap-2 group cursor-default">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
          <span className="text-sm text-white/40 font-semibold group-hover:text-white/60 transition-colors duration-200">Real-time AI search</span>
        </div>
        <div className="flex items-center gap-2 group cursor-default">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          <span className="text-sm text-white/40 font-semibold group-hover:text-white/60 transition-colors duration-200">Personalized results</span>
        </div>
      </div>
    </div>
  );
}
