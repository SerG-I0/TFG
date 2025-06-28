import { useEffect, useState } from 'react';
import api from '../services/api';
import AuditarButton from '../components/AuditarButton';
import LogoutButton from '../components/LogOutButton';
import { useAuditoria } from '../context/AuditoriaContext';
import '../styles/DetectarDispositivosPage.css';


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
  <>
    <div className="dispositivos-container">
      <h1>Listado de Dispositivos</h1>

      <button 
        onClick={handleScanNetwork} 
        disabled={auditoriaEnCurso}
      >
        Escanear Red
      </button>

      {auditoriaEnCurso && (
        <p className="auditoria-message">
          Auditoría en curso. Por favor espera a que termine antes de iniciar otra.
        </p>
      )}

      <ul className="device-list">
        {(escaneoRealizado && dispositivos.length === 0) ? (
          <p className="no-devices-message">No se han encontrado dispositivos</p>
        ) : (
          dispositivos.map(dispositivo => (
            <li key={dispositivo.id}>
              <h2>Dispositivo Encontrado</h2>
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
    </div>

    <LogoutButton />
  </>
);

}

export default DispositivosPage;