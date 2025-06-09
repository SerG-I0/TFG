
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DispositivosPage from './pages/DispositivosPage';
import AuditoriasPage from './pages/AuditoriasPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DispositivosPage />} />
        <Route path="/auditorias" element={<AuditoriasPage />} />
      </Routes>
    </Router>
  );
}

export default App;