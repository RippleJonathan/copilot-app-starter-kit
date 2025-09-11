const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// Serialize user for session (minimal - we use JWT)
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// GitHub OAuth Strategy
if ({{ENABLE_GITHUB}} && process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/auth/github/callback"
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      const user = {
        id: profile.id,
        provider: 'github',
        username: profile.username,
        displayName: profile.displayName,
        email: profile.emails?.[0]?.value || null,
        avatar: profile.photos?.[0]?.value || null,
        profileUrl: profile.profileUrl,
        accessToken, // Store for API calls if needed
        createdAt: new Date().toISOString()
      };
      
      // TODO: Save user to database here
      console.log('GitHub OAuth user:', user);
      
      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }));
}

// Google OAuth Strategy  
if ({{ENABLE_GOOGLE}} && process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      const user = {
        id: profile.id,
        provider: 'google',
        email: profile.emails?.[0]?.value || null,
        displayName: profile.displayName,
        firstName: profile.name?.givenName || null,
        lastName: profile.name?.familyName || null,
        avatar: profile.photos?.[0]?.value || null,
        accessToken, // Store for API calls if needed
        refreshToken, // Store for token refresh
        createdAt: new Date().toISOString()
      };
      
      // TODO: Save user to database here
      console.log('Google OAuth user:', user);
      
      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }));
}

// JWT Strategy for protecting routes
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}, async (payload, done) => {
  try {
    // TODO: Validate user exists in database
    // For now, just return the payload
    return done(null, payload);
  } catch (error) {
    return done(error, false);
  }
}));