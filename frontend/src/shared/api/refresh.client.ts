import axios from 'axios';

const prodBaseURL = '/api';
const devBaseURL = `${import.meta.env.VITE_API_URL}/api`;
const baseURL = import.meta.env.PROD ? prodBaseURL : devBaseURL;

export const refreshClient = axios.create({
  baseURL,
  withCredentials: true,
});
