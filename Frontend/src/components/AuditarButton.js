function AuditarButton({ onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`py-2 px-4 rounded font-semibold text-white 
        bg-green-500 
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'}
      `}
    >
      Auditar
    </button>
  );
}

export default AuditarButton;
