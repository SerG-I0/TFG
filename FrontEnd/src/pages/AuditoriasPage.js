import { useEffect, useState } from 'react';
import api from '../services/api';

function AuditoriasPage() {
  const [auditorias, setAuditorias] = useState([]);

  useEffect(() => {
    api.get('/auditorias/getAllAuditorias')
      .then(response => {
        setAuditorias(response.data);
      })
      .catch(error => {
        console.error("Error al obtener auditorías:", error);
      });
  }, []);

  return (
    <div>
      <h1>Lista de Auditorías</h1>
      {auditorias.map((auditoria) => (
        <div key={auditoria.id} style={{ border: '1px solid #ccc', marginBottom: '16px', padding: '10px' }}>
          <p><strong>Fecha:</strong> {new Date(auditoria.fecha).toLocaleString()}</p>

          <h3>Dispositivo</h3>
          <p><strong>IP:</strong> {auditoria.dispositivo?.ip}</p>
          <p><strong>MAC:</strong> {auditoria.dispositivo?.mac}</p>
          <p><strong>Fabricante:</strong> {auditoria.dispositivo?.fabricante}</p>

          <h3>Puertos Abiertos</h3>
          <ul>
            {auditoria.puertos?.map((puerto, index) => (
              <li key={index}>
                <p><strong>Puerto:</strong> {puerto.puerto}</p>
                <p><strong>Servicio:</strong> {puerto.servicio}</p>
                {puerto.vulnerabilidades && <p><strong>Vulnerabilidades:</strong> {puerto.vulnerabilidades}</p>}
                {puerto.cifrados && <p><strong>Cifrados SSL:</strong> {puerto.cifrados}</p>}
                {puerto.certificados && <p><strong>Certificados SSL:</strong> {puerto.certificados}</p>}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default AuditoriasPage;
