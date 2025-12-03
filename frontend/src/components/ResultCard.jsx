import React, { useState } from 'react';
import { STREAMING_SERVICE_INFO } from '../data/streamingServices';

export function ResultCard({ content, userData, toast }) {
  const [showTrailer, setShowTrailer] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const currentThumb = userData?.getThumb?.(content.id);
  const progress = userData?.getShowProgress?.(content.id);
  
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

  const handleRate = (rating) => {
    userData.rateContent(content.id, rating);
    userData.markAsWatched(content);
    setShowRating(false);
    toast?.success(`Rated ${rating}⭐`);
  };

  const streamingAvailability = availability.filter(a => a.type === 'included');
  const rentOptions = availability.filter(a => a.type === 'rent');
  const buyOptions = availability.filter(a => a.type === 'buy');
  const userRating = userData.getRating(content.id);
  const isInList = userData.isInMyList(content.id);
  const isWatched = userData.isWatched(content.id);

  return (
    <>
      {/* Framer-style Card */}
      <article className={`group relative bg-white/[0.02] backdrop-blur-sm rounded-2xl border ${accentColor.border} hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300 overflow-hidden hover:shadow-2xl hover:shadow-purple-500/10`}>
        <div className="p-8">
          {/* Poster Section - Framer mockup style */}
          <div className={`mb-6 relative rounded-xl overflow-hidden ${accentColor.bg} border ${accentColor.border} p-6`}>
            <div className="flex gap-6">
              <div className="w-32 h-48 flex-shrink-0 rounded-lg overflow-hidden bg-gradient-to-br from-purple-900/20 to-black/40 border border-white/5">
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
                      fallback.className = 'w-full h-full flex flex-col items-center justify-center text-white/30 p-4 text-center';
                      fallback.innerHTML = `<div class="text-4xl mb-2">🎬</div><div class="text-xs font-semibold">${title.substring(0, 20)}</div>`;
                      e.target.parentElement.appendChild(fallback);
                    }}
                    onLoad={() => console.log('✅ Poster loaded:', title)}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-white/30 p-4 text-center">
                    <div className="text-4xl mb-2">🎬</div>
                    <div className="text-xs font-semibold">{title.substring(0, 20)}{title.length > 20 ? '...' : ''}</div>
                  </div>
                )}
              </div>
              
              {/* Content preview */}
              <div className="flex-1 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
                    <div className="flex items-center gap-2 text-sm text-white/50">
                      <span>{year}</span>
                      <span>•</span>
                      <span>{type === 'tv' ? 'TV' : 'Movie'}</span>
                      <span>•</span>
                      <span>
                        {type === 'movie' 
                          ? formatRuntime(runtimeMinutes)
                          : `${seasons} Season${seasons > 1 ? 's' : ''}`
                        }
                      </span>
                    </div>
                  </div>
                  
                  {/* Oracle Score */}
                  <div className="flex gap-2">
                    <div className={`px-3 py-1 bg-gradient-to-r ${accentColor.badge} rounded-lg text-white text-xs font-bold flex items-center gap-1`}>
                      <span className="text-[10px]">🔮</span>
                      <span>{Math.round((content.oracleScore || matchScore) * 100)}%</span>
                    </div>
                  </div>
                </div>
                
                {/* Genres */}
                <div className="flex flex-wrap gap-2">
                  {genres.map(genre => (
                    <span
                      key={genre}
                      className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-white/60"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
                
                {/* Cast and Director */}
                {content.cast?.length > 0 || content.director ? (
                  <div className="text-sm space-y-1">
                    {content.director && (
                      <div className="text-white/50">
                        <span className="text-white/30">Director: </span>
                        <span className="text-white/70">{content.director}</span>
                      </div>
                    )}
                    {content.cast?.length > 0 && (
                      <div className="text-white/50">
                        <span className="text-white/30">Cast: </span>
                        <span className="text-white/70">{content.cast.join(', ')}</span>
                      </div>
                    )}
                  </div>
                ) : null}
                
                {/* Overview */}
                <p className="text-sm text-white/50 line-clamp-2">{overview}</p>
                
                {/* Streaming services - Moved inside */}
                {streamingAvailability.length > 0 && (
                  <div className="pt-3">
                    <p className="text-xs text-white/30 mb-2 uppercase tracking-wider font-semibold">Available on</p>
                    <div className="flex flex-wrap gap-2">
                      {streamingAvailability.slice(0, 4).map((avail, idx) => {
                        const serviceInfo = STREAMING_SERVICE_INFO[avail.service] || {};
                        return (
                          <button
                            key={idx}
                            onClick={() => handleServiceClick(avail.service, title)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${serviceInfo.color} ${serviceInfo.textColor} hover:scale-105 hover:shadow-lg`}
                          >
                            {avail.service}
                          </button>
                        );
                      })}
                      {streamingAvailability.length > 4 && (
                        <span className="px-3 py-1.5 text-xs text-white/40">
                          +{streamingAvailability.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Add to List button - Moved inside */}
                <div className="flex items-center gap-2 pt-3">
                  <button
                    onClick={handleToggleMyList}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-lg ${
                      isInList 
                        ? 'bg-green-600 hover:bg-green-700 text-white shadow-green-500/30' 
                        : 'bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white shadow-purple-500/40'
                    } hover:scale-105`}
                  >
                    {isInList ? '✓ In My List' : '+ Add to List'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Actions Section */}
          <div className="space-y-4">
            {/* Ratings */}
            {(ratings.rottenTomatoes || ratings.imdbRating || userRating) && (
              <div className="flex items-center gap-3">
                {ratings.rottenTomatoes && (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 rounded-lg border border-white/10">
                    <span className="text-red-500">🍅</span>
                    <span className="text-sm font-semibold text-white">{ratings.rottenTomatoes}</span>
                  </div>
                )}
                {ratings.imdbRating && (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 rounded-lg border border-white/10">
                    <span className="text-yellow-500">⭐</span>
                    <span className="text-sm font-semibold text-white">{ratings.imdbRating}</span>
                  </div>
                )}
                {userRating && (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 rounded-lg border border-white/10">
                    <span className="text-xs text-white/50">Your rating:</span>
                    <span className="text-yellow-400">{'⭐'.repeat(userRating)}</span>
                  </div>
                )}
                {!userRating && (
                  <button
                    onClick={() => setShowRating(true)}
                    className="px-3 py-1.5 bg-yellow-600/20 hover:bg-yellow-600/30 border border-yellow-500/30 hover:border-yellow-500/50 rounded-lg text-sm text-yellow-200 hover:text-yellow-100 transition-all hover:scale-105 font-semibold"
                  >
                    ⭐ Rate this
                  </button>
                )}
                
                {/* Thumbs Up/Down */}
                <div className="flex items-center gap-2 ml-auto">
                  <button
                    onClick={() => {
                      userData.setThumbsUp(content.id);
                      toast?.success('Liked!');
                    }}
                    className={`px-3 py-1.5 rounded-lg text-lg transition-all hover:scale-110 ${
                      currentThumb === 'up'
                        ? 'bg-green-600/30 border-2 border-green-500/50'
                        : 'bg-white/5 border border-white/10 hover:bg-white/10'
                    }`}
                  >
                    👍
                  </button>
                  <button
                    onClick={() => {
                      userData.setThumbsDown(content.id);
                      toast?.success('Disliked');
                    }}
                    className={`px-3 py-1.5 rounded-lg text-lg transition-all hover:scale-110 ${
                      currentThumb === 'down'
                        ? 'bg-red-600/30 border-2 border-red-500/50'
                        : 'bg-white/5 border border-white/10 hover:bg-white/10'
                    }`}
                  >
                    👎
                  </button>
                </div>
              </div>
            )}

            {/* Rating dropdown */}
            {showRating && (
              <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                <p className="text-sm text-white/70 mb-3">Rate this {type === 'tv' ? 'TV Show' : 'Movie'}:</p>
                <div className="flex gap-2 mb-3">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      onClick={() => handleRate(star)}
                      className="text-2xl hover:scale-110 transition-transform"
                    >
                      ⭐
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setShowRating(false)}
                  className="text-xs text-white/40 hover:text-white"
                >
                  Cancel
                </button>
              </div>
            )}

            {/* TV Show Progress */}
            {type === 'tv' && progress && (
              <div className="flex items-center gap-2 text-sm text-white/60 pb-2">
                <span className="text-purple-400">📺</span>
                <span>Season {progress.season}, Episode {progress.episode}</span>
              </div>
            )}

            {/* Buttons row */}
            <div className="flex items-center gap-3 pt-2 flex-wrap">
              {type === 'tv' && (
                <button
                  onClick={() => setShowProgressModal(true)}
                  className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-semibold text-white transition-all"
                >
                  {progress ? '📺 Update Progress' : '📺 Track Progress'}
                </button>
              )}
              
              {trailerUrl && (
                <button
                  onClick={() => setShowTrailer(true)}
                  className="px-5 py-2.5 bg-white/[0.08] hover:bg-white/[0.12] border border-white/20 hover:border-white/30 rounded-lg text-sm font-semibold text-white transition-all hover:scale-105 shadow-lg"
                >
                  🎬 Watch Trailer
                </button>
              )}
              
              {(rentOptions.length > 0 || buyOptions.length > 0) && (
                <div className="flex gap-2">
                  {rentOptions.slice(0, 1).map((avail, idx) => (
                    <button
                      key={`rent-${idx}`}
                      onClick={() => handleServiceClick(avail.service, title)}
                      className="px-4 py-2.5 bg-orange-600 hover:bg-orange-700 rounded-lg text-sm font-semibold text-white transition-all"
                    >
                      Rent ${avail.price}
                    </button>
                  ))}
                  {buyOptions.slice(0, 1).map((avail, idx) => (
                    <button
                      key={`buy-${idx}`}
                      onClick={() => handleServiceClick(avail.service, title)}
                      className="px-4 py-2.5 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-semibold text-white transition-all"
                    >
                      Buy ${avail.price}
                    </button>
                  ))}
                </div>
              )}
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
