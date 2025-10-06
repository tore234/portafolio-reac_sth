import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Estilo para el enlace activo
  const activeLinkStyle = {
    color: '#38bdf8', // Color sky-400 de Tailwind
    textShadow: '0 0 5px #38bdf8',
  };

  const navLinks = [
    { to: '/', text: 'Inicio' },
    { to: '/sobre-mi', text: 'Sobre Mí' },
    { to: '/proyectos', text: 'Proyectos' },
    { to: '/contacto', text: 'Contacto' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gray-900/80 backdrop-blur-lg border-b border-sky-500 shadow-md">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Este Link lleva a la página de inicio (Mi Portafolio) */}
        <Link to="/" className="font-bold text-xl text-sky-400">
          Mi Portafolio
        </Link>

        {/* Menú de escritorio */}
        <div className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to} // <-- Esto es lo que hace que cada enlace vaya a su ruta
              style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
              className="text-slate-200 hover:text-sky-400 transition-colors"
            >
              {link.text} {/* <-- Este es el texto visible del enlace */}
            </NavLink>
          ))}
        </div>

        {/* Botón de hamburguesa para móviles */}
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Abrir menú">
            {isOpen ? <X className="text-sky-400" /> : <Menu className="text-sky-400" />}
          </button>
        </div>
      </nav>

      {/* Menú desplegable para móviles con animación */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gray-900/90 border-t border-sky-500/50"
          >
            <div className="flex flex-col items-center py-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to} // <-- También aquí, los enlaces móviles van a su ruta
                  onClick={toggleMenu} // Cierra el menú al hacer clic en un enlace
                  style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
                  className="text-slate-200 py-2 hover:text-sky-400 transition-colors"
                >
                  {link.text}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;