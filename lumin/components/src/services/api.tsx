import axios from 'axios';
import authService from './authServices';

const api = axios.create({
  baseURL: 'http://10.5.4.33:3001/api',
});

api.interceptors.request.use(async (config) => {
  try {
    const { accessToken } = await authService.getAuthData();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  } catch (error) {
    console.warn('Erro ao recuperar token:', error);
  }
  return config;
});

export default api;
