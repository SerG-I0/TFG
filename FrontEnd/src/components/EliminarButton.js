function EliminarButton({ onClick, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled}>
      Eliminar
    </button>
  );
}

export default EliminarButton;