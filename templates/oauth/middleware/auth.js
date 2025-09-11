const passport = require('passport');

// JWT authentication middleware
const requireAuth = passport.authenticate('jwt', { session: false });

// Optional authentication (doesn't fail if no token)
const optionalAuth = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (user) {
      req.user = user;
    }
    next();
  })(req, res, next);
};

module.exports = {
  requireAuth,
  optionalAuth
};