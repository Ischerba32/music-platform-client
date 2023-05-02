import axios from "axios";

export const API_URL = `http://localhost:5000`;

const $api = axios.create({
  baseURL: API_URL
})

$api.interceptors.request.use((config) => {
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
  return config;
})

export default $api;