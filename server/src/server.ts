import express from 'express';
import cors from 'cors';
import mongoose, { ConnectOptions } from 'mongoose';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { readdirSync, readdir } from 'fs';
import path from 'path';

// environment variable config
import { config } from 'dotenv';
config({ path: path.resolve(__dirname, '../.env') });

import { FRONTEND_URL, MONGO_DB_URI, PORT } from './constants';
import helmet from 'helmet';

export const app = express();

// app middlewares
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(helmet());

// Databse Connection
if (MONGO_DB_URI) {
  mongoose
    .connect(MONGO_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions)
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((err) => {
      console.log('Failed to connect to MongoDB', err);
    });
}

const routesDir = path.join(__dirname, 'routes');

console.log(routesDir);

readdirSync(routesDir).map((route) => {
  const subRoute = path.parse(route).name;

  app.use(`/api/${subRoute}`, require(`${routesDir}/${route}`));
});

app.get('/', (req, res) => {
  res.status(201);
  res.send('If there is no Hello World then its a good codebase :)');
});

app.listen(PORT, () => {
  console.log('Server started on port', PORT);
});
