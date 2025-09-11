const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { requireAuth, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// Generate JWT token
function generateToken(user) {
  const payload = {
    id: user.id,
    provider: user.provider,
    email: user.email,
    displayName: user.displayName,
    avatar: user.avatar
  };
  
  return jwt.sign(payload, process.env.JWT_SECRET, { 
    expiresIn: '7d' // 7 days
  });
}

// GitHub OAuth Routes
if ({{ENABLE_GITHUB}}) {
  router.get('/github', 
    passport.authenticate('github', { scope: ['user:email'] })
  );

  router.get('/github/callback',
    passport.authenticate('github', { failureRedirect: '/auth/error' }),
    (req, res) => {
      const token = generateToken(req.user);
      
      // Redirect to frontend with token
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3001';
      res.redirect(`${frontendUrl}/auth/callback?token=${token}&provider=github`);
    }
  );
}

// Google OAuth Routes
if ({{ENABLE_GOOGLE}}) {
  router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );

  router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/auth/error' }),
    (req, res) => {
      const token = generateToken(req.user);
      
      // Redirect to frontend with token
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3001';
      res.redirect(`${frontendUrl}/auth/callback?token=${token}&provider=google`);
    }
  );
}

// Get user profile (protected route)
router.get('/profile', requireAuth, (req, res) => {
  res.json({
    user: req.user,
    authenticated: true
  });
});

// Check authentication status
router.get('/status', optionalAuth, (req, res) => {
  res.json({
    authenticated: !!req.user,
    user: req.user || null
  });
});

// Logout
router.post('/logout', (req, res) => {
  // With JWT, logout is handled on frontend by removing token
  // Here we could blacklist the token if using a token store
  res.json({ 
    message: 'Logged out successfully',
    note: 'Remove JWT token from client storage'
  });
});

// Error handler for OAuth failures
router.get('/error', (req, res) => {
  res.status(400).json({
    error: 'Authentication failed',
    message: 'OAuth authentication was unsuccessful'
  });
});

module.exports = router;