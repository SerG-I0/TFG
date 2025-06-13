// src/components/LogoutButton.jsx
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Redirige al login
    navigate('/');
  };

  return (
    <button onClick={handleLogout} >
      Cerrar sesión
    </button>
  );
}

export default LogoutButton;
