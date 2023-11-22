import React from 'react';
import "./TarjetaPersona.css";

const TarjetaPersona = ({ imagen, nombre, grupo, rol }) => (
  <div className="tarjeta">
    <img src={imagen} alt={nombre} />
    <h3 >{nombre}</h3>
    <p>{rol}</p>
  </div>
);

export default TarjetaPersona;