import { useEffect, useState } from 'react';
import api from '../services/api';

function DispositivosPage() {
  const [dispositivos, setDispositivos] = useState([]);

  useEffect(() => {
    api.get('/dispositivos')
      .then(response => {
        setDispositivos(response.data);
      })
      .catch(error => {
        console.error("Error al obtener dispositivos:", error);
      });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Lista de Dispositivos</h1>
      <ul>
        {dispositivos.map(dispo => (
          <li key={dispo.id}>{dispo.ip} - {dispo.mac} - {dispo.fabricante}</li>
        ))}
      </ul>
    </div>
  );
}

export default DispositivosPage;
