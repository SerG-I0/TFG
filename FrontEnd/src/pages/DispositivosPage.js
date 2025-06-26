import { useEffect, useState } from 'react';
import api from '../services/api';
import AuditarButton from '../components/AuditarButton';
import LogoutButton from '../components/LogOutButton';

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
        console.error("Error al obtener dispositivos.", error);
      });
  };
  
  const iniciarAuditoria = (dispositivo) => {
    setAuditoriaEnCurso(true);
    api.post('/auditorias/crearAuditoria', dispositivo)
      .then(response => {
        alert("Auditoría iniciada correctamente.");
      })
      .catch(error => {
        console.error("Error al iniciar auditoría.", error);
        alert("Error al iniciar auditoría.");
      })
      .finally(() => {
        setAuditoriaEnCurso(false);
      });
  };

  // Escanear y actualizar la lista
  function handleScanNetwork() {
    api.get('/dispositivos/escanear')
      .then(response => {
        console.log("Dispositivos escaneados.", response.data);
        fetchDispositivos();
      })
      .catch(error => {
        console.error("Error al escanear la red.", error);
      });
  }

  useEffect(() => {
    fetchDispositivos();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Listado de Dispositivos</h1>

      <button 
        onClick={handleScanNetwork} 
        className="bg-blue-500 hover:bg-blue-600 text-gray-50 font-semibold py-2 px-4 rounded mr-4 mb-4">
        Escanear Red
      </button>

      <ul className="bg-gray-100 p-4 rounded-md shadow-md">
        {dispositivos.length === 0 ? (
          <p>No se han encontrado dispositivos</p>
        ) : (
          dispositivos.map(dispo => (
            <li key={dispo.id} className="bg-gray-50 p-4 rounded-md shadow-md mb-4">
              <h2 className="text-lg font-semibold">Dispositivo Encontrado</h2>
              <p><strong>IP:</strong> {dispo.ip}</p>
              <p><strong>MAC:</strong> {dispo.mac}</p>
              <p><strong>Fabricante:</strong> {dispo.fabricante}</p>
              <AuditarButton onClick={() => iniciarAuditoria(dispo)} />
            </li>
          ))
        )}

      </ul>

      {/*Mostrar modal si auditoría está en curso*/}
      {auditoriaEnCurso && <Modal mensaje="Realizando auditoría, por favor espera…" />}
      <LogoutButton />
    </div>
  );
}

export default DispositivosPage;
