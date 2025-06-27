import { useState } from "react";
import api from "../services/api"; 
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import '../styles/LoginPage.css';
;

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();
  setErrorMsg(''); 

  try {
    const response = await api.post('/usuarios/login', {
      email,
      password,
    });

    const token = response.data; 
    localStorage.setItem('token', token); // Guarda el token para usarlo en otras peticiones

    alert("Autenticado con éxito.");

    navigate('/dispositivos');

  } catch (error) {
    if (error.response) {
      setErrorMsg(error.response.data); // muestra mensaje 
    } else {
      setErrorMsg("Error en la conexión. Inténtalo de nuevo.");
    }
  }
};

  return (
  <div className="login-container">
    <h1>Login</h1>
    <form onSubmit={handleLogin}>
      <input 
        type="email" 
        placeholder="Correo electrónico" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        required 
      />
      <input 
        type="password" 
        placeholder="Contraseña" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        required 
      />
      <button type="submit">Iniciar Sesión</button>
    </form>
    {errorMsg && <p className="error-message">{errorMsg}</p>}

    <p>¿No tienes una cuenta?</p>
    <Link to="/crear_usuario">Crear nuevo usuario</Link>
  </div>
);

}

export default LoginPage;
