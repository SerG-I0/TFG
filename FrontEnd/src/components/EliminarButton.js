// EliminarButton.jsx
import { FaTrash } from 'react-icons/fa';
import '../styles/Botones.css';

function EliminarButton({ onClick, disabled }) {
  return (
    <button className="boton-style" onClick={onClick} disabled={disabled}>
      Eliminar
       <FaTrash style={{ marginLeft: '0.5rem', verticalAlign: 'middle', position: 'relative', top: '0px' }} />
    </button>
  );
}

export default EliminarButton;