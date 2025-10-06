import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Para obtener el año actual dinámicamente

  return (
    <footer className="bg-gray-900 text-slate-400 py-6 text-center border-t border-sky-500/50 mt-12">
      <div className="max-w-6xl mx-auto px-4">
        <p className="text-sm">
          Desarrollado con ❤️ por <a href="https://github.com/tore234" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">Salvador Trenado</a>.
        </p>
        <p className="text-sm mt-1">
          &copy; {currentYear} Todos los derechos reservados.
        </p>
        {/* Aquí puedes añadir más enlaces o información */}
        {/* <div className="mt-4 flex justify-center space-x-4">
          <a href="/politica-de-privacidad" className="text-slate-400 hover:text-sky-400 text-xs">Política de Privacidad</a>
          <a href="/terminos-de-servicio" className="text-slate-400 hover:text-sky-400 text-xs">Términos de Servicio</a>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;