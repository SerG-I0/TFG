import { useEffect, useState } from 'react';
import api from '../services/api';
import EliminarButton from '../components/EliminarButton';
import LogoutButton from '../components/LogOutButton';
import '../styles/AuditoriasPage.css';
import PaginationButtons from '../components/PaginationButtons';
import { FaEye} from 'react-icons/fa';


function AuditoriasPage() {
  const [auditorias, setAuditorias] = useState([]);
  const [modalAuditoria, setModalAuditoria] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // 2 columnas x 3 filas

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
        setAuditorias((prev) => prev.filter((a) => a.id !== id));
        setModalAuditoria(null); // Cerrar modal si está abierto con esa auditoría
      })
      .catch((error) => {
        console.error('Error al eliminar!', error);
        alert('No se pudo eliminar.');
      });
  };

  const auditoriasFiltradas = selectedDate
    ? auditorias.filter((auditoria) =>
        new Date(auditoria.fecha).toLocaleDateString() ===
        new Date(selectedDate).toLocaleDateString()
      )
    : auditorias;

  const auditoriasOrdenadas = [...auditoriasFiltradas].sort(
    (a, b) => new Date(b.fecha) - new Date(a.fecha)
  );

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentAuditorias = auditoriasOrdenadas.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(auditoriasOrdenadas.length / itemsPerPage);

  return (
    <>
      <div className="auditorias-container">
        <h1 className="titulo-auditorias">Auditorías Realizadas</h1>

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="filtro-fecha"
        />

        <div className="auditorias-grid">
          {currentAuditorias.map((auditoria) => (
            <div className="auditoria-card" key={auditoria.id}>
              <div className="auditoria-info">
                <p><strong>Fecha:</strong> {new Date(auditoria.fecha).toLocaleString()}</p>
                <p><strong>IP:</strong> {auditoria.dispositivo?.ip}</p>
                <p><strong>MAC:</strong> {auditoria.dispositivo?.mac}</p>
              </div>
              <div className="botones-auditoria">
                <button className='boton-style' onClick={() => setModalAuditoria(auditoria)}>
                 Ver Auditoria
                 <FaEye style={{ marginLeft: '0.5rem', verticalAlign: 'middle', position: 'relative', top: '0px' }} />
                </button>
                <EliminarButton onClick={() => eliminarAuditoria(auditoria.id)} />
              </div>
            </div>
          ))}
        </div>

        <div className="paginacion">
         <PaginationButtons
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
        </div>

        
      </div>
      

      {/* Modal */}
      {modalAuditoria && (
        <div className="modal-overlay" onClick={() => setModalAuditoria(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>Detalle Auditoría</h2>
            <p><strong>Fecha:</strong> {new Date(modalAuditoria.fecha).toLocaleString()}</p>
            <p><strong>IP:</strong> {modalAuditoria.dispositivo?.ip}</p>
            <p><strong>MAC:</strong> {modalAuditoria.dispositivo?.mac}</p>

            <h3>Puertos Abiertos:</h3>
            <ul className="puertos-list">
              {modalAuditoria.puertos?.map((puerto, i) => (
                <li key={i}>
                  <p><strong>Puerto:</strong> {puerto.puerto}</p>
                  <p><strong>Servicio:</strong> {puerto.servicio}</p>
                  <p><strong>Vulnerabilidades:</strong> {puerto.vulnerabilidades || 'Ninguna vulnerabilidad detectada'}</p>
                  <p><strong>Cifrados:</strong> {puerto.cifrados || 'No detectados'}</p>
                  <p><strong>Certificados:</strong> {puerto.certificados || 'No detectados'}</p>
                  <hr />
                </li>
              ))}
            </ul>

            <button className="modal-close-btn" onClick={() => setModalAuditoria(null)}>Cerrar</button>
          </div>
        </div>
      )}
      <LogoutButton />
    </>
  );
}

export default AuditoriasPage;
