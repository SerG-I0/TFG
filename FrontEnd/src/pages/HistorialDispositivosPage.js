import { useEffect, useState } from 'react';
import api from '../services/api';
import EliminarButton from '../components/EliminarButton';
import LogoutButton from '../components/LogOutButton';
import { useNavigate } from 'react-router-dom';

function HistorialDispositivosPage() {
  const [dispositivos, setDispositivos] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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



  // Filtra según la fecha
  const dispositivosFiltrados = selectedDate
    ? dispositivos.filter((dispositivo) =>
        new Date(dispositivo.fecha).toLocaleDateString() ===
        new Date(selectedDate).toLocaleDateString()
      )
    : dispositivos;

  // Ordena de más reciente a más antigua
  const dispositivosOrdenados = [...dispositivosFiltrados].sort(
    (a, b) => new Date(b.fecha) - new Date(a.fecha)
  );

  // Paginado
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
    <div>
      <h1>Dispositivos Detectados</h1>
        
      {/* Filtra por fecha */}
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />

      {currentDispositivos.map((dispositivo, index) => (
        <div
          key={dispositivo.id}
          style={{ border: '1px solid #ccc', marginBottom: '10px', padding: '10px' }}>
          <div>
            <strong>Fecha de Deteción:</strong>{' '}
            {new Date(dispositivo.fecha).toLocaleString()}<br />
            <strong>IP del Dispositivo:</strong> {dispositivo.ip}<br />
            <strong>MAC del Dispositivo:</strong> {dispositivo.mac}<br />
            <strong>Fabricante del Dispositivo</strong> {dispositivo.fabricante}
          </div>
          <EliminarButton onClick={() => eliminarDispositivo(dispositivo.id)} />


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

export default HistorialDispositivosPage;