/**
 * Oracle Score Algorithm
 * Combines multiple factors to create a personalized recommendation score
 */

export function calculateOracleScore(content, userData, searchQuery) {
  let score = 0;
  const weights = {
    searchMatch: 0.50,      // 50% - How well it matches the search (increased)
    preferences: 0.20,      // 20% - Personal preferences
    thumbs: 0.15,           // 15% - Thumbs up/down history
    myList: 0.10,           // 10% - Similar to items in My List
    watchHistory: 0.05      // 5% - Similar to watch history
  };

  // 1. SEARCH MATCH SCORE (from AI) - Boosted baseline
  const searchMatchScore = (content.matchScore || 0.7) + 0.1; // Add 10% baseline boost
  score += Math.min(searchMatchScore, 1) * weights.searchMatch;

  // 2. PERSONAL PREFERENCES SCORE
  const prefsScore = calculatePreferencesScore(content, userData);
  score += prefsScore * weights.preferences;

  // 3. THUMBS HISTORY SCORE
  const thumbsScore = calculateThumbsScore(content, userData);
  score += thumbsScore * weights.thumbs;

  // 4. MY LIST SIMILARITY SCORE
  const myListScore = calculateMyListScore(content, userData);
  score += myListScore * weights.myList;

  // 5. WATCH HISTORY SCORE
  const historyScore = calculateWatchHistoryScore(content, userData);
  score += historyScore * weights.watchHistory;

  return Math.min(Math.max(score, 0), 1); // Clamp between 0 and 1
}

function calculatePreferencesScore(content, userData) {
  const prefs = userData.getPersonalizedPreferences?.() || {};
  const savedPrefs = localStorage.getItem('oracle_personal_preferences');
  const personalPrefs = savedPrefs ? JSON.parse(savedPrefs) : {};
  
  let score = 0.7; // Base score (increased from 0.5)
  
  // Favorite genres boost
  if (personalPrefs.favoriteGenres?.length > 0 && content.genres) {
    const matchingGenres = content.genres.filter(g => 
      personalPrefs.favoriteGenres.includes(g)
    ).length;
    if (matchingGenres > 0) {
      score += (matchingGenres / personalPrefs.favoriteGenres.length) * 0.3;
    }
  }
  
  // Disliked genres penalty
  if (personalPrefs.dislikedGenres?.length > 0 && content.genres) {
    const dislikedMatches = content.genres.filter(g => 
      personalPrefs.dislikedGenres.includes(g)
    ).length;
    score -= dislikedMatches * 0.3;
  }
  
  // Favorite actors/directors
  if (personalPrefs.favoriteActors && (content.cast || content.director)) {
    const actors = personalPrefs.favoriteActors.toLowerCase().split(',').map(a => a.trim());
    const castList = (content.cast || []).map(c => c.toLowerCase());
    const director = (content.director || '').toLowerCase();
    
    actors.forEach(actor => {
      if (castList.some(c => c.includes(actor)) || director.includes(actor)) {
        score += 0.15;
      }
    });
  }
  
  // Length preference
  if (personalPrefs.preferredLength && personalPrefs.preferredLength !== 'any' && content.runtimeMinutes) {
    if (personalPrefs.preferredLength === 'short' && content.runtimeMinutes < 90) {
      score += 0.1;
    } else if (personalPrefs.preferredLength === 'medium' && content.runtimeMinutes >= 90 && content.runtimeMinutes <= 150) {
      score += 0.1;
    } else if (personalPrefs.preferredLength === 'long' && content.runtimeMinutes > 150) {
      score += 0.1;
    }
  }
  
  // Minimum rating filter
  if (personalPrefs.minRating && content.ratings?.imdbRating) {
    const rating = parseFloat(content.ratings.imdbRating);
    if (rating < personalPrefs.minRating) {
      score -= 0.3;
    } else if (rating >= personalPrefs.minRating + 1) {
      score += 0.1;
    }
  }
  
  return Math.min(Math.max(score, 0), 1);
}

function calculateThumbsScore(content, userData) {
  if (!userData.thumbs || Object.keys(userData.thumbs).length === 0) {
    return 0.7; // Higher neutral if no thumbs data
  }
  
  let score = 0.7;
  const thumbsList = Object.entries(userData.thumbs);
  
  // Find similar content based on genres
  const thumbsUpGenres = new Set();
  const thumbsDownGenres = new Set();
  
  thumbsList.forEach(([id, data]) => {
    const item = userData.watchHistory?.find(h => h.id === id);
    if (item?.genres) {
      if (data.type === 'up') {
        item.genres.forEach(g => thumbsUpGenres.add(g));
      } else {
        item.genres.forEach(g => thumbsDownGenres.add(g));
      }
    }
  });
  
  // Check current content genres
  if (content.genres) {
    content.genres.forEach(genre => {
      if (thumbsUpGenres.has(genre)) score += 0.15;
      if (thumbsDownGenres.has(genre)) score -= 0.15;
    });
  }
  
  return Math.min(Math.max(score, 0), 1);
}

function calculateMyListScore(content, userData) {
  if (!userData.myList || userData.myList.length === 0) {
    return 0.7; // Higher neutral if no list data
  }
  
  let score = 0.7;
  const myListGenres = new Set();
  
  // Extract genres from My List
  userData.myList.forEach(item => {
    item.genres?.forEach(g => myListGenres.add(g));
  });
  
  // Check overlap with current content
  if (content.genres) {
    const matchingGenres = content.genres.filter(g => myListGenres.has(g)).length;
    if (matchingGenres > 0) {
      score += matchingGenres * 0.1;
    }
  }
  
  return Math.min(Math.max(score, 0), 1);
}

function calculateWatchHistoryScore(content, userData) {
  if (!userData.watchHistory || userData.watchHistory.length === 0) {
    return 0.7; // Higher neutral if no history
  }
  
  let score = 0.7;
  const recentGenres = new Set();
  const recentHighRated = [];
  
  // Get recent 10 items
  userData.watchHistory.slice(0, 10).forEach(item => {
    item.genres?.forEach(g => recentGenres.add(g));
    const rating = userData.getRating?.(item.id);
    if (rating && rating >= 4) {
      recentHighRated.push(item);
    }
  });
  
  // Check genre overlap
  if (content.genres) {
    const matchingGenres = content.genres.filter(g => recentGenres.has(g)).length;
    if (matchingGenres > 0) {
      score += matchingGenres * 0.08;
    }
  }
  
  // Boost if similar to highly rated content
  if (recentHighRated.length > 0) {
    const highRatedGenres = new Set();
    recentHighRated.forEach(item => {
      item.genres?.forEach(g => highRatedGenres.add(g));
    });
    
    if (content.genres) {
      const matchingHighRated = content.genres.filter(g => highRatedGenres.has(g)).length;
      if (matchingHighRated > 0) {
        score += matchingHighRated * 0.15;
      }
    }
  }
  
  return Math.min(Math.max(score, 0), 1);
}

