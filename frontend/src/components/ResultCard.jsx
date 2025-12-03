import React, { useState } from 'react';
import { STREAMING_SERVICE_INFO } from '../data/streamingServices';

export function ResultCard({ content, userData, toast }) {
  const [showTrailer, setShowTrailer] = useState(false);
  const [dominantColor, setDominantColor] = useState(null);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const currentThumb = userData?.getThumb?.(content.id);
  
  const {
    title,
    year,
    type,
    overview,
    genres,
    posterUrl,
    omdbPosterUrl,
    matchScore,
    personalScore,
    runtimeMinutes,
    seasons,
    availability,
    trailerUrl,
    ratings = {}
  } = content;

  // Assign accent colors like Framer cards
  const accentColors = [
    { border: 'border-violet-500/30', bg: 'bg-violet-500/5', badge: 'from-violet-600 to-purple-600' },
    { border: 'border-cyan-500/30', bg: 'bg-cyan-500/5', badge: 'from-cyan-600 to-blue-600' },
    { border: 'border-pink-500/30', bg: 'bg-pink-500/5', badge: 'from-pink-600 to-rose-600' },
    { border: 'border-blue-500/30', bg: 'bg-blue-500/5', badge: 'from-blue-600 to-indigo-600' }
  ];
  const colorIndex = Math.abs(content.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % accentColors.length;
  const accentColor = accentColors[colorIndex];

  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\?]+)/)?.[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : null;
  };

  const handleServiceClick = (service, title) => {
    const serviceInfo = STREAMING_SERVICE_INFO[service];
    if (serviceInfo) {
      window.open(serviceInfo.url + encodeURIComponent(title), '_blank');
    }
  };

  const handleToggleMyList = () => {
    if (userData.isInMyList(content.id)) {
      userData.removeFromMyList(content.id);
      toast?.success('Removed from My List');
    } else {
      userData.addToMyList(content);
      toast?.success('Added to My List');
    }
  };

  const extractDominantColor = (imgElement) => {
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = imgElement.naturalWidth;
      canvas.height = imgElement.naturalHeight;
      ctx.drawImage(imgElement, 0, 0);
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      let r = 0, g = 0, b = 0;
      const sampleSize = 10; // Sample every 10th pixel for performance
      let count = 0;
      
      for (let i = 0; i < data.length; i += 4 * sampleSize) {
        // Skip very dark or very light pixels
        const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
        if (brightness > 30 && brightness < 225) {
          r += data[i];
          g += data[i + 1];
          b += data[i + 2];
          count++;
        }
      }
      
      r = Math.floor(r / count);
      g = Math.floor(g / count);
      b = Math.floor(b / count);
      
      // Enhance saturation for better visual effect
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const delta = max - min;
      
      if (delta > 0) {
        const saturationBoost = 1.3;
        if (r === max) r = Math.min(255, Math.floor(r + (r - g) * saturationBoost * 0.2));
        if (g === max) g = Math.min(255, Math.floor(g + (g - r) * saturationBoost * 0.2));
        if (b === max) b = Math.min(255, Math.floor(b + (b - r) * saturationBoost * 0.2));
      }
      
      setDominantColor(`rgb(${r}, ${g}, ${b})`);
    } catch (error) {
      console.error('Error extracting color:', error);
    }
  };

  const streamingAvailability = availability.filter(a => a.type === 'included');
  const rentOptions = availability.filter(a => a.type === 'rent');
  const buyOptions = availability.filter(a => a.type === 'buy');
  const isInList = userData.isInMyList(content.id);

  // Dynamic styles based on poster color
  const cardStyle = dominantColor ? {
    borderColor: dominantColor,
    borderWidth: '2px',
    boxShadow: `0 0 40px ${dominantColor}40, 0 0 80px ${dominantColor}20`
  } : {};

  return (
    <>
      {/* 
        🎯 CARD LAYOUT:
        - NO external margin (spacing controlled by grid gap)
        - Internal padding: 24px consistent
        - Display: flex for poster + text layout
        - Height stretches to match row
      */}
      <article 
        className="group relative bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-sm rounded-xl border transition-all duration-300 overflow-hidden hover:shadow-2xl hover:-translate-y-1 flex flex-col h-full"
        style={dominantColor ? cardStyle : { borderColor: '#ffffff33' }}
      >
        {/* Subtle accent glow */}
        <div 
          className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-2xl ${!dominantColor ? accentColor.bg : ''}`}
          style={dominantColor ? { backgroundColor: `${dominantColor}20` } : {}}
        ></div>
        
        {/* 🎯 CARD PADDING: 24px on all sides (consistent, easily adjustable with p-6) */}
        <div className="p-6 relative z-10 flex-1 flex flex-col">
          {/* 🎯 POSTER + TEXT GAP: 20px between poster and content (gap-5 = 20px) */}
          <div className="flex gap-5 flex-1">
            {/* 🎯 POSTER: Fixed width (112px) with flex-shrink-0 so it doesn't compress */}
            <div className="flex flex-col space-y-3" style={{ flexShrink: 0, width: '112px' }}>
              <div className="w-full h-40 md:h-48 rounded-lg overflow-hidden bg-gradient-to-br from-purple-900/10 to-black/20">
                {posterUrl || omdbPosterUrl ? (
                  <img
                    src={posterUrl || omdbPosterUrl}
                    alt={`${title} poster`}
                    crossOrigin="anonymous"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      console.error('🖼️ Poster failed to load:', posterUrl || omdbPosterUrl);
                      console.error('Title:', title);
                      e.target.onerror = null;
                      e.target.style.display = 'none';
                      const fallback = document.createElement('div');
                      fallback.className = 'w-full h-full flex flex-col items-center justify-center text-white/30 p-2 text-center';
                      fallback.innerHTML = `<div class="text-2xl mb-1">🎬</div><div class="text-[10px] font-semibold">${title.substring(0, 15)}</div>`;
                      e.target.parentElement.appendChild(fallback);
                    }}
                    onLoad={(e) => {
                      console.log('✅ Poster loaded:', title);
                      extractDominantColor(e.target);
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-white/30 p-2 text-center">
                    <div className="text-2xl mb-1">🎬</div>
                    <div className="text-[10px] font-semibold">{title.substring(0, 15)}{title.length > 15 ? '...' : ''}</div>
                  </div>
                )}
              </div>
              
              {/* Thumbs Up/Down - Below Poster */}
              <div className="flex items-center gap-1 justify-center">
                <button
                  onClick={() => {
                    const wasSelected = currentThumb === 'up';
                    userData.setThumbsUp(content.id);
                    toast?.success(wasSelected ? 'Removed like' : 'Liked! 👍');
                  }}
                  className={`px-2 py-1 rounded text-sm transition-all hover:scale-110 backdrop-blur-sm ${
                    currentThumb === 'up'
                      ? 'bg-green-600/30 border border-green-500/50 shadow-lg shadow-green-500/20'
                      : 'bg-white/[0.02] border border-white/[0.08] hover:bg-white/[0.06] hover:border-green-500/20'
                  }`}
                  title={currentThumb === 'up' ? 'Remove like' : 'Like this'}
                >
                  👍
                </button>
                <button
                  onClick={() => {
                    const wasSelected = currentThumb === 'down';
                    userData.setThumbsDown(content.id);
                    toast?.success(wasSelected ? 'Removed dislike' : 'Disliked 👎');
                  }}
                  className={`px-2 py-1 rounded text-sm transition-all hover:scale-110 backdrop-blur-sm ${
                    currentThumb === 'down'
                      ? 'bg-red-600/30 border border-red-500/50 shadow-lg shadow-red-500/20'
                      : 'bg-white/[0.02] border border-white/[0.08] hover:bg-white/[0.06] hover:border-red-500/20'
                  }`}
                  title={currentThumb === 'down' ? 'Remove dislike' : 'Dislike this'}
                >
                  👎
                </button>
              </div>
            </div>
            
            {/* 
              🎯 CONTENT SECTIONS - Uniform vertical spacing with space-y-3
              This ensures consistent gaps between: title → oracle score → meta → genres → description → ratings → streaming → buttons
            */}
            <div className="flex-1 flex flex-col min-w-0 space-y-3">
              {/* Title Section - Full Width */}
              <div>
                {/* 🎯 TITLE: 2-line clamp, full width for better readability */}
                <h3 
                  className="text-lg md:text-xl font-bold text-white group-hover:text-purple-200 transition-colors line-clamp-2"
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    whiteSpace: 'normal'
                  }}
                >
                  {title}
                </h3>
                
                {/* 🎯 ORACLE SCORE: Positioned under title with small gap (mt-1 = 4px) */}
                <div className="mt-1 relative inline-block group/score">
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r ${accentColor.badge} rounded-md text-white text-sm font-semibold shadow-md transition-all cursor-help`}>
                    <span className="text-[9px] uppercase tracking-wide opacity-80">Oracle Score:</span>
                    <span>{Math.round((content.oracleScore || matchScore) * 100)}%</span>
                    
                    {/* Hover indicator (info icon) */}
                    <svg className="w-3 h-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  
                  {/* Tooltip */}
                  <div className="absolute top-full left-0 mt-2 w-64 p-3 bg-black/95 border border-white/20 rounded-lg shadow-2xl opacity-0 invisible group-hover/score:opacity-100 group-hover/score:visible transition-all duration-200 z-50 backdrop-blur-xl">
                    <p className="text-xs text-white/90 leading-relaxed">
                      <span className="font-bold text-purple-400">Oracle Score</span> is your personalized match rating based on your search, preferences, watch history, and ratings.
                    </p>
                  </div>
                </div>
                
                {/* 🎯 METADATA ROW: Year, Type, Runtime (mt-2 = 8px gap from Oracle Score) */}
                <div className="flex items-center gap-2 text-xs md:text-sm text-white/60 font-medium mt-2">
                  <span>{year}</span>
                  <span className="text-white/30">•</span>
                  <span className="px-1.5 py-0.5 bg-white/[0.08] rounded text-[10px] font-semibold">{type === 'tv' ? 'TV' : 'Movie'}</span>
                  <span className="text-white/30">•</span>
                  <span className="text-[11px]">
                    {type === 'movie' 
                      ? formatRuntime(runtimeMinutes)
                      : `${seasons}S`
                    }
                  </span>
                </div>
              </div>
              
              {/* Genres */}
              <div className="flex flex-wrap gap-1.5">
                {genres.slice(0, 3).map(genre => (
                  <span
                    key={genre}
                    className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-white/60"
                  >
                    {genre}
                  </span>
                ))}
              </div>
              
              {/* Overview - Expandable Feature */}
              <div>
                <p 
                  className={`text-sm text-white/60 leading-relaxed cursor-pointer transition-colors hover:text-white/80 ${!isDescriptionExpanded ? 'line-clamp-2' : ''}`}
                  onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                  title={isDescriptionExpanded ? "Click to collapse" : "Click to expand"}
                >
                  {overview}
                </p>
                {overview && overview.length > 100 && (
                  <button
                    onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                    className="text-xs text-purple-400 hover:text-purple-300 mt-1 transition-colors"
                  >
                    {isDescriptionExpanded ? '▲ Show less' : '▼ Show more'}
                  </button>
                )}
              </div>
              
              {/* Ratings Row */}
              {(ratings.rottenTomatoes || ratings.imdbRating) && (
                <div className="flex items-center gap-2.5 flex-wrap">
                  {ratings.rottenTomatoes && (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 rounded-lg border border-white/10">
                      <span className="text-red-500 text-sm">🍅</span>
                      <span className="text-sm font-semibold text-white">{ratings.rottenTomatoes}</span>
                    </div>
                  )}
                  {ratings.imdbRating && (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 rounded-lg border border-white/10">
                      <span className="text-yellow-500 text-sm">⭐</span>
                      <span className="text-sm font-semibold text-white">{ratings.imdbRating}</span>
                    </div>
                  )}
                </div>
              )}
              
              {/* Streaming Services */}
              {streamingAvailability.length > 0 && (
                <div>
                  <p className="text-xs text-white/30 mb-2 uppercase tracking-wider font-semibold">Available on</p>
                  <div className="flex flex-wrap gap-2">
                    {streamingAvailability.slice(0, 3).map((avail, idx) => {
                      const serviceInfo = STREAMING_SERVICE_INFO[avail.service] || {};
                      return (
                        <button
                          key={idx}
                          onClick={() => handleServiceClick(avail.service, title)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${serviceInfo.color} ${serviceInfo.textColor} hover:scale-105`}
                        >
                          {avail.service}
                        </button>
                      );
                    })}
                    {streamingAvailability.length > 3 && (
                      <span className="px-3 py-1.5 text-xs text-white/40">
                        +{streamingAvailability.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              )}
              
              {/* Action Buttons Row - Improved Spacing */}
              <div className="flex items-center gap-2.5 flex-wrap mt-auto pt-2">
                {/* Add to List */}
                <button
                  onClick={handleToggleMyList}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    isInList 
                      ? 'bg-green-600 hover:bg-green-700 text-white' 
                      : 'bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white'
                  } hover:scale-105`}
                >
                  {isInList ? '✓ My List' : '+ Add'}
                </button>
                
                {/* Watch Trailer */}
                {trailerUrl && (
                  <button
                    onClick={() => setShowTrailer(true)}
                    className="px-4 py-2 bg-white/[0.08] hover:bg-white/[0.12] border border-white/20 hover:border-white/30 rounded-lg text-sm font-semibold text-white transition-all hover:scale-105"
                  >
                    🎬 Trailer
                  </button>
                )}
                
                {/* Rent/Buy */}
                {(rentOptions.length > 0 || buyOptions.length > 0) && (
                  <>
                    {rentOptions.slice(0, 1).map((avail, idx) => (
                      <button
                        key={`rent-${idx}`}
                        onClick={() => handleServiceClick(avail.service, title)}
                        className="px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-lg text-sm font-semibold text-white transition-all hover:scale-105"
                      >
                        Rent ${avail.price}
                      </button>
                    ))}
                    {buyOptions.slice(0, 1).map((avail, idx) => (
                      <button
                        key={`buy-${idx}`}
                        onClick={() => handleServiceClick(avail.service, title)}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-semibold text-white transition-all hover:scale-105"
                      >
                        Buy ${avail.price}
                      </button>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Trailer Modal */}
      {showTrailer && trailerUrl && (
        <div 
          className="fixed inset-0 bg-black/95 flex items-center justify-center z-[9999] p-6"
          onClick={() => setShowTrailer(false)}
        >
          <div 
            className="relative w-full max-w-6xl bg-black rounded-2xl overflow-hidden border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white text-black hover:bg-white/90 rounded-full font-bold flex items-center justify-center transition-all"
            >
              ✕
            </button>
            
            <div className="relative pt-[56.25%]">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={getYouTubeEmbedUrl(trailerUrl)}
                title={`${title} Trailer`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
