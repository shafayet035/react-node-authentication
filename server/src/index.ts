import express from 'express';
import cors from 'cors';
import { PORT } from './contants';

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log('Server started on port 5000');
});
