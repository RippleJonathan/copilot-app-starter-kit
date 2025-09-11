const request = require('supertest');
const app = require('../index');

describe('OAuth Authentication Service', () => {
  describe('Health Check', () => {
    test('GET /health should return service status', async () => {
      const res = await request(app)
        .get('/health')
        .expect(200);

      expect(res.body).toHaveProperty('status', 'ok');
      expect(res.body).toHaveProperty('service', '{{PROJECT_NAME}}');
      expect(res.body).toHaveProperty('oauth_providers');
      expect(res.body.oauth_providers).toHaveProperty('github');
      expect(res.body.oauth_providers).toHaveProperty('google');
    });
  });

  describe('Authentication Status', () => {
    test('GET /auth/status should return unauthenticated status without token', async () => {
      const res = await request(app)
        .get('/auth/status')
        .expect(200);

      expect(res.body).toHaveProperty('authenticated', false);
      expect(res.body).toHaveProperty('user', null);
    });
  });

  describe('Protected Routes', () => {
    test('GET /auth/profile should require authentication', async () => {
      const res = await request(app)
        .get('/auth/profile')
        .expect(401);
    });
  });

  describe('OAuth Initiation', () => {
    if ({{ENABLE_GITHUB}}) {
      test('GET /auth/github should redirect to GitHub', async () => {
        const res = await request(app)
          .get('/auth/github')
          .expect(302);
        
        expect(res.headers.location).toMatch(/github\.com\/login\/oauth\/authorize/);
      });
    }

    if ({{ENABLE_GOOGLE}}) {
      test('GET /auth/google should redirect to Google', async () => {
        const res = await request(app)
          .get('/auth/google')
          .expect(302);
        
        expect(res.headers.location).toMatch(/accounts\.google\.com/);
      });
    }
  });

  describe('Error Handling', () => {
    test('GET /auth/error should return error response', async () => {
      const res = await request(app)
        .get('/auth/error')
        .expect(400);

      expect(res.body).toHaveProperty('error', 'Authentication failed');
    });

    test('Unknown routes should return 404', async () => {
      const res = await request(app)
        .get('/unknown-route')
        .expect(404);

      expect(res.body).toHaveProperty('error', 'Route not found');
    });
  });

  describe('Logout', () => {
    test('POST /auth/logout should return logout message', async () => {
      const res = await request(app)
        .post('/auth/logout')
        .expect(200);

      expect(res.body).toHaveProperty('message', 'Logged out successfully');
    });
  });
});