import dotenv from 'dotenv';

dotenv.config();

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

/**
 * TMDb API Integration
 * Fetches real movie/TV show data including posters
 */

/**
 * Search for a movie or TV show on TMDb and get its details
 * @param {string} title - Movie or TV show title
 * @param {number} year - Release year (optional)
 * @param {string} type - 'movie' or 'tv'
 * @returns {object|null} TMDb data with poster URL
 */
export async function getTMDbData(title, year, type = 'movie') {
  if (!TMDB_API_KEY) {
    console.warn('TMDb API key not configured');
    return null;
  }

  try {
    const searchType = type === 'tv' ? 'tv' : 'movie';
    const searchUrl = `${TMDB_BASE_URL}/search/${searchType}?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(title)}${year ? `&year=${year}` : ''}`;
    
    const response = await fetch(searchUrl);
    if (!response.ok) {
      console.error(`TMDb API error: ${response.status}`);
      return null;
    }

    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      const result = data.results[0];
      return {
        posterUrl: result.poster_path ? `${TMDB_IMAGE_BASE}${result.poster_path}` : null,
        backdropUrl: result.backdrop_path ? `${TMDB_IMAGE_BASE}${result.backdrop_path}` : null,
        tmdbId: result.id,
        overview: result.overview || null,
        voteAverage: result.vote_average || null
      };
    }
    
    return null;
  } catch (error) {
    console.error('TMDb fetch error:', error.message);
    return null;
  }
}

/**
 * Get cast and crew information for a movie/TV show
 * @param {number} tmdbId - TMDb ID
 * @param {string} type - 'movie' or 'tv'
 * @returns {object|null} Cast and crew data
 */
export async function getCastAndCrew(tmdbId, type = 'movie') {
  if (!TMDB_API_KEY || !tmdbId) return null;

  try {
    const creditsUrl = `${TMDB_BASE_URL}/${type}/${tmdbId}/credits?api_key=${TMDB_API_KEY}`;
    const response = await fetch(creditsUrl);
    
    if (!response.ok) return null;

    const data = await response.json();
    
    // Get top 3 cast members
    const cast = data.cast?.slice(0, 3).map(actor => actor.name) || [];
    
    // Get director (for movies) or creator (for TV)
    let director = null;
    if (type === 'movie') {
      const directorObj = data.crew?.find(person => person.job === 'Director');
      director = directorObj?.name || null;
    }
    
    return { cast, director };
  } catch (error) {
    console.error('Error fetching cast/crew:', error.message);
    return null;
  }
}

/**
 * Enrich AI-generated recommendations with TMDb data
 * @param {array} recommendations - AI-generated recommendations
 * @returns {array} Enriched recommendations with poster URLs
 */
export async function enrichWithTMDb(recommendations) {
  if (!TMDB_API_KEY) {
    console.warn('⚠️  TMDb API key not set. Posters will not be available.');
    return recommendations;
  }

  console.log(`📸 Fetching posters for ${recommendations.length} movies/shows...`);

  const enriched = await Promise.all(
    recommendations.map(async (rec, index) => {
      try {
        const tmdbData = await getTMDbData(rec.title, rec.year, rec.type);
        
        // Fetch cast and crew if we have a TMDb ID
        let castAndCrew = null;
        if (tmdbData?.tmdbId) {
          castAndCrew = await getCastAndCrew(tmdbData.tmdbId, rec.type);
        }
        
        if (tmdbData?.posterUrl) {
          console.log(`✅ Found poster for: ${rec.title}`);
        } else {
          console.log(`❌ No poster found for: ${rec.title}`);
        }
        
        return {
          ...rec,
          posterUrl: tmdbData?.posterUrl || null,
          backdropUrl: tmdbData?.backdropUrl || null,
          tmdbId: tmdbData?.tmdbId || null,
          cast: castAndCrew?.cast || [],
          director: castAndCrew?.director || null
        };
      } catch (error) {
        console.error(`Error fetching TMDb data for ${rec.title}:`, error.message);
        return {
          ...rec,
          posterUrl: null,
          backdropUrl: null,
          tmdbId: null,
          cast: [],
          director: null
        };
      }
    })
  );

  const postersFound = enriched.filter(e => e.posterUrl).length;
  console.log(`📸 Found ${postersFound}/${recommendations.length} posters`);

  return enriched;
}

