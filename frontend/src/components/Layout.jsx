import React from 'react';

export function Layout({ children, activeTab, setActiveTab, setShowPersonalPrefs, onLogoClick, showNav = true }) {
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
                onClick={onLogoClick || (() => setActiveTab('search'))}
                className="flex items-center hover:opacity-80 transition-all duration-300 relative group"
              >
                {/* Purple glow behind Oracle */}
                <div className="absolute -inset-6 bg-purple-600/10 rounded-full blur-2xl -z-10 animate-pulse"></div>
                
                <span className="text-2xl font-bold text-white tracking-tight flex items-center">
                  {/* Refined Eye logo replacing the O - spacing matches letter-spacing in "racle" */}
                  <span className="inline-flex items-center justify-center w-6 h-6 relative" style={{ marginRight: '0.01em' }}>
                    <svg width="24" height="24" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        {/* Gradient for outer ring */}
                        <linearGradient id="outerRing" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 1 }} />
                          <stop offset="100%" style={{ stopColor: '#e0e0e0', stopOpacity: 1 }} />
                        </linearGradient>
                        {/* Gradient for inner pupil */}
                        <radialGradient id="pupilGrad" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" style={{ stopColor: '#1a1a1a', stopOpacity: 1 }} />
                          <stop offset="100%" style={{ stopColor: '#000000', stopOpacity: 1 }} />
                        </radialGradient>
                        {/* Shadow */}
                        <filter id="shadow">
                          <feDropShadow dx="0" dy="1" stdDeviation="1" floodOpacity="0.3"/>
                        </filter>
                      </defs>
                      
                      {/* Outer circle (white ring) */}
                      <circle 
                        cx="24" 
                        cy="24" 
                        r="19" 
                        fill="url(#outerRing)" 
                        stroke="#f0f0f0" 
                        strokeWidth="1.5"
                        filter="url(#shadow)"
                      />
                      
                      {/* Inner circle (background) */}
                      <circle 
                        cx="24" 
                        cy="24" 
                        r="16" 
                        fill="#fafafa"
                      />
                      
                      {/* Pupil (black dot) - positioned higher */}
                      <ellipse 
                        cx="24" 
                        cy="18" 
                        rx="7" 
                        ry="8" 
                        fill="url(#pupilGrad)"
                      />
                      
                      {/* Subtle highlight on pupil */}
                      <ellipse 
                        cx="26" 
                        cy="16" 
                        rx="2" 
                        ry="2.5" 
                        fill="white" 
                        opacity="0.25"
                      />
                    </svg>
                  </span>
                  <span className="font-extrabold">racle</span>
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
                className="relative text-white/70 hover:text-white/90 transition-all duration-300 hover:scale-110 group"
                aria-label="Preferences"
              >
                {/* Purple glow behind icon */}
                <div className="absolute -inset-2 bg-purple-600/15 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <svg className="w-4 h-4 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
