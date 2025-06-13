import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import DispositivosPage from './pages/DispositivosPage';
import AuditoriasPage from './pages/AuditoriasPage';
import LoginPage from './pages/LoginPage';
import CrearUsuario from './components/CrearUsuario';

function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/dispositivos">Dispositivos</Link></li>
        <li><Link to="/auditorias">Auditorías</Link></li>
      </ul>
    </nav>
  )
}

function AppContent() {
  const location = useLocation();

  // No mostrar navbar en login ni en crear usuario
  const noNavbarPaths = ['/login', '/crear_usuario'];

  return (
    <div>
      {!noNavbarPaths.includes(location.pathname) && <Navbar />}
      <Routes>
        {/* Redirigir "/" a "/login" para que no haya confusión */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/crear_usuario" element={<CrearUsuario />} />
        <Route path="/dispositivos" element={<DispositivosPage />} />
        <Route path="/auditorias" element={<AuditoriasPage />} />
      </Routes>
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App;
