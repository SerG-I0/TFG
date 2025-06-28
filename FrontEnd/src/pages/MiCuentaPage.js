import React from 'react';
import { jwtDecode } from 'jwt-decode';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../components/LogOutButton';
import api from '../services/api';
import '../styles/MiCuentaPage.css';

function MiCuentaPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  let email = '';

  if (token) {
    try {
      const decoded = jwtDecode(token);
      email = decoded.email || decoded.sub || '';
    } catch (error) {
      console.error('Error decodificando token:', error);
    }
  }

const eliminarCuenta = () => {
  if (!window.confirm('¿Seguro que deseas eliminar tu cuenta? Esta acción no se puede deshacer.')) return;

  api
    .delete(`/usuarios/${encodeURIComponent(email)}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => {
      alert('Cuenta eliminada correctamente.');
      localStorage.removeItem('token');
      navigate('/login');
    })
    .catch((error) => {
      console.error('Error al eliminar la cuenta!', error);
      alert('No se pudo eliminar la cuenta.');
    });
};


  return (
    <>
    <div className="mi-cuenta-container">
      <FaUserCircle size={100} color="#6e8efb" style={{ marginBottom: 20 }} />
      <h1>Mi Cuenta</h1>

      {email ? (
        <div className="mi-cuenta-info-box">
          <p><strong>Correo electrónico:</strong> {email}</p>
          <p><strong>Contraseña:</strong> ********</p>

          <button 
            className="mi-cuenta-button eliminar" 
            onClick={eliminarCuenta}
          >
            Eliminar Cuenta
          </button>
        </div>
      ) : (
        <p>No se pudo obtener la información de la cuenta.</p>
      )}

    </div>
           <LogoutButton />
    </>
  );
}

export default MiCuentaPage;
