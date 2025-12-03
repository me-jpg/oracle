import React, { useState, useEffect } from 'react';
import { ResultCard } from './ResultCard';
import { DVDScreensaver } from './DVDScreensaver';

export function TrendingSection({ userData, toast }) {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('hot');

  const fetchTrending = async (type) => {
    setLoading(true);
    try {
      const query = type === 'hot' 
        ? 'trending popular movies and shows right now that everyone is watching'
        : 'upcoming highly anticipated movies and shows releasing soon';
      
      // Create abort controller with 90 second timeout for trending
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 90000);
      
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        setTrending(data.results || []);
      } else {
        console.error('Trending fetch failed:', response.status);
        setTrending([]);
      }
    } catch (error) {
      console.error('Error fetching trending:', error);
      if (error.name === 'AbortError') {
        console.log('Trending request timed out');
      }
      setTrending([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrending(activeTab);
  }, [activeTab]);

  return (
    <div className="space-y-6">
      <div className="relative flex items-center gap-0 bg-white/[0.02] rounded-lg px-0.5 py-0.5 border border-white/[0.04] overflow-hidden backdrop-blur-sm">
        {/* Purple flare within the box */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/15 via-purple-500/20 to-purple-600/15 blur-2xl"></div>
        <button
          onClick={() => setActiveTab('hot')}
          className={`relative z-10 px-3 py-1.5 rounded-md font-semibold text-sm transition-all duration-200 text-white ${
            activeTab === 'hot'
              ? 'bg-white/[0.08]'
              : 'hover:bg-white/[0.04]'
          }`}
        >
          🔥 Hot Right Now
        </button>
        <div className="h-5 w-px bg-white/[0.08] relative z-10"></div>
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`relative z-10 px-3 py-1.5 rounded-md font-semibold text-sm transition-all duration-200 text-white ${
            activeTab === 'upcoming'
              ? 'bg-white/[0.08]'
              : 'hover:bg-white/[0.04]'
          }`}
        >
          ⭐ Coming Soon
        </button>
      </div>

      {loading ? (
        <DVDScreensaver />
      ) : (
        <div className="space-y-4">
          {trending.slice(0, 5).map(content => (
            <ResultCard key={content.id} content={content} userData={userData} toast={toast} />
          ))}
        </div>
      )}
    </div>
  );
}
