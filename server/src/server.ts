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

import { MONGO_DB_URI, PORT } from './constants';

// express app
const app = express();

// app middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

// Databse Connection
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

readdirSync('src/routes').map((route) => {
  app.use('/v1/api', require(`./routes/${route}`));
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log('Server started on port', PORT);
});
