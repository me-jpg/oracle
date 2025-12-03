import dotenv from 'dotenv';

dotenv.config();

const OMDB_API_KEY = process.env.OMDB_API_KEY;
const OMDB_BASE_URL = 'http://www.omdbapi.com/';

/**
 * OMDb API Integration
 * Fetches movie ratings including Rotten Tomatoes scores
 */

/**
 * Get ratings for a movie/show from OMDb
 * @param {string} title - Movie or TV show title
 * @param {number} year - Release year
 * @returns {object|null} Ratings data including RT score
 */
export async function getOMDbRatings(title, year) {
  if (!OMDB_API_KEY) {
    return null;
  }

  try {
    const url = `${OMDB_BASE_URL}?apikey=${OMDB_API_KEY}&t=${encodeURIComponent(title)}&y=${year}`;
    
    const response = await fetch(url);
    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    
    if (data.Response === 'False') {
      return null;
    }

    // Extract Rotten Tomatoes score
    const rtRating = data.Ratings?.find(r => r.Source === 'Rotten Tomatoes');
    
    return {
      imdbRating: data.imdbRating !== 'N/A' ? data.imdbRating : null,
      rottenTomatoes: rtRating ? rtRating.Value : null,
      metascore: data.Metascore !== 'N/A' ? data.Metascore : null
    };
  } catch (error) {
    console.error('OMDb fetch error:', error.message);
    return null;
  }
}

/**
 * Enrich recommendations with OMDb ratings
 * @param {array} recommendations - AI-generated recommendations
 * @returns {array} Enriched recommendations with ratings
 */
export async function enrichWithOMDb(recommendations) {
  if (!OMDB_API_KEY) {
    console.warn('⚠️  OMDb API key not set. Ratings will not be available.');
    return recommendations;
  }

  console.log(`🍅 Fetching ratings for ${recommendations.length} titles...`);

  const enriched = await Promise.all(
    recommendations.map(async (rec) => {
      try {
        const ratings = await getOMDbRatings(rec.title, rec.year);
        
        if (ratings?.rottenTomatoes) {
          console.log(`✅ Found RT score for ${rec.title}: ${ratings.rottenTomatoes}`);
        }
        
        return {
          ...rec,
          ratings: ratings || {}
        };
      } catch (error) {
        console.error(`Error fetching OMDb data for ${rec.title}:`, error.message);
        return {
          ...rec,
          ratings: {}
        };
      }
    })
  );

  const ratingsFound = enriched.filter(e => e.ratings?.rottenTomatoes).length;
  console.log(`🍅 Found ${ratingsFound}/${recommendations.length} RT scores`);

  return enriched;
}

