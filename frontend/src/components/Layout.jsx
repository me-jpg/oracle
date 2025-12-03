import React from 'react';

export function Layout({ children, activeTab, setActiveTab, setShowPersonalPrefs, showNav = true }) {
  return (
    <div className="min-h-screen bg-black">
      {/* Clean Professional Header */}
      <header className="sticky top-0 z-40 bg-black/95 backdrop-blur-xl border-b border-white/[0.06] relative overflow-hidden">
        {/* Purple glow effects */}
        <div className="absolute top-0 left-[10%] w-64 h-32 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-[10%] w-64 h-32 bg-purple-500/8 rounded-full blur-3xl"></div>
        
        <div className="max-w-[1600px] mx-auto px-12 py-4 relative z-10">
          <div className="grid grid-cols-3 items-center">
            {/* Left side: Logo + AI badge */}
            <div className="flex items-center gap-6">
              {/* Oracle Logo - clickable */}
              <button
                onClick={() => setActiveTab('search')}
                className="flex items-center hover:opacity-70 transition-all duration-200 relative group"
              >
                {/* Purple glow behind Oracle */}
                <div className="absolute -inset-6 bg-purple-600/10 rounded-full blur-2xl -z-10 animate-pulse"></div>
                
                <span className="text-2xl font-black text-white tracking-tight flex items-center">
                  {/* Eye logo replacing the O */}
                  <span className="inline-flex items-center justify-center w-5 h-5 relative" style={{ marginRight: '2px' }}>
                    <svg width="20" height="20" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="20" cy="20" r="18" fill="white" stroke="white" strokeWidth="2"/>
                      <circle cx="20" cy="14" r="5" fill="black"/>
                    </svg>
                  </span>
                  <span>racle</span>
                </span>
              </button>
            </div>
            
            {/* Center: Navigation tabs */}
            {showNav && (
            <div className="relative flex items-center justify-center gap-0 bg-white/[0.02] rounded-lg px-1 py-1 border border-white/[0.04] overflow-hidden backdrop-blur-sm w-fit mx-auto">
              {/* Purple flare within the box */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/15 via-purple-500/20 to-purple-600/15 blur-2xl"></div>
              <button
                onClick={() => setActiveTab('search')}
                className={`relative z-10 px-4 py-2 rounded-md font-semibold text-sm transition-all duration-200 text-white whitespace-nowrap ${
                  activeTab === 'search'
                    ? 'bg-white/[0.08]'
                    : 'hover:bg-white/[0.04]'
                }`}
              >
                Search
              </button>
              <button
                onClick={() => setActiveTab('mylist')}
                className={`relative z-10 px-4 py-2 rounded-md font-semibold text-sm transition-all duration-200 text-white whitespace-nowrap ${
                  activeTab === 'mylist'
                    ? 'bg-white/[0.08]'
                    : 'hover:bg-white/[0.04]'
                }`}
              >
                My List
              </button>
              <button
                onClick={() => setActiveTab('trending')}
                className={`relative z-10 px-4 py-2 rounded-md font-semibold text-sm transition-all duration-200 text-white whitespace-nowrap ${
                  activeTab === 'trending'
                    ? 'bg-white/[0.08]'
                    : 'hover:bg-white/[0.04]'
                }`}
              >
                Trending
              </button>
              <button
                onClick={() => setActiveTab('deals')}
                className={`relative z-10 px-4 py-2 rounded-md font-semibold text-sm transition-all duration-200 text-white whitespace-nowrap ${
                  activeTab === 'deals'
                    ? 'bg-white/[0.08]'
                    : 'hover:bg-white/[0.04]'
                }`}
              >
                Deals
              </button>
            </div>
            )}
            
            {/* Right: Preferences */}
            <div className="flex items-center justify-end">
              {/* Preferences */}
              {showNav && (
              <button
                onClick={() => setShowPersonalPrefs(true)}
                className="text-white hover:opacity-70 transition-all duration-200 hover:scale-110"
                aria-label="Preferences"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - More spacious */}
      <main className="max-w-[1600px] mx-auto px-12 py-16">
        {children}
      </main>
      
    </div>
  );
}
