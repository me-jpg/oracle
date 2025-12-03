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

  // Calculate Oracle Score for each result
  const resultsWithOracleScore = useMemo(() => {
    return results.map(content => ({
      ...content,
      oracleScore: calculateOracleScore(content, userData, '')
    }));
  }, [results, userData]);

  // Sort by Oracle Score (highest first)
  const sortedResults = [...resultsWithOracleScore].sort((a, b) => (b.oracleScore || 0) - (a.oracleScore || 0));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
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
      <div className="space-y-4">
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
        <div className="flex justify-center pt-6">
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
