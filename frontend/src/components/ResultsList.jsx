import React, { useMemo } from 'react';
import { ResultCard } from './ResultCard';
import { DVDScreensaver } from './DVDScreensaver';
import { calculateOracleScore } from '../utils/oracleScore';

export function ResultsList({ results, loading, error, hasSearched, userData, toast }) {
  if (loading) {
    return <DVDScreensaver />;
  }

  if (error) {
    return (
      <div className="text-center py-12 bg-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/[0.08]">
        <div className="text-5xl mb-4 opacity-30">⚠️</div>
        <p className="text-white/60 mb-2">Search failed</p>
        <p className="text-sm text-white/40">{error}</p>
      </div>
    );
  }

  if (!hasSearched) {
    return null;
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-12 bg-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/[0.08]">
        <div className="text-5xl mb-4 opacity-30">🔍</div>
        <p className="text-white/60">No results found</p>
        <p className="text-sm text-white/40 mt-2">Try a different search query</p>
      </div>
    );
  }

  // Calculate Oracle Score for each result - only recalculate when results change, not userData
  const resultsWithOracleScore = useMemo(() => {
    return results.map((content, index) => ({
      ...content,
      oracleScore: calculateOracleScore(content, userData, ''),
      originalIndex: index // Keep original order
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results]); // Don't include userData in deps to prevent re-sorting when adding to list

  // Sort by Oracle Score (highest first) - stable sort using originalIndex as tiebreaker
  const sortedResults = [...resultsWithOracleScore].sort((a, b) => {
    const scoreDiff = (b.oracleScore || 0) - (a.oracleScore || 0);
    if (Math.abs(scoreDiff) < 0.01) { // If scores are very close, use original order
      return a.originalIndex - b.originalIndex;
    }
    return scoreDiff;
  });

  return (
    <div className="relative">
      {/* Purple ambience effects */}
      <div className="absolute -top-32 left-[20%] w-96 h-96 bg-purple-600/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-64 right-[15%] w-80 h-80 bg-purple-500/6 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-32 left-[40%] w-72 h-72 bg-purple-400/4 rounded-full blur-3xl pointer-events-none"></div>
      
      {/* Header Section */}
      <div className="flex items-center justify-between relative z-10">
        <h2 className="text-xs font-semibold text-white/30 uppercase tracking-wider">
          {sortedResults.length} Result{sortedResults.length === 1 ? '' : 's'}
        </h2>
        <div className="flex items-center gap-2">
          <div className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full">
            <span className="text-xs font-semibold text-purple-300">
              Personalized Picks
            </span>
          </div>
        </div>
      </div>
      
      {/* 🎯 SPACING: 20px between header and grid (easily adjustable) */}
      <div className="h-5"></div>
      
      {/* 
        🎯 GRID SPACING CONTROL:
        - gap: 40px horizontal, 32px vertical (row-gap & column-gap)
        - grid-template-columns: auto-fit with min 360px cards
        - align-items: start - cards align to TOP of grid cells
      */}
      <div 
        className="relative z-10 items-start"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          rowGap: '32px',
          columnGap: '40px',
          alignItems: 'start'
        }}
      >
        {sortedResults.map((content, index) => (
          <div
            key={content.id}
            className="animate-fadeIn"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <ResultCard content={content} userData={userData} toast={toast} />
          </div>
        ))}
      </div>
      
      {/* Generate More Results */}
      {sortedResults.length > 0 && (
        <div className="flex justify-center pt-6 relative z-10">
          <button
            onClick={() => {
              // Re-search with same query to get more results
              toast?.info('Generating more results...');
            }}
            className="px-8 py-3 bg-white/[0.06] hover:bg-white/[0.10] border border-white/[0.12] hover:border-white/20 text-white rounded-xl font-semibold transition-all hover:scale-105"
          >
            Load More Results
          </button>
        </div>
      )}
    </div>
  );
}
