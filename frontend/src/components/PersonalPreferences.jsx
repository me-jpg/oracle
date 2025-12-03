import React, { useState, useEffect } from 'react';

const GENRES = [
  'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary',
  'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Thriller'
];

const MOODS = [
  'Feel-good', 'Intense', 'Thought-provoking', 'Lighthearted',
  'Dark', 'Suspenseful', 'Emotional', 'Funny'
];

export function PersonalPreferences({ isOpen, onClose }) {
  const [preferences, setPreferences] = useState({
    favoriteGenres: [],
    dislikedGenres: [],
    favoriteActors: '',
    preferredMoods: [],
    preferredLength: 'any',
    ageRating: 'any',
    minRating: 0,
    ageRange: 'all',
    excludedRatings: []
  });

  useEffect(() => {
    const saved = localStorage.getItem('oracle_personal_preferences');
    if (saved) {
      setPreferences(JSON.parse(saved));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('oracle_personal_preferences', JSON.stringify(preferences));
    onClose();
  };

  const toggleGenre = (genre, isFavorite) => {
    const key = isFavorite ? 'favoriteGenres' : 'dislikedGenres';
    setPreferences(prev => ({
      ...prev,
      [key]: prev[key].includes(genre)
        ? prev[key].filter(g => g !== genre)
        : [...prev[key], genre]
    }));
  };

  const toggleMood = (mood) => {
    setPreferences(prev => ({
      ...prev,
      preferredMoods: prev.preferredMoods.includes(mood)
        ? prev.preferredMoods.filter(m => m !== mood)
        : [...prev.preferredMoods, mood]
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-[100] p-6 overflow-y-auto backdrop-blur-sm">
      {/* Subtle purple glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-transparent to-purple-600/5 pointer-events-none"></div>
      
      <div className="relative bg-black border border-white/10 rounded-2xl w-full max-w-3xl my-8 shadow-2xl shadow-purple-500/10">
        <div className="p-8 border-b border-white/10">
          <h2 className="text-3xl font-bold text-white mb-2">Personal Preferences</h2>
          <p className="text-white/50">Help Oracle understand your taste for better recommendations</p>
        </div>

        <div className="p-8 space-y-8 max-h-[60vh] overflow-y-auto">
          {/* Favorite Genres */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Favorite Genres</h3>
            <div className="flex flex-wrap gap-2">
              {GENRES.map(genre => (
                <button
                  key={genre}
                  onClick={() => toggleGenre(genre, true)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all border ${
                    preferences.favoriteGenres.includes(genre)
                      ? 'border-purple-500 bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                      : 'border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:border-purple-500/30'
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          {/* Disliked Genres */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Restrictions (Content to Avoid)</h3>
            <div className="flex flex-wrap gap-2">
              {GENRES.map(genre => (
                <button
                  key={genre}
                  onClick={() => toggleGenre(genre, false)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all border ${
                    preferences.dislikedGenres.includes(genre)
                      ? 'border-red-500 bg-red-500 text-white'
                      : 'border-white/10 bg-white/5 text-white/70 hover:bg-white/10'
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          {/* Preferred Moods */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Preferred Moods</h3>
            <div className="flex flex-wrap gap-2">
              {MOODS.map(mood => (
                <button
                  key={mood}
                  onClick={() => toggleMood(mood)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all border ${
                    preferences.preferredMoods.includes(mood)
                      ? 'border-purple-500 bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                      : 'border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:border-purple-500/30'
                  }`}
                >
                  {mood}
                </button>
              ))}
            </div>
          </div>

          {/* Favorite Actors/Directors */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Favorite Actors/Directors</h3>
            <textarea
              value={preferences.favoriteActors}
              onChange={(e) => setPreferences(prev => ({ ...prev, favoriteActors: e.target.value }))}
              placeholder="e.g., Tom Hanks, Christopher Nolan, Meryl Streep..."
              className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-all"
              rows="3"
            />
          </div>

          {/* Minimum Rating */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Minimum Rating</h3>
            <select
              value={preferences.minRating || 0}
              onChange={(e) => setPreferences(prev => ({ ...prev, minRating: parseFloat(e.target.value) }))}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500"
            >
              <option value={0}>Any Rating</option>
              <option value={6.0}>6.0+ (Good)</option>
              <option value={7.0}>7.0+ (Great)</option>
              <option value={8.0}>8.0+ (Excellent)</option>
              <option value={9.0}>9.0+ (Masterpiece)</option>
            </select>
          </div>

          {/* Exclude Movie Ratings */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Exclude Movie Ratings</h3>
            <p className="text-sm text-white/50 mb-4">Select ratings you want to exclude</p>
            <div className="flex flex-wrap gap-2">
              {['G', 'PG', 'PG-13', 'R', 'NC-17'].map(rating => (
                <button
                  key={rating}
                  onClick={() => {
                    setPreferences(prev => ({
                      ...prev,
                      excludedRatings: prev.excludedRatings?.includes(rating)
                        ? prev.excludedRatings.filter(r => r !== rating)
                        : [...(prev.excludedRatings || []), rating]
                    }));
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all border ${
                    preferences.excludedRatings?.includes(rating)
                      ? 'border-red-500 bg-red-500 text-white'
                      : 'border-white/10 bg-white/5 text-white/70 hover:bg-white/10'
                  }`}
                >
                  {rating}
                </button>
              ))}
            </div>
          </div>

        </div>

        <div className="p-8 border-t border-white/10 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-semibold hover:bg-white/10 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-6 py-3 bg-white text-black rounded-xl font-bold hover:bg-white/90 transition-all"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}

export function getPersonalPreferences() {
  const saved = localStorage.getItem('oracle_personal_preferences');
  if (saved) {
    return JSON.parse(saved);
  }
  return {
    favoriteGenres: [],
    dislikedGenres: [],
    favoriteActors: '',
    preferredMoods: [],
    preferredLength: 'any',
    ageRating: 'any',
    minRating: 0,
    ageRange: 'all'
  };
}
