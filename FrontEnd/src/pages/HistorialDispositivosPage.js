import { useEffect, useState } from 'react';
import api from '../services/api';
import EliminarButton from '../components/EliminarButton';
import LogoutButton from '../components/LogOutButton';
import { useNavigate } from 'react-router-dom';
import '../styles/HistorialDispositivosPage.css';
import PaginationButtons from '../components/PaginationButtons';


function HistorialDispositivosPage() {
  const [dispositivos, setDispositivos] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Cambiado a 6

  const navigate = useNavigate();

  useEffect(() => {
    api
      .get('/dispositivos/getAllDispositivos')
      .then((response) => {
        setDispositivos(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener dispositivos!', error);
      });
  }, []);

  const eliminarDispositivo = (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar este dispositivo?')) return;

    api
      .delete(`/dispositivos/${id}`)
      .then(() => {
        setDispositivos((prev) =>
          prev.filter((a) => a.id !== id)
        );
      })
      .catch((error) => {
        console.error('Error al eliminar!', error);
        alert('No se pudo eliminar.');
      });
  };

  const dispositivosFiltrados = selectedDate
    ? dispositivos.filter((dispositivo) =>
        new Date(dispositivo.fecha).toLocaleDateString() ===
        new Date(selectedDate).toLocaleDateString()
      )
    : dispositivos;

  const dispositivosOrdenados = [...dispositivosFiltrados].sort(
    (a, b) => new Date(b.fecha) - new Date(a.fecha)
  );

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  const currentDispositivos = dispositivosOrdenados.slice(
    indexOfFirst,
    indexOfLast
  );

  const totalPages = Math.ceil(
    dispositivosOrdenados.length / itemsPerPage
  );

  return (
    <>
      <div className="historial-container">
        <h1>Dispositivos Detectados</h1>
        
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />

        {currentDispositivos.length === 0 && (
          <p className="no-devices-message">
            No hay dispositivos para mostrar.
          </p>
        )}

        <div className="device-grid">
          {currentDispositivos.map((dispositivo) => (
            <div key={dispositivo.id} className="device-card">
              <div>
                <strong>Fecha de Detección:</strong>{' '}
                {new Date(dispositivo.fecha).toLocaleString()}<br />
                <strong>IP del Dispositivo:</strong> {dispositivo.ip}<br />
                <strong>MAC del Dispositivo:</strong> {dispositivo.mac}<br />
                <strong>Fabricante del Dispositivo:</strong> {dispositivo.fabricante}
              </div>
              <EliminarButton onClick={() => eliminarDispositivo(dispositivo.id)} />
            </div>
          ))}
        </div>

        <div className="pagination">
           <PaginationButtons
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
        </div>
      </div>
      <LogoutButton />
    </>
  );
}

export default HistorialDispositivosPage;
