import React, { createContext, useContext, useState } from 'react';

export const AuditoriaContext = createContext();

export const AuditoriaProvider = ({ children }) => {
  const [auditoriaEnCurso, setAuditoriaEnCurso] = useState(false);
  const [auditoriaFinalizada, setAuditoriaFinalizada] = useState(false);

  return (
    <AuditoriaContext.Provider value={{
      auditoriaEnCurso,
      setAuditoriaEnCurso,
      auditoriaFinalizada,
      setAuditoriaFinalizada
    }}>
      {children}
    </AuditoriaContext.Provider>
  );
};

// Aquí defines y exportas el hook personalizado para consumir el contexto
export const useAuditoria = () => {
  return useContext(AuditoriaContext);
};
