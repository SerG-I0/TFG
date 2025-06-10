import { useEffect, useState } from 'react';
import api from '../services/api';

function DispositivosPage() {
  const [dispositivos, setDispositivos] = useState([]);

  const fetchDispositivos = () => {
    api.get('/dispositivos/getAllDispositivos')
      .then(response => {
        setDispositivos(response.data);
      })
      .catch(error => {
        console.error("Error al obtener dispositivos:", error);
      });
  };

  // 🔁 Escanear y actualizar la lista
  const handleScanNetwork = () => {
    api.get('/dispositivos/escanear')
      .then(response => {
        console.log("Dispositivos escaneados:", response.data);
        fetchDispositivos(); // Recargar la lista
      })
      .catch(error => {
        console.error("Error al escanear la red:", error);
      });
  };

  useEffect(() => {
    fetchDispositivos();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Lista de Dispositivos</h1>

      <button 
        onClick={handleScanNetwork} 
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Escanear Red
      </button>

      <ul>
        {dispositivos.map(dispo => (
          <li key={dispo.id}>
            {dispo.ip} - {dispo.mac} - {dispo.fabricante}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DispositivosPage;
