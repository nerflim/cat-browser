import axios from 'axios';

export const httpClient = axios.create();
httpClient.interceptors.request.use(
  (config) => {
    config.baseURL = process.env.REACT_APP_API_URL;
    config.headers = {
      'x-api-key': process.env.REACT_APP_API_KEY,
      'Content-Type': 'application/json',
    };
    return config;
  },
  (error) => Promise.reject(error)
);

export default axios;
