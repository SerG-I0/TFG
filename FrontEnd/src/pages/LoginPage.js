import { useState } from "react";
import api from "../services/api"; 
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg(''); // limpiar error previo
    
    try {
      const response = await api.post('/usuarios/login', {
        email,
        password,
      });
      alert(response.data); // "Autenticado con éxito."

       navigate('/dispositivos'); ;

    } catch (error) {
      if (error.response) {
        setErrorMsg(error.response.data); // muestra mensaje desde backend
      } else {
        setErrorMsg("Error en la conexión. Inténtalo de nuevo.");
      }
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input 
          type="email" 
          placeholder="Correo electrónico" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        /><br />
        <input 
          type="password" 
          placeholder="Contraseña" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        /><br />
        <button type="submit">Iniciar Sesión</button>
      </form>
      {errorMsg && <p style={{color: 'red'}}>{errorMsg}</p>}

      <p>¿No tienes una cuenta?</p>
      <Link to="/crear_usuario">Crear nuevo usuario</Link>
    </div>
  );
}

export default LoginPage;
