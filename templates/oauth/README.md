# {{PROJECT_NAME}} - OAuth Authentication

OAuth authentication service with GitHub and Google integration, built with Express and Passport.

## Features

- 🔐 GitHub OAuth integration
- 🌐 Google OAuth integration  
- 🔑 JWT token generation and validation
- 🛡️ Secure session management
- ⚡ Express.js REST API
- 🧪 Comprehensive test suite
- 🔒 Security headers and rate limiting
- 📱 CORS support for frontend integration

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your OAuth credentials

# Start development server
npm run dev

# Run tests
npm test

# Start production server
npm start
```

## OAuth Setup

### GitHub OAuth App

1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create a new OAuth App with:
   - Authorization callback URL: `http://localhost:3000/auth/github/callback`
3. Copy Client ID and Client Secret to your `.env` file

### Google OAuth App

1. Go to Google Cloud Console > APIs & Services > Credentials
2. Create OAuth 2.0 Client ID with:
   - Authorized redirect URI: `http://localhost:3000/auth/google/callback`
3. Copy Client ID and Client Secret to your `.env` file

## Environment Variables

```bash
# Server
PORT=3000
NODE_ENV=development

# JWT
JWT_SECRET={{JWT_SECRET}}

# GitHub OAuth (if enabled)
GITHUB_CLIENT_ID={{GITHUB_CLIENT_ID}}
GITHUB_CLIENT_SECRET=your_github_client_secret

# Google OAuth (if enabled)  
GOOGLE_CLIENT_ID={{GOOGLE_CLIENT_ID}}
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3001
```

## API Endpoints

### Authentication Routes

- `GET /auth/github` - Initiate GitHub OAuth flow
- `GET /auth/github/callback` - GitHub OAuth callback
- `GET /auth/google` - Initiate Google OAuth flow
- `GET /auth/google/callback` - Google OAuth callback
- `GET /auth/profile` - Get user profile (requires JWT)
- `POST /auth/logout` - Logout user
- `GET /auth/status` - Check authentication status

### Health Check

- `GET /health` - Service health check

## Usage Examples

### Frontend Integration

```javascript
// Initiate OAuth login
window.location.href = 'http://localhost:3000/auth/github';

// Handle OAuth callback (frontend)
// The callback will redirect to frontend with JWT token
// Extract token from URL params or use popup/iframe pattern

// Use JWT for authenticated requests
const token = localStorage.getItem('jwt');
fetch('/api/protected', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

### Token Validation

```javascript
// Verify JWT token
const jwt = require('jsonwebtoken');
const token = req.headers.authorization?.split(' ')[1];
const decoded = jwt.verify(token, process.env.JWT_SECRET);
```

## Security Features

- Helmet.js security headers
- Rate limiting on auth endpoints
- CORS configuration
- JWT token expiration
- Secure cookie settings
- Input validation

## Testing

```bash
# Run all tests
npm test

# Test specific endpoints
npm test -- --grep "GitHub OAuth"
npm test -- --grep "Google OAuth"
```

## Deployment

1. Set environment variables in production
2. Configure OAuth app URLs for production domain
3. Use process manager like PM2
4. Enable HTTPS for production
5. Set secure JWT secret

## Next Steps

1. 🔐 Configure OAuth apps in GitHub/Google
2. 🎨 Integrate with your frontend application
3. 💾 Add user persistence (database)
4. 📧 Add email verification flow
5. 🔄 Implement refresh token rotation
6. 📱 Add mobile app support