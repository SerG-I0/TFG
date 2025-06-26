import { useEffect, useState } from 'react';
import api from '../services/api';
import AuditarButton from '../components/AuditarButton';
import LogoutButton from '../components/LogOutButton';
import { useAuditoria } from '../context/AuditoriaContext';

function DispositivosPage() {
  const [dispositivos, setDispositivos] = useState([]);
  const [escaneoRealizado, setEscaneoRealizado] = useState(false); // nuevo estado

  const { auditoriaEnCurso, setAuditoriaEnCurso, setAuditoriaFinalizada } = useAuditoria();

  const iniciarAuditoria = (dispositivo) => {
    setAuditoriaEnCurso(true);
    setAuditoriaFinalizada(false);

    const token = localStorage.getItem('token');

    api.post('/auditorias/crearAuditoria', dispositivo, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        alert("Auditoría realizada correctamente.");
      })
      .catch(error => {
        console.error("Error al iniciar auditoría.", error);
        alert("Error al iniciar auditoría.");
      })
      .finally(() => {
        setAuditoriaEnCurso(false);
        setAuditoriaFinalizada(true);
      });
  };

  function handleScanNetwork() {
    api.get('/dispositivos/escanear')
      .then(response => {
        console.log("Dispositivos escaneados.", response.data);
        setDispositivos(response.data);
        setEscaneoRealizado(true); // aquí marcamos que ya se hizo el escaneo
      })
      .catch(error => {
        console.error("Error al escanear la red.", error);
        setEscaneoRealizado(true); // aunque haya error, ya se intentó el escaneo
      });
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Listado de Dispositivos</h1>

      <button 
        onClick={handleScanNetwork} 
        disabled={auditoriaEnCurso}
        className={`bg-blue-500 hover:bg-blue-600 text-gray-50 font-semibold py-2 px-4 rounded mr-4 mb-4 ${
          auditoriaEnCurso ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        Escanear Red
      </button>

      {auditoriaEnCurso && (
        <p className="text-yellow-600 font-semibold mb-4">
          Auditoría en curso. Por favor espera a que termine antes de iniciar otra.
        </p>
      )}

      <ul className="bg-gray-100 p-4 rounded-md shadow-md">
        {(escaneoRealizado && dispositivos.length === 0) ? (
          <p>No se han encontrado dispositivos</p>
        ) : (
          dispositivos.map(dispositivo => (
            <li key={dispositivo.id} className="bg-gray-50 p-4 rounded-md shadow-md mb-4">
              <h2 className="text-lg font-semibold">Dispositivo Encontrado</h2>
              <p><strong>IP:</strong> {dispositivo.ip}</p>
              <p><strong>MAC:</strong> {dispositivo.mac}</p>
              <p><strong>Fabricante:</strong> {dispositivo.fabricante}</p>
              <AuditarButton 
                onClick={() => iniciarAuditoria(dispositivo)} 
                disabled={auditoriaEnCurso}
              />
            </li>
          ))
        )}
      </ul>

      <LogoutButton />
    </div>
  );
}

export default DispositivosPage;
