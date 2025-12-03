# 🔮 Oracle

**AI-powered movie and TV show recommendations.**

Oracle uses GPT-4 to understand what you want to watch and finds the perfect match from your streaming services.

## ✨ Features

- **Natural Language Search**: Describe what you want in plain English
- **AI-Powered Discovery**: GPT-4 dynamically finds movies/shows that match your query
- **My List**: Save movies and shows to watch later with one click
- **Watch History**: Automatically track what you've watched
- **Rating System**: Rate movies 1-5 stars to improve recommendations
- **Personalized Recommendations**: AI learns from your watch history and ratings
- **Hot & Trending**: See what's popular right now or coming soon
- **Hover Video Previews**: Hover over posters to see trailer previews with blur effect
- **Real Movie Data**: Integration with TMDb for accurate posters and details
- **Rotten Tomatoes Scores**: Real ratings from OMDb API with RT and IMDB scores
- **Colorful Service Badges**: Click branded buttons to watch on Netflix, Disney+, etc.
- **Rent/Buy Options**: See rental and purchase prices with direct links
- **Embedded Trailers**: Watch trailers in a beautiful modal without leaving the site
- **Enhanced Contrast UI**: Thick borders and better contrast for perfect visibility
- **No Database Required**: AI searches and recommends content on-the-fly

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- OpenAI API key ([get one here](https://platform.openai.com/api-keys)) - **Required**
- TMDb API key ([get one here](https://www.themoviedb.org/settings/api)) - Optional but recommended for movie posters
- OMDb API key ([get one here](http://www.omdbapi.com/apikey.aspx)) - Optional for Rotten Tomatoes scores

### Installation

1. **Clone and navigate to the project**
   ```bash
   cd C:\Users\jacob\StreamScout
   ```

2. **Set up backend**
   ```bash
   cd backend
   npm install
   ```

3. **Create `.env` file in backend folder**
   ```bash
   OPENAI_API_KEY=your_openai_api_key_here
   TMDB_API_KEY=your_tmdb_api_key_here
   OMDB_API_KEY=your_omdb_api_key_here
   PORT=3001
   ```
   
   **Note:** OPENAI_API_KEY is required. TMDB_API_KEY and OMDB_API_KEY are optional but recommended for posters and ratings.

4. **Set up frontend**
   ```bash
   cd ../frontend
   npm install
   ```

### Running Oracle

Open two terminals:

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Open **http://localhost:5173** in your browser.

## 🔑 Getting Your API Keys

### OpenAI API Key (Required)
1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Click "Create new secret key"
4. Copy the key and add it to your `.env` file

### TMDb API Key (Optional - for movie posters)
1. Go to [TMDb](https://www.themoviedb.org/signup)
2. Create a free account
3. Go to Settings > API
4. Request an API key (choose "Developer")
5. Copy the "API Key (v3 auth)" and add it to your `.env` file

### OMDb API Key (Optional - for Rotten Tomatoes scores)
1. Go to [OMDb API](http://www.omdbapi.com/apikey.aspx)
2. Choose the FREE tier (1,000 daily requests)
3. Enter your email and activate your key
4. Copy the API key from your email and add it to your `.env` file

**Note:** Without these API keys, movies will still show but without poster images and ratings.

## 🎮 Usage

1. **First time**: Oracle will ask which streaming services you have
2. **Then**: Choose if you're willing to rent/buy or subscription-only
3. **Search**: Describe what you want to watch naturally
   - "Sci-fi thriller with time travel and paradoxes"
   - "Heartwarming comedy about unlikely friendships"
   - "Dark fantasy with dragons and political intrigue"

## 🏗️ Tech Stack

**Frontend:**
- React + Vite
- TailwindCSS (minimal black/white theme)

**Backend:**
- Node.js + Express
- OpenAI GPT-4 Turbo (for AI recommendations)
- TMDb API (for real movie/TV data and posters)

## 🔮 How It Works

1. You describe what you want to watch in natural language
2. GPT-4 understands your query and dynamically finds matching movies/TV shows
3. Results are enriched with real data from TMDb (posters, details)
4. Oracle filters by your streaming services and preferences
5. You get 7 perfectly matched recommendations, ranked by relevance (0-100%)

## 💡 Future Enhancements

- [x] Real movie database (TMDb API integration)
- [x] Dynamic AI-powered content discovery
- [ ] User accounts and watch history
- [ ] Recommendations based on past preferences
- [ ] Trailer integration
- [ ] Multi-language support

## 📝 License

MIT

---

**Built with AI. Powered by Oracle. 🔮**
