// src/services/index.js
import axios from 'axios';

// Unified base URL for dev (proxy) + production
const API = import.meta.env.VITE_API_BASE_URL || "";

export const baseUrl = axios.create({
    baseURL: API,
    withCredentials: true,
});
