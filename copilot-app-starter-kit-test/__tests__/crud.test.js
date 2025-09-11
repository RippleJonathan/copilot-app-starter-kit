const request = require('supertest');
const app = require('../index');

describe('crud template', () => {
  test('create without name returns 400', async () => {
    const res = await request(app).post('/items').send({});
    expect(res.statusCode).toBe(400);
  });

  test('create and list items', async () => {
    const res = await request(app).post('/items').send({ name: 'task1' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');

    const list = await request(app).get('/items');
    expect(list.statusCode).toBe(200);
    expect(Array.isArray(list.body)).toBe(true);
  });
});
