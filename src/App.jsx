import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// --- Importar Componentes ---
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ChatBot from './components/ChatBot.jsx'; // 1. Se importa el ChatBot
import Cursos from "./components/Cursos";
// --- Importar Páginas ---
import Inicio from './pages/Inicio.jsx';
import SobreMi from './pages/SobreMi.jsx';
import Proyectos from './pages/Proyectos.jsx';
import Contacto from './pages/Contacto.jsx';
import DetalleProyecto from './pages/DetalleProyecto.jsx';
import NotFound from './pages/NotFound.jsx';

function App() {
  return (
    <Router>
      {/* Contenedor principal para la estructura visual (Navbar, Main, Footer) */}
      <div className="flex flex-col min-h-screen"> 
        <Navbar />
        
        {/* El <main> crece para ocupar el espacio disponible */}
        <main className="flex-grow"> 
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/sobre-mi" element={<SobreMi />} />
            <Route path="/proyectos" element={<Proyectos />} />
            <Route path="/proyectos/:slug" element={<DetalleProyecto />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/cursos" element={<Cursos />} />
            
          </Routes>
        </main>
        
        <Footer />
      </div>

      {/* 2. Se agrega el ChatBot aquí */}
      {/* Se coloca fuera del 'div' principal para que su posición fija no afecte al layout */}
      <ChatBot />
    </Router>
  );
}

export default App;