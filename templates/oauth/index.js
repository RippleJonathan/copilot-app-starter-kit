require('dotenv').config();
const express = require('express');
const passport = require('passport');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Import strategies and routes
require('./config/passport');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3001',
  credentials: true
}));

// Rate limiting
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: 'Too many authentication attempts, try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

// Apply rate limiting to auth routes
app.use('/auth', authLimiter);

// Routes
app.use('/auth', authRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    service: '{{PROJECT_NAME}}',
    timestamp: new Date().toISOString(),
    oauth_providers: {
      github: {{ENABLE_GITHUB}},
      google: {{ENABLE_GOOGLE}}
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 {{PROJECT_NAME}} OAuth service running on port ${PORT}`);
    console.log(`🔐 Available OAuth providers:`);
    if ({{ENABLE_GITHUB}}) console.log(`   - GitHub: http://localhost:${PORT}/auth/github`);
    if ({{ENABLE_GOOGLE}}) console.log(`   - Google: http://localhost:${PORT}/auth/google`);
  });
}

module.exports = app;