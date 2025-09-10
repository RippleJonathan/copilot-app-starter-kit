const request = require('supertest');
const app = require('../index');

describe('auth template', () => {
  test('register missing fields returns 400', async () => {
    const res = await request(app).post('/register').send({});
    expect(res.statusCode).toBe(400);
  });

  test('register with email/password returns 201', async () => {
    const res = await request(app).post('/register').send({ email: 'a@b.com', password: 'pw' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
  });
});
