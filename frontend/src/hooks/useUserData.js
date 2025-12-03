import { useState, useEffect } from 'react';

const STORAGE_KEYS = {
  MY_LIST: 'oracle_my_list',
  WATCH_HISTORY: 'oracle_watch_history',
  RATINGS: 'oracle_ratings'
};

/**
 * Custom hook to manage user data (My List, Watch History, Ratings)
 */
export function useUserData() {
  const [myList, setMyList] = useState([]);
  const [watchHistory, setWatchHistory] = useState([]);
  const [ratings, setRatings] = useState({});
  const [thumbs, setThumbs] = useState({}); // thumbsUp or thumbsDown

  // Load data from localStorage on mount
  useEffect(() => {
    const savedList = localStorage.getItem(STORAGE_KEYS.MY_LIST);
    const savedHistory = localStorage.getItem(STORAGE_KEYS.WATCH_HISTORY);
    const savedRatings = localStorage.getItem(STORAGE_KEYS.RATINGS);
    const savedThumbs = localStorage.getItem('oracle_thumbs');

    if (savedList) setMyList(JSON.parse(savedList));
    if (savedHistory) setWatchHistory(JSON.parse(savedHistory));
    if (savedRatings) setRatings(JSON.parse(savedRatings));
    if (savedThumbs) setThumbs(JSON.parse(savedThumbs));
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MY_LIST, JSON.stringify(myList));
  }, [myList]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.WATCH_HISTORY, JSON.stringify(watchHistory));
  }, [watchHistory]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.RATINGS, JSON.stringify(ratings));
  }, [ratings]);

  useEffect(() => {
    localStorage.setItem('oracle_thumbs', JSON.stringify(thumbs));
  }, [thumbs]);

  // My List functions
  const addToMyList = (content) => {
    if (!isInMyList(content.id)) {
      setMyList(prev => [...prev, { ...content, addedAt: Date.now() }]);
    }
  };

  const removeFromMyList = (contentId) => {
    setMyList(prev => prev.filter(item => item.id !== contentId));
  };

  const isInMyList = (contentId) => {
    return myList.some(item => item.id === contentId);
  };

  // Watch History functions
  const markAsWatched = (content) => {
    const existing = watchHistory.find(item => item.id === content.id);
    if (!existing) {
      setWatchHistory(prev => [
        { ...content, watchedAt: Date.now() },
        ...prev
      ].slice(0, 100)); // Keep last 100
    }
  };

  const isWatched = (contentId) => {
    return watchHistory.some(item => item.id === contentId);
  };

  // Rating functions
  const rateContent = (contentId, rating) => {
    setRatings(prev => ({
      ...prev,
      [contentId]: { rating, ratedAt: Date.now() }
    }));
  };

  const getRating = (contentId) => {
    return ratings[contentId]?.rating || null;
  };

  // Get personalized recommendations based on watch history and ratings
  const getPersonalizedPreferences = () => {
    const watchedContent = [...watchHistory];
    const ratedContent = Object.entries(ratings)
      .filter(([_, data]) => data.rating >= 4)
      .map(([id, _]) => watchHistory.find(item => item.id === id))
      .filter(Boolean);

    const allContent = [...ratedContent, ...watchedContent.slice(0, 10)];

    // Extract genres from watched/rated content
    const genreCounts = {};
    allContent.forEach(content => {
      content.genres?.forEach(genre => {
        genreCounts[genre] = (genreCounts[genre] || 0) + 1;
      });
    });

    const topGenres = Object.entries(genreCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([genre]) => genre);

    return {
      favoriteGenres: topGenres,
      watchedTitles: allContent.map(c => c.title).join(', ')
    };
  };

  const setThumbsUp = (contentId) => {
    setThumbs(prev => ({
      ...prev,
      [contentId]: { type: 'up', timestamp: Date.now() }
    }));
  };

  const setThumbsDown = (contentId) => {
    setThumbs(prev => ({
      ...prev,
      [contentId]: { type: 'down', timestamp: Date.now() }
    }));
  };

  const getThumb = (contentId) => {
    return thumbs[contentId]?.type || null;
  };

  const getAllThumbs = () => {
    return Object.entries(thumbs).map(([id, data]) => ({
      id,
      ...data
    }));
  };

  return {
    myList,
    watchHistory,
    ratings,
    thumbs,
    addToMyList,
    removeFromMyList,
    isInMyList,
    markAsWatched,
    isWatched,
    rateContent,
    getRating,
    setThumbsUp,
    setThumbsDown,
    getThumb,
    getAllThumbs,
    getPersonalizedPreferences
  };
}

