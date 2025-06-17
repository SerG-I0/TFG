import { useEffect, useState } from 'react';
import api from '../services/api';
import EliminarButton from '../components/EliminarButton';
import LogoutButton from '../components/LogOutButton';
import { useNavigate } from 'react-router-dom';

function AuditoriasPage() {
  const [auditorias, setAuditorias] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const navigate = useNavigate();

  useEffect(() => {
    api
      .get('/auditorias/getAllAuditorias')
      .then((response) => {
        setAuditorias(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener auditorías!', error);
      });
  }, []);

  const eliminarAuditoria = (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar esta auditoría?')) return;

    api
      .delete(`/auditorias/${id}`)
      .then(() => {
        setAuditorias((prev) =>
          prev.filter((a) => a.id !== id)
        );
      })
      .catch((error) => {
        console.error('Error al eliminar!', error);
        alert('No se pudo eliminar.');
      });
  };

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  // Filtra según la fecha
  const auditoriasFiltradas = selectedDate
    ? auditorias.filter((auditoria) =>
        new Date(auditoria.fecha).toLocaleDateString() ===
        new Date(selectedDate).toLocaleDateString()
      )
    : auditorias;

  // Ordena de más reciente a más antigua
  const auditoriasOrdenadas = [...auditoriasFiltradas].sort(
    (a, b) => new Date(b.fecha) - new Date(a.fecha)
  );

  // Paginado
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  const currentAuditorias = auditoriasOrdenadas.slice(
    indexOfFirst,
    indexOfLast
  );

  const totalPages = Math.ceil(
    auditoriasOrdenadas.length / itemsPerPage
  );

  return (
    <div>
      <h1>Auditorías Realizadas</h1>

      {/* Filtra por fecha */}
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />

      {currentAuditorias.map((auditoria, index) => (
        <div
          key={auditoria.id}
          style={{ border: '1px solid #ccc', marginBottom: '10px', padding: '10px' }}>
          <div>
            <strong>Fecha de Auditoría:</strong>{' '}
            {new Date(auditoria.fecha).toLocaleDateString()}<br />
            <strong>IP del Dispositivo:</strong> {auditoria.dispositivo?.ip}<br />
            <strong>MAC del Dispositivo:</strong> {auditoria.dispositivo?.mac}
          </div>
          <button onClick={() => toggleExpand(indexOfFirst + index)}>
            {expandedIndex === indexOfFirst + index ? 'Mostrar menos' : 'Mostrar más'}
          </button>
          <EliminarButton onClick={() => eliminarAuditoria(auditoria.id)} />

          {expandedIndex === indexOfFirst + index && (
            <div style={{ marginTop: '10px', paddingLeft: '15px' }}>
              <h4>Puertos Abiertos:</h4>
              <ul>
                {auditoria.puertos?.map((puerto, i) => (
                    <li key={i}>
                    <strong>Puerto:</strong> {puerto.puerto}<br />
                    <strong>Servicio:</strong> {puerto.servicio}<br />
                    <strong>Vulnerabilidades:</strong> {puerto.vulnerabilidades ||
                    'Ninguna vulnerabilidad detectada'}
                    <br />
                    <strong>Cifrados:</strong> {puerto.cifrados ||
                    'No detectados'}
                    <br />
                    <strong>Certificados:</strong> {puerto.certificados ||
                    'No detectados'}
                    <hr />
                    </li>
                ))}
              </ul>
            </div>
          )}

        </div>
      ))}

      {/* Botones de paginado */}
      <div style={{ marginBottom: '20px' }}>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Anterior
        </button>

        <span> Página {currentPage} de {totalPages} </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Siguiente
        </button>
      </div>

      <LogoutButton />
    </div>
  );
}

export default AuditoriasPage;

