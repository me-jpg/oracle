import React, { useState, useEffect } from 'react';
import { STREAMING_SERVICE_INFO } from '../data/streamingServices';
import { PersonalPreferences } from './PersonalPreferences';

const STREAMING_SERVICES = [
  'Netflix', 'Prime Video', 'Hulu', 'Disney+', 
  'Max', 'Apple TV+', 'Paramount+', 'Peacock'
];

const GENRES = [
  'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary',
  'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Thriller'
];

export function SetupFlow({ onComplete, showClose }) {
  const [step, setStep] = useState(1);
  const [services, setServices] = useState([]);
  const [rentBuy, setRentBuy] = useState({ rent: false, buy: false });
  const [subscriptionOnly, setSubscriptionOnly] = useState(false);
  const [showPersonalPrefs, setShowPersonalPrefs] = useState(false);
  const [personalPrefs, setPersonalPrefs] = useState({
    favoriteGenres: [],
    dislikedGenres: [],
    favoriteActors: '',
    preferredLength: 'any',
    excludedRatings: []
  });

  useEffect(() => {
    const savedServices = localStorage.getItem('oracle_preferences');
    const savedPersonal = localStorage.getItem('oracle_personal_preferences');
    
    if (savedServices) {
      const parsed = JSON.parse(savedServices);
      setServices(parsed.services || []);
      setRentBuy(parsed.rentBuy || { rent: false, buy: false });
    }
    
    if (savedPersonal) {
      setPersonalPrefs(JSON.parse(savedPersonal));
    }
  }, []);

  const handleServiceToggle = (service) => {
    setServices(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const handleComplete = () => {
    localStorage.setItem('oracle_personal_preferences', JSON.stringify(personalPrefs));
    finishSetup();
  };

  const finishSetup = () => {
    onComplete({
      services,
      rentBuy: subscriptionOnly ? { rent: false, buy: false } : rentBuy
    });
  };

  const toggleGenre = (genre, isFavorite) => {
    const key = isFavorite ? 'favoriteGenres' : 'dislikedGenres';
    setPersonalPrefs(prev => ({
      ...prev,
      [key]: prev[key].includes(genre)
        ? prev[key].filter(g => g !== genre)
        : [...prev[key], genre]
    }));
  };

  const handleSavePersonalPrefs = () => {
    localStorage.setItem('oracle_personal_preferences', JSON.stringify(personalPrefs));
    setShowPersonalPrefs(false);
    handleComplete();
  };

  if (step === 1) {
    const allSelected = services.length === STREAMING_SERVICES.length;
    
    const handleSelectAll = () => {
      if (allSelected) {
        setServices([]);
      } else {
        setServices([...STREAMING_SERVICES]);
      }
    };

    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] relative">
        {/* Personalization heading at the very top */}
        <div className="absolute -top-16 left-0 right-0 text-center py-4">
          <p className="text-base text-white/80 font-bold tracking-wide">
            Smarter movie search powered by AI - built around <span className="text-purple-400 font-extrabold">YOU</span>
          </p>
        </div>
        
        {/* Close button - only show if showClose is true */}
        {showClose && (
          <button
            onClick={finishSetup}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/[0.08] hover:bg-white/[0.12] border border-white/20 text-white transition-all hover:scale-110 z-50"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
        
        {/* Purple background glow */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        
        <div className="w-full max-w-2xl space-y-6 relative z-10">
          <div className="space-y-2">
              <div>
                <h2 className="text-3xl font-bold text-white mb-1">
                  Getting to know you
            </h2>
                <p className="text-base text-white/50">
                  Select your streaming services
                </p>
              </div>
            <p className="text-sm text-white/40">
              Choose all that apply
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {STREAMING_SERVICES.map(service => {
              const serviceInfo = STREAMING_SERVICE_INFO[service];
              return (
              <button
                key={service}
                onClick={() => handleServiceToggle(service)}
                  className={`px-4 py-3 rounded-lg border transition-all duration-200 text-left font-semibold text-sm flex items-center gap-3 ${
                  services.includes(service)
                    ? 'border-white bg-white text-black'
                      : 'border-white/[0.08] bg-white/[0.04] text-white hover:bg-white/[0.08]'
                  }`}
                >
                  {serviceInfo?.logo && (
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      services.includes(service) ? 'bg-black/10' : 'bg-white/10'
                    }`}>
                      <img 
                        src={serviceInfo.logo} 
                        alt={`${service} logo`}
                        className={`w-6 h-6 object-contain ${
                          services.includes(service) ? 'brightness-0' : 'brightness-0 invert'
                        }`}
                        onError={(e) => e.target.parentElement.style.display = 'none'}
                      />
                    </div>
                  )}
                  <span>{service}</span>
              </button>
              );
            })}
          </div>

          <div className="flex gap-2.5">
            <button
              onClick={handleSelectAll}
              className="px-6 py-3 bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.12] text-white rounded-lg text-sm font-semibold transition-all duration-200 hover:scale-105"
            >
              {allSelected ? 'Deselect All' : 'Select All'}
            </button>
            <button
              onClick={() => setStep(2)}
              className="flex-1 px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-white/90 transition-all duration-200 text-sm"
            >
              {services.length > 0 ? 'Continue' : 'Skip'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] relative">
        {/* Purple background glow */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
        
        <div className="w-full max-w-2xl space-y-6 relative z-10">
          <div className="space-y-2">
            <div>
              <h2 className="text-3xl font-bold text-white mb-1">
                Getting to know you
            </h2>
              <p className="text-base text-white/50">
                How do you want to watch?
            </p>
            </div>
          </div>

          <div className="space-y-2.5">
            <button
              onClick={() => {
                setRentBuy(prev => ({ ...prev, rent: !prev.rent }));
                setSubscriptionOnly(false);
              }}
              disabled={subscriptionOnly}
              className={`w-full px-4 py-3 rounded-lg border transition-all text-left ${
                subscriptionOnly
                  ? 'border-white/[0.04] bg-white/[0.02] text-white/30 cursor-not-allowed'
                  : rentBuy.rent
                  ? 'border-white bg-white text-black'
                  : 'border-white/[0.08] bg-white/[0.04] text-white hover:bg-white/[0.08]'
              }`}
            >
              <div className="font-semibold text-sm">Rent</div>
              <div className="text-xs opacity-70">Pay per movie/show</div>
            </button>

            <button
              onClick={() => {
                setRentBuy(prev => ({ ...prev, buy: !prev.buy }));
                setSubscriptionOnly(false);
              }}
              disabled={subscriptionOnly}
              className={`w-full px-4 py-3 rounded-lg border transition-all text-left ${
                subscriptionOnly
                  ? 'border-white/[0.04] bg-white/[0.02] text-white/30 cursor-not-allowed'
                  : rentBuy.buy
                  ? 'border-white bg-white text-black'
                  : 'border-white/[0.08] bg-white/[0.04] text-white hover:bg-white/[0.08]'
              }`}
            >
              <div className="font-semibold text-sm">Buy</div>
              <div className="text-xs opacity-70">Own it permanently</div>
            </button>

            <button
              onClick={() => {
                setSubscriptionOnly(!subscriptionOnly);
                setRentBuy({ rent: false, buy: false });
              }}
              className={`w-full px-4 py-3 rounded-lg border transition-all text-left ${
                subscriptionOnly
                  ? 'border-white bg-white text-black'
                  : 'border-white/[0.08] bg-white/[0.04] text-white hover:bg-white/[0.08]'
              }`}
            >
              <div className="font-semibold text-sm">Prioritize Subscriptions</div>
              <div className="text-xs opacity-70">Free with my services</div>
            </button>
          </div>

          <div className="flex gap-2.5">
            <button
              onClick={() => setStep(1)}
              className="flex-1 px-6 py-2.5 border border-white/[0.08] bg-white/[0.04] rounded-lg font-semibold hover:bg-white/[0.08] transition-all text-white text-sm"
            >
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              disabled={!rentBuy.rent && !rentBuy.buy && !subscriptionOnly}
              className={`flex-1 px-6 py-2.5 rounded-lg font-semibold transition-all text-sm ${
                !rentBuy.rent && !rentBuy.buy && !subscriptionOnly
                  ? 'bg-white/20 text-white/40 cursor-not-allowed'
                  : 'bg-white text-black hover:bg-white/90'
              }`}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] relative">
        {/* Purple background glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
        
        <div className="w-full max-w-2xl space-y-8 relative z-10 text-center">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold text-white">
              Want More Personalization?
            </h2>
            <p className="text-lg text-white/60 max-w-xl mx-auto">
              Fine-tune your recommendations by setting preferences for genres, actors, content restrictions (PG, PG-13, etc), and more
            </p>
          </div>

          {/* Preview cards of what's available */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="p-6 bg-white/[0.04] border border-white/[0.08] rounded-xl">
              <div className="text-3xl mb-2">🎭</div>
              <h3 className="text-white font-semibold mb-1">Favorite Genres</h3>
              <p className="text-white/40 text-sm">Action, Comedy, Drama, and more</p>
            </div>
            <div className="p-6 bg-white/[0.04] border border-white/[0.08] rounded-xl">
              <div className="text-3xl mb-2">⭐</div>
              <h3 className="text-white font-semibold mb-1">Actors & Directors</h3>
              <p className="text-white/40 text-sm">Your favorite talent</p>
            </div>
            <div className="p-6 bg-white/[0.04] border border-white/[0.08] rounded-xl">
              <div className="text-3xl mb-2">🔒</div>
              <h3 className="text-white font-semibold mb-1">Content Restrictions</h3>
              <p className="text-white/40 text-sm">PG, PG-13, R ratings</p>
            </div>
          </div>

          <div className="flex gap-3 max-w-md mx-auto">
            <button
              onClick={handleComplete}
              className="flex-1 px-6 py-3 bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.12] text-white rounded-lg font-semibold transition-all duration-200 text-sm"
            >
              Skip for Now
            </button>
            <button
              onClick={() => setStep(4)}
              className="flex-1 px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-white/90 transition-all duration-200 text-sm"
            >
              Set Preferences
            </button>
          </div>

        </div>
      </div>
    );
  }

  if (step === 4) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] relative">
        {/* Purple background glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
        
        <div className="w-full max-w-3xl space-y-6 relative z-10">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold text-white mb-1">
              Getting to know you
            </h2>
            <p className="text-base text-white/50">
              Set your preferences
            </p>
          </div>

          <div className="space-y-6">
            {/* Favorite Genres */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Favorite Genres</h3>
              <div className="flex flex-wrap gap-2">
                {GENRES.map(genre => (
                  <button
                    key={genre}
                    onClick={() => toggleGenre(genre, true)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 border ${
                      personalPrefs.favoriteGenres.includes(genre)
                        ? 'border-white bg-white text-black'
                        : 'border-white/[0.08] bg-white/[0.04] text-white hover:bg-white/[0.08]'
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>

            {/* Favorite Actors */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Favorite Actors/Directors</h3>
              <input
                type="text"
                value={personalPrefs.favoriteActors}
                onChange={(e) => setPersonalPrefs(prev => ({ ...prev, favoriteActors: e.target.value }))}
                placeholder="e.g., Tom Hanks, Christopher Nolan"
                className="w-full px-4 py-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white placeholder-white/30 focus:outline-none focus:border-white/20 transition-all text-sm"
              />
            </div>

            {/* Preferred Length */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Preferred Content Length</h3>
              <div className="grid grid-cols-3 gap-2">
                {['Short (< 90 min)', 'Medium (90-150 min)', 'Any Length'].map((option, idx) => {
                  const value = ['short', 'medium', 'any'][idx];
                  return (
                    <button
                      key={value}
                      onClick={() => setPersonalPrefs(prev => ({ ...prev, preferredLength: value }))}
                      className={`px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 border ${
                        personalPrefs.preferredLength === value
                          ? 'border-white bg-white text-black'
                          : 'border-white/[0.08] bg-white/[0.04] text-white hover:bg-white/[0.08]'
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Content Restrictions (Movie Ratings) */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Exclude Movie Ratings</h3>
              <p className="text-sm text-white/50 mb-4">Select ratings you want to exclude</p>
              <div className="flex flex-wrap gap-2">
                {['G', 'PG', 'PG-13', 'R', 'NC-17'].map(rating => (
                  <button
                    key={rating}
                    onClick={() => {
                      setPersonalPrefs(prev => ({
                        ...prev,
                        excludedRatings: prev.excludedRatings?.includes(rating)
                          ? prev.excludedRatings.filter(r => r !== rating)
                          : [...(prev.excludedRatings || []), rating]
                      }));
                    }}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 border ${
                      personalPrefs.excludedRatings?.includes(rating)
                        ? 'border-red-500 bg-red-500 text-white'
                        : 'border-white/[0.08] bg-white/[0.04] text-white hover:bg-white/[0.08]'
                    }`}
                  >
                    {rating}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-2.5">
            <button
              onClick={() => setStep(3)}
              className="px-6 py-3 bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.12] text-white rounded-lg text-sm font-semibold transition-all duration-200"
            >
              Back
            </button>
            <button
              onClick={handleComplete}
              className="flex-1 px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-white/90 transition-all duration-200 text-sm"
            >
              Start Searching
            </button>
          </div>
        </div>
      </div>
    );
  }
}
