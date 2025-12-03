import express from 'express';
import { findContent } from '../services/matcher.js';

const router = express.Router();

/**
 * POST /api/search
 * Main search endpoint that uses AI to dynamically find matching content
 */
router.post('/search', async (req, res) => {
  try {
    const {
      query,
      contentType = 'any',
      genres = [],
      services = [],
      lengthPreference = 'any',
      pricePreference = {
        included: true,
        rent: true,
        buy: false,
        maxRentPrice: 10.0
      },
      personalPreferences = null
    } = req.body;

    // Validate required query
    if (!query || query.trim().length === 0) {
      return res.status(400).json({ error: 'Query is required' });
    }

    console.log(`🔍 Searching for: "${query}"`);

    // Use AI to find and recommend content dynamically
    const results = await findContent(query, {
      contentType,
      genres,
      services,
      lengthPreference,
      pricePreference
    });

    // Calculate personal match scores if preferences provided
    if (personalPreferences) {
      results.forEach(result => {
        result.personalScore = calculatePersonalScore(result, personalPreferences);
      });
      console.log(`✅ Found ${results.length} recommendations with personal scores`);
    } else {
      console.log(`✅ Found ${results.length} recommendations`);
    }

    res.json({
      results: results,
      totalCandidates: results.length,
      query: query
    });

  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ 
      error: error.message || 'Internal server error' 
    });
  }
});

/**
 * Calculate personal match score based on user preferences
 */
function calculatePersonalScore(content, preferences) {
  let score = 0.5; // Base score
  
  // Favorite genres boost
  if (preferences.favoriteGenres && preferences.favoriteGenres.length > 0) {
    const matchingGenres = content.genres.filter(g => 
      preferences.favoriteGenres.includes(g)
    ).length;
    score += (matchingGenres / preferences.favoriteGenres.length) * 0.3;
  }
  
  // Disliked genres penalty
  if (preferences.dislikedGenres && preferences.dislikedGenres.length > 0) {
    const dislikedMatches = content.genres.filter(g => 
      preferences.dislikedGenres.includes(g)
    ).length;
    score -= dislikedMatches * 0.2;
  }
  
  // Favorite actors/directors
  if (preferences.favoriteActors && preferences.favoriteActors.trim()) {
    const actors = preferences.favoriteActors.toLowerCase().split(',').map(a => a.trim());
    const overview = content.overview.toLowerCase();
    const title = content.title.toLowerCase();
    
    actors.forEach(actor => {
      if (overview.includes(actor) || title.includes(actor)) {
        score += 0.15;
      }
    });
  }
  
  // Length preference
  if (preferences.preferredLength && preferences.preferredLength !== 'any' && content.runtimeMinutes) {
    if (preferences.preferredLength === 'short' && content.runtimeMinutes < 90) {
      score += 0.1;
    } else if (preferences.preferredLength === 'medium' && content.runtimeMinutes >= 90 && content.runtimeMinutes <= 150) {
      score += 0.1;
    } else if (preferences.preferredLength === 'long' && content.runtimeMinutes > 150) {
      score += 0.1;
    }
  }
  
  return Math.min(Math.max(score, 0), 1);
}

export default router;

