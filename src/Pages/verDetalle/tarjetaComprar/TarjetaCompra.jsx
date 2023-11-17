import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './TarjetaCompra.css';

const TarjetaCompra = () => {
    const location = useLocation();
    const paquete = location.state;
  

  
    if (!paquete) {
        return <div>No se ha proporcionado un paquete para ver detalles.</div>;
    }

    const { nombre, precio_vuelo, precio_noche } = paquete;

    return (
        <div className="tarjeta-compra w-100 me-5 h-100 ">
            <h2>{nombre}</h2>
            <p>Precio por vuelo: ${precio_vuelo}</p>
            <p>Precio por noche: ${precio_noche}</p>
            <div className=" d-flex w-100 justify-content-end align-items-end" >
            <button  className="comprar-button">Comprar</button>
            </div>
        </div>
    );
};

export default TarjetaCompra;
