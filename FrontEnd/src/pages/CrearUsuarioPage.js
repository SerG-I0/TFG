import { useState } from "react";
import api from "../services/api";
import { useNavigate } from 'react-router-dom';
import '../styles/CrearUsuarioPage.css';

function CrearUsuario() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const navigate = useNavigate();

  // Función para validar formato email
  const validarEmail = (email) => {
    // Acepta un correo electrónico válido
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Función para validar password
  const validarContrasena = (contrasena) => {
    // La password tiene que tener al menos 6 dígitos,
    // que contenga al menos un número y al menos una letra.
    return (
      contrasena.length >= 6 &&
      /[A-Za-z]/.test(contrasena) &&
      /\d/.test(contrasena)
    );
  };

  const crearUsuario = async (e) => {
    e.preventDefault();

    setError('');
    setSuccess('');
  
    if (!validarEmail(email)) {
      setError("Por favor ingresa un correo electrónico válido.");
      return;
    }

    if (!validarContrasena(password)) {
      setError("Lacontraseña debe tener al menos 6 dígitos, contener al menos un número y una letra.");
      return;
    }

    try {
      await api.post('/usuarios/crearUsuario', {
        email: email,
        password: password,
      });
      setSuccess("Usuario creado con éxito.");
      setEmail('');
      setPassword('');
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setError(error.response.data);
      } else {
        setError("Error al crear el usuario.");
      }
    }
  };

  const volverClick = () => {
    navigate('/');
  };

 return (
  <div className="crear-usuario-container">
    <h1>Crear nuevo usuario</h1>

    {error && <p className="error">{error}</p>}
    {success && <p className="success">{success}</p>}

    <form onSubmit={crearUsuario}>
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
      <button type="submit">Crear nuevo usuario</button>
    </form>

    <button onClick={volverClick}>Volver al login</button>
  </div>
);

}

export default CrearUsuario;
