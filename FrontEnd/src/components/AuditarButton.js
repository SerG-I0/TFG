function AuditarButton({ onClick, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled}>
      Auditar
    </button>
  );
}

export default AuditarButton;