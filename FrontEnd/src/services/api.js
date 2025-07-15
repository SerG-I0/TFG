import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // Asegúrate que sea la URL correcta de tu backend
});

// Función para manejar logout en caso de token expirado o no autorizado
function handleLogout() {
  localStorage.removeItem('token');
  alert('Sesión expirada. Por favor, inicia sesión de nuevo.');
  window.location.href = '/login'; // redirige al login
}

// Interceptor de respuesta para detectar errores 401
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {

      if (window.location.pathname !== '/login') {
        //Si estamos fuera del login el 401 sera por token expirado
        handleLogout();
      }
    }
    return Promise.reject(error);
  }
);


export default api;
