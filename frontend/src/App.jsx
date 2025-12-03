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
  const { results, loading, error, hasSearched, search } = useSearch();
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

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab}
      setShowPersonalPrefs={handleOpenPreferences}
    >
      <div className="space-y-8">

        {/* Search Tab */}
        {activeTab === 'search' && (
          <div className="space-y-8 animate-fadeIn">
            {!hasSearched && !loading && <HeroSection />}
            
            <div className="space-y-6">
              {/* Search Bar */}
              <SearchBar onSearch={handleSearch} loading={loading} />
              
              {/* Streaming Services Display - Framed */}
              {preferences.services.length > 0 && (
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
      
      {/* Pick One for Me button - bottom left */}
      {activeTab === 'search' && !loading && results.length === 0 && (
        <div className="fixed bottom-8 left-8 z-50">
          <div className="relative">
            {/* Purple glow behind button */}
            <div className="absolute -inset-2 bg-purple-600/30 rounded-full blur-xl"></div>
            
            <button
              onClick={handlePickOneForMe}
              className="relative flex items-center gap-3 px-6 py-3 bg-white/[0.06] hover:bg-white/[0.10] border border-white/20 hover:border-white/30 text-white rounded-full text-base font-semibold transition-all duration-200 hover:scale-105 shadow-xl backdrop-blur-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5V19.5M12 4.5C7.58157 4.5 4.5 7.58157 4.5 12C4.5 16.4184 7.58157 19.5 12 19.5M12 4.5C16.4184 4.5 19.5 7.58157 19.5 12C19.5 16.4184 16.4184 19.5 12 19.5" />
              </svg>
              Pick For Me!
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
