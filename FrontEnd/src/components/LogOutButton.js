import { useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import '../styles/LogOutButton.css';

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
      <FiLogOut size={20} style={{ marginRight: '8px' }} />
      Cerrar sesión
    </button>
  );
}

export default LogoutButton;
