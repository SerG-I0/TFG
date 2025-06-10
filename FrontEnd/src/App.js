// src/App.js
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DispositivosPage from './pages/DispositivosPage';
import AuditoriasPage from './pages/AuditoriasPage'; // Otra página de ejemplo

function App() {
  return (
    <Router>
      <div>
        {/* Barra de navegación */}
        <nav>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/dispositivos">Dispositivos</Link></li>
            <li><Link to="/auditorias">Auditorías</Link></li>
          </ul>
        </nav>

        {/* Definición de rutas */}
        <Routes>
          <Route path="/" element={<h1>Bienvenido</h1>} />
          <Route path="/dispositivos" element={<DispositivosPage />} />
          <Route path="/auditorias" element={<AuditoriasPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
