import axios from 'axios';
import { AuthResponse } from '@/interfaces/auth';

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

const $api = axios.create({
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL: API_URL,
});

$api.interceptors.request.use((config: any) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('user:token')}`
  return config;
})

$api.interceptors.response.use((congif) => {
  return congif;
}, async (error) => {
  const originalRequest = error.config;
  if (error?.response?.status == 401 && error?.config && !error?.config?._isRetry) {
      originalRequest._isRetry = true;
      try {
        console.log('request to refresh')
        const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, { withCredentials: true })
        localStorage.setItem('user:token', response?.data?.accessToken);
        return $api.request(originalRequest);
      } catch (e) {
        console.log(e)
        localStorage.removeItem('user:token')
        console.log('Unauthorized')
      }
  }
  throw error;
})


export default $api;
