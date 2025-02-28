
import axios, { AxiosInstance } from 'axios';

export const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // Coloque a URL base da sua API
  timeout: 10000, // Timeout de 10 segundos
  headers: {
    'Content-Type': 'application/json',

  }
});

