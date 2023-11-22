import React from 'react';
import "./TarjetaPersona.css";

const TarjetaPersona = ({ imagen, nombre, grupo, rol }) => {
  const imagenPorDefecto = 'src/assets/Equipo-img/default.jpg';

  // Verificar si la imagen está presente o cargar la imagen por defecto
  const imagenSrc = imagen || imagenPorDefecto;

  return (
    <div className="tarjeta">
      <img src={imagenSrc} alt={nombre} />
      <h3>{nombre}</h3>
      <p>{rol}</p>
    </div>
  );
};

export default TarjetaPersona;
