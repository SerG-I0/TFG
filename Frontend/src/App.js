import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import DetectarDispositivosPage from './pages/DetectarDispositivosPage';
import AuditoriasPage from './pages/AuditoriasPage';
import LoginPage from './pages/LoginPage';
import CrearUsuarioPage from './pages/CrearUsuarioPage';
import HistorialDispositivosPage from './pages/HistorialDispositivosPage';
import MiCuentaPage from './pages/MiCuentaPage'; 
import { FaUserCircle } from 'react-icons/fa';
import './styles/Navbar.css';

// Importa tu context provider
import { AuditoriaProvider } from './context/AuditoriaContext';

// Componente para rutas privadas (protege las rutas que necesitan autenticación)
function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
}


function Navbar() {
  return (
    <nav>
      <div className="navbar-content">
        <ul>
          <li><Link to="/dispositivos">Escanear Red</Link></li>
          <li><Link to="/auditorias">Historial de Auditorías</Link></li>
          <li><Link to="/historial_dispositivos">Historial Dispositivos</Link></li>
        </ul>
        <div className="nav-account">
          <Link to="/cuenta">
          <FaUserCircle size={24} style={{ marginRight: '8px', position: 'relative', top: '6px' }} />
          Mi Cuenta</Link>
        </div>
      </div>
    </nav>
  );
}

function AppContent() {
  const location = useLocation();
  const noNavbarPaths = ['/login', '/crear_usuario'];

  return (
    <div>
      {!noNavbarPaths.includes(location.pathname) && <Navbar />}
      <Routes>
        {/* Ruta raíz redirige a login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Rutas públicas */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/crear_usuario" element={<CrearUsuarioPage />} />

        {/* Rutas protegidas */}
        <Route 
          path="/dispositivos" 
          element={
            <PrivateRoute>
              <DetectarDispositivosPage />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/auditorias" 
          element={
            <PrivateRoute>
              <AuditoriasPage />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/historial_dispositivos" 
          element={
            <PrivateRoute>
              <HistorialDispositivosPage />
            </PrivateRoute>
          } 
        />
         <Route 
          path="/cuenta" 
          element={
            <PrivateRoute>
              <MiCuentaPage />
            </PrivateRoute>
          } 
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuditoriaProvider>
        <AppContent />
      </AuditoriaProvider>
    </Router>
  );
}

export default App;

