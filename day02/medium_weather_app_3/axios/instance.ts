import axios from 'axios';

export const instanceApi = axios.create({
  baseURL: 'https://geocoding-api.open-meteo.com/v1',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});


