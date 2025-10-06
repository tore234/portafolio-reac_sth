import React from 'react';
import { useParams } from 'react-router-dom';

// 1. El nombre de la función del componente
const DetalleProyecto = () => {
  const { slug } = useParams();

  return (
    <div>
      <h1>Detalle del Proyecto</h1>
      <p>Mostrando el proyecto: {slug}</p>
    </div>
  );
};

// 2. La línea de exportación que te falta
export default DetalleProyecto;