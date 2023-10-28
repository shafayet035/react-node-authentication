import axios from 'axios';
import { API_URI } from '@/constants/env';

const instance = axios.create({
  baseURL: API_URI,
  withCredentials: true,
});

export default instance;
