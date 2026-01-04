import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL + '/api';

export const noteInstance = axios.create({
  baseURL,
  withCredentials: true,
});

noteInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      return Promise.reject(error);
    }

    console.error('API Error:', error);
    return Promise.reject(error);
  }
);
