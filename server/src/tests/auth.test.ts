import request from 'supertest';
import { app } from '../server';
import mongoose, { ConnectOptions } from 'mongoose';
import { MONGO_DB_URI } from '../constants';

describe('Authentication API', () => {
  beforeEach(async () => {
    await mongoose.connect(MONGO_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('should register a new user', async () => {
    const response = await request(app).post('/api/register').send({
      name: 'Shafayet Hossain',
      email: 'testemail@email.com',
      password: 'password@123',
    });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Registration successful');
  });
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});
