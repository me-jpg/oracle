import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { SetupFlow } from './components/SetupFlow';
import { SearchBar } from './components/SearchBar';
import { ResultsList } from './components/ResultsList';
import { MyListView } from './components/MyListView';
import { TrendingSection } from './components/TrendingSection';
import { StreamingDeals } from './components/StreamingDeals';
import { PersonalPreferences, getPersonalPreferences } from './components/PersonalPreferences';
import { HeroSection } from './components/HeroSection';
import { ScrollToTop } from './components/ScrollToTop';
import { useSearch } from './hooks/useSearch';
import { useUserData } from './hooks/useUserData';
import { useToast } from './hooks/useToast';
import { ToastContainer } from './components/Toast';

function App() {
  const { results, loading, error, hasSearched, search, reset } = useSearch();
  const userData = useUserData();
  const toast = useToast();
  const [preferences, setPreferences] = useState(null);
  const [activeTab, setActiveTab] = useState('search');
  const [showPersonalPrefs, setShowPersonalPrefs] = useState(false);
  const [showSetup, setShowSetup] = useState(false);

  const handleSetupComplete = (prefs) => {
    setPreferences(prefs);
  };

  const handleSearch = (query) => {
    const personalPreferences = getPersonalPreferences();
    search(query, personalPreferences);
  };

  const handlePickOneForMe = () => {
    const randomQueries = [
      "Epic fantasy journey with magic and ancient prophecies",
      "Heartwarming comedy about sports and leadership",
      "Dark comedy about class struggle and social inequality",
      "Post-apocalyptic survival story with infected creatures",
      "Mind-bending sci-fi thriller about reality and perception"
    ];
    const randomQuery = randomQueries[Math.floor(Math.random() * randomQueries.length)];
    handleSearch(randomQuery);
  };

  // Show setup flow if no preferences set
  if (!preferences) {
    return (
      <Layout showNav={false}>
        <SetupFlow onComplete={handleSetupComplete} />
      </Layout>
    );
  }

  const handleOpenPreferences = () => {
    setShowSetup(true);
  };

  if (showSetup) {
    return (
      <Layout showNav={false}>
        <SetupFlow 
          onComplete={(prefs) => {
            setPreferences(prefs);
            setShowSetup(false);
          }}
          showClose={true}
        />
      </Layout>
    );
  }

  const handleLogoClick = () => {
    setActiveTab('search');
    reset();
  };

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab}
      setShowPersonalPrefs={handleOpenPreferences}
      onLogoClick={handleLogoClick}
    >
      <div className="space-y-8">

        {/* Search Tab */}
        {activeTab === 'search' && (
          <div className="space-y-8 animate-fadeIn">
            {!hasSearched && !loading && <HeroSection />}
            
            <div className="space-y-6">
              {/* Search Bar */}
              <SearchBar onSearch={handleSearch} loading={loading} />
              
              {/* Streaming Services Display - Framed (hidden when searching/has results) */}
              {preferences.services.length > 0 && !hasSearched && !loading && (
                <div className="relative rounded-xl bg-white/[0.02] border border-white/[0.08] p-4 backdrop-blur-sm">
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-white/50 font-semibold text-sm">Active Filters:</span>
                      {preferences.services.map(service => (
                        <span key={service} className="px-3 py-1.5 bg-white/[0.08] rounded-lg text-white/70 font-medium border border-white/[0.12] text-xs hover:bg-white/[0.12] transition-all">
                          {service}
                        </span>
                      ))}
                      {(preferences.rentBuy.rent || preferences.rentBuy.buy) && (
                        <span className="px-3 py-1.5 bg-purple-500/[0.15] rounded-lg text-purple-300 font-medium border border-purple-500/30 text-xs">
                          {preferences.rentBuy.rent && 'Rent'}
                          {preferences.rentBuy.rent && preferences.rentBuy.buy && ' & '}
                          {preferences.rentBuy.buy && 'Buy'}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => setPreferences(null)}
                      className="px-4 py-1.5 text-sm text-white/60 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/20 rounded-lg transition-all font-medium"
                    >
                      Edit Filters
                    </button>
                  </div>
                </div>
              )}
            </div>

            <ResultsList
              results={results}
              loading={loading}
              error={error}
              hasSearched={hasSearched}
              userData={userData}
              toast={toast}
            />
          </div>
        )}

        {/* My List Tab */}
        {activeTab === 'mylist' && (
          <div className="animate-fadeIn">
            <MyListView userData={userData} toast={toast} />
          </div>
        )}

        {/* Trending Tab */}
        {activeTab === 'trending' && (
          <div className="animate-fadeIn">
            <TrendingSection userData={userData} toast={toast} />
          </div>
        )}

        {/* Deals Tab */}
        {activeTab === 'deals' && (
          <div className="animate-fadeIn">
            <StreamingDeals />
          </div>
        )}
      </div>
      
      <PersonalPreferences 
        isOpen={showPersonalPrefs} 
        onClose={() => setShowPersonalPrefs(false)} 
      />
      
      <ScrollToTop />
      
      {/* Pick For Me button - centered below search */}
      {activeTab === 'search' && !loading && results.length === 0 && !hasSearched && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
          <div className="relative group">
            {/* Animated purple glow */}
            <div className="absolute -inset-2 bg-gradient-to-r from-purple-600/15 via-purple-500/20 to-purple-600/15 rounded-full blur-xl animate-pulse"></div>
            
            <button
              onClick={handlePickOneForMe}
              className="relative flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600/90 to-purple-500/90 hover:from-purple-600 hover:to-purple-500 border border-purple-400/50 hover:border-purple-400 text-white rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105 shadow-xl shadow-purple-500/30 hover:shadow-purple-500/50 backdrop-blur-md"
            >
              <svg className="w-4 h-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 22.5l-.394-1.933a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
              </svg>
              <span className="relative">
                Pick For Me
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-white/70 group-hover:w-full transition-all duration-300"></span>
              </span>
            </button>
          </div>
        </div>
      )}
      
      {/* Toast notifications */}
      <ToastContainer toasts={toast.toasts} removeToast={toast.removeToast} />
    </Layout>
  );
}

export default App;
