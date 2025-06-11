import { useEffect, useState } from 'react';
import api from '../services/api';
import AuditarButton from '../components/AuditarButton';

function Modal({ mensaje }) {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      color: 'white', fontSize: '1.5rem',
      zIndex: 1000,
    }}>
      <div style={{ backgroundColor: '#333', padding: '20px', borderRadius: '8px' }}>
        {mensaje}
      </div>
    </div>
  );
}

function DispositivosPage() {
  const [dispositivos, setDispositivos] = useState([]);
  const [auditoriaEnCurso, setAuditoriaEnCurso] = useState(false);

  const fetchDispositivos = () => {
    api.get('/dispositivos/getAllDispositivos')
      .then(response => {
        setDispositivos(response.data);
      })
      .catch(error => {
        console.error("Error al obtener dispositivos:", error);
      });
  };
  

  const iniciarAuditoria = (dispositivo) => {
    setAuditoriaEnCurso(true); // Mostrar modal al iniciar auditoría
    api.post('/auditorias/crearAuditoria', dispositivo)
      .then(response => {
        alert("Auditoría iniciada correctamente")
      })
      .catch(error => {
        console.error("Error al iniciar auditoría:", error);
        alert("Error al iniciar auditoría");
      })
      .finally(() => {
        setAuditoriaEnCurso(false); // Ocultar modal cuando termina
      });
  };

  // Escanear y actualizar la lista
  function handleScanNetwork() {
    api.get('/dispositivos/escanear')
      .then(response => {
        console.log("Dispositivos escaneados:", response.data);
        fetchDispositivos();
      })
      .catch(error => {
        console.error("Error al escanear la red:", error);
      });
  }

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
            {dispo.ip} - {dispo.mac} - {dispo.fabricante} {' '}
            <AuditarButton onClick={() => iniciarAuditoria(dispo)} />
          </li>
        ))}
      </ul>

      {/* Mostrar modal si auditoría está en curso */}
      {auditoriaEnCurso && <Modal mensaje="Realizando auditoría, por favor espera..." />}
    </div>
  );
}

export default DispositivosPage;
