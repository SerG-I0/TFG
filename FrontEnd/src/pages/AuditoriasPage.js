import { useEffect, useState } from 'react';
import api from '../services/api';
import EliminarButton from '../components/EliminarButton';
import LogoutButton from '../components/LogOutButton';
import { useNavigate } from 'react-router-dom';

function AuditoriasPage() {
  const [auditorias, setAuditorias] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/auditorias/getAllAuditorias')
      .then(response => {
        setAuditorias(response.data);
      })
      .catch(error => {
        console.error("Error al obtener auditorías:", error);
      });
  }, []);

  const eliminarAuditoria = (id) => {
  if (!window.confirm("¿Seguro que quieres eliminar esta auditoría?")) return;

  api.delete(`/auditorias/${id}`)
    .then(() => {
      // Eliminar la auditoría del estado local
      setAuditorias(prev => prev.filter(a => a.id !== id));
    })
    .catch(error => {
      console.error("Error al eliminar la auditoría:", error);
      alert("No se pudo eliminar la auditoría.");
    });
};


  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div>
      <h1>Auditorías Realizadas</h1>
      {auditorias.map((auditoria, index) => (
        <div key={auditoria.id} style={{ border: '1px solid #ccc', marginBottom: '10px', padding: '10px' }}>
          <div>
            <strong>Fecha de Auditoría:</strong> {auditoria.fecha || 'Sin fecha'}<br />
            <strong>IP del Dispositivo:</strong> {auditoria.dispositivo?.ip}<br />
            <strong>MAC del Dispositivo:</strong> {auditoria.dispositivo?.mac}
          </div>
          <button onClick={() => toggleExpand(index)}>
            {expandedIndex === index ? 'Mostrar menos' : 'Mostrar mas'}
       
          </button>
          <EliminarButton onClick={() => eliminarAuditoria(auditoria.id)} />

          {expandedIndex === index && (
            <div style={{ marginTop: '10px', paddingLeft: '15px' }}>
              <h4>Puertos Abiertos:</h4>
              <ul>
                {auditoria.puertos?.map((puerto, i) => (
                  <li key={i}>
                    <strong>Puerto:</strong> {puerto.puerto}<br />
                    <strong>Servicio:</strong> {puerto.servicio}<br />
                    <strong>Vulnerabilidades:</strong> {puerto.vulnerabilidades || 'Ninguna vulnerabilidad detectada'}<br />
                    <strong>Cifrados:</strong> {puerto.cifrados || 'No detectados'}<br />
                    <strong>Certificados:</strong> {puerto.certificados || 'No detectados'}
                    <hr />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    
      <LogoutButton />
    </div>
    
  );
}

export default AuditoriasPage;

