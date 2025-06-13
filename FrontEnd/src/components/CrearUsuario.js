import { useState } from "react";
import api from "../services/api";
import { useNavigate } from 'react-router-dom';

function CrearUsuario() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  // Función para validar formato email
  const validarEmail = (email) => {
    // Expresión regular sencilla para email válido
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const crearUsuario = async (e) => {
    e.preventDefault();

    if (!validarEmail(email)) {
      alert("Por favor ingresa un correo electrónico válido.");
      return;
    }

    try {
      await api.post('/usuarios/crearUsuario', {
        email: email,
        password: password,
      });
      alert("Usuario creado con éxito.");
      setEmail('');
      setPassword('');
    } catch (error) {
       if (error.response && error.response.status === 409) {
      // Error de conflicto: usuario duplicado
      alert(error.response.data); // Aquí muestra el mensaje personalizado del backend
    } else {
      alert("Error al crear el usuario.");
    }
    }
  };

  const volverClick = () => {
    navigate('/');
  };

  return (
    <div>
      <h1>Crear nuevo usuario</h1>
      <form onSubmit={crearUsuario}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br/>

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br/>

        <button type="submit">
          Crear nuevo usuario
        </button>
      </form>
      <button onClick={volverClick}>
        Volver al login
      </button>
    </div>
  );
}

export default CrearUsuario;
