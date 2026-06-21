import request from 'supertest';
import express from 'express';

const app = express();
app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));

describe('Sample Test', () => {
  it('should test that true is true', () => {
    expect(true).toBe(true);
  });

  it('should return 200 for health check', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toBe('ok');
  });
});
