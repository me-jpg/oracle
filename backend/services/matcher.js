import OpenAI from 'openai';
import dotenv from 'dotenv';
import { enrichWithTMDb } from './tmdb.js';
import { enrichWithOMDb } from './omdb.js';

dotenv.config();

const openai = process.env.OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
}) : null;

/**
 * MATCHER SERVICE - AI-Powered Dynamic Recommendations
 * 
 * This service uses OpenAI GPT-4 to dynamically find and recommend movies/TV shows
 * based on the user's natural language query. No pre-existing database needed!
 */

/**
 * Dynamically finds and recommends content using AI
 * @param {string} query - Natural language search query
 * @param {object} filters - User-selected filters (contentType, genres, services, etc.)
 * @returns {array} Array of recommended movies/shows with details
 */
export async function findContent(query, filters) {
  // If OpenAI API key is available, use AI to find recommendations
  if (openai) {
    try {
      return await findWithAI(query, filters);
    } catch (error) {
      console.error('AI search error:', error.message);
      throw new Error('Failed to search for content. Please try again.');
    }
  }
  
  // If no API key, return error
  throw new Error('OpenAI API key not configured. Please add OPENAI_API_KEY to your .env file.');
}

/**
 * AI-powered content discovery using OpenAI GPT-4
 * Dynamically finds movies/TV shows that match the user's query
 */
async function findWithAI(query, filters) {
  const { contentType, genres, services, lengthPreference, pricePreference } = filters;
  
  // Build a detailed prompt with all filters
  let prompt = `You are a movie and TV show recommendation expert. Based on the user's query and preferences, recommend 7 real movies or TV shows that match their criteria.

USER QUERY: "${query}"

FILTERS:
- Content Type: ${contentType || 'any'}
- Genres: ${genres?.length > 0 ? genres.join(', ') : 'any'}
- Streaming Services: ${services?.length > 0 ? services.join(', ') : 'any'}
- Length Preference: ${lengthPreference || 'any'}

INSTRUCTIONS:
1. Recommend REAL movies and TV shows that exist
2. Focus on matching the user's query theme/description
3. Consider the genre and content type filters
4. Include a mix of popular and lesser-known titles
5. Provide accurate information about each title

Return ONLY valid JSON in this exact format:
{
  "recommendations": [
    {
      "title": "Movie Title",
      "year": 2020,
      "type": "movie",
      "overview": "Brief 1-2 sentence description explaining why this matches",
      "genres": ["Genre1", "Genre2"],
      "runtimeMinutes": 120,
      "matchScore": 0.95,
      "availability": [
        {"service": "Netflix", "type": "included"},
        {"service": "Prime Video", "type": "rent", "price": 3.99}
      ]
    }
  ]
}

For TV shows, use "seasons" instead of "runtimeMinutes".
Match score should be 0.0 to 1.0 based on how well it fits the query.
Sort by matchScore descending (best matches first).`;

  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [
      {
        role: "system",
        content: "You are a movie and TV recommendation expert. You MUST respond with ONLY valid JSON. No markdown, no code blocks, no explanations - just raw JSON array. Recommend real, existing content."
      },
      {
        role: "user",
        content: prompt
      }
    ],
    temperature: 0.7,
    max_tokens: 4000,
    response_format: { type: "json_object" }
  });

  const content = response.choices[0].message.content.trim();
  
  // Parse the recommendations
  let recommendations;
  try {
    const parsed = JSON.parse(content);
    recommendations = parsed.recommendations || parsed;
    if (!Array.isArray(recommendations)) {
      throw new Error('Response is not an array');
    }
  } catch (e) {
    console.error('Failed to parse AI response:', e.message);
    console.error('Response content:', content);
    throw new Error('Failed to parse AI recommendations');
  }

  // Add IDs and ensure proper formatting
  const formattedRecs = recommendations.map((rec, idx) => ({
    id: `ai-${Date.now()}-${idx}`,
    posterUrl: null,
    trailerUrl: null,
    ...rec,
    matchScore: parseFloat((rec.matchScore || 0.5).toFixed(2))
  }));

  // Enrich with real TMDb data (posters, etc.)
  let enrichedRecs = await enrichWithTMDb(formattedRecs);
  
  // Enrich with OMDb ratings (Rotten Tomatoes, IMDB, etc.)
  enrichedRecs = await enrichWithOMDb(enrichedRecs);
  
  return enrichedRecs;
}



