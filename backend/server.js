import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import searchRoutes from './routes/search.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', searchRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Oracle API is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🔮 Oracle API running on http://localhost:${PORT}`);
  console.log(`📡 API endpoint: http://localhost:${PORT}/api/search`);
  
  if (!process.env.OPENAI_API_KEY) {
    console.log('\n⚠️  Warning: OPENAI_API_KEY not set. Using mock matcher.');
    console.log('   Create a .env file with your OpenAI API key to enable AI matching.\n');
  }
});
