import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // Asegúrate que sea la URL correcta de tu backend
});

export default api;