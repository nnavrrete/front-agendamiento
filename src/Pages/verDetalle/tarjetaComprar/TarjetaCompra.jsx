import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./TarjetaCompra.css";
import { renderServiceIcons, renderStars } from "../../../Components/utils";

const TarjetaCompra = () => {
  const location = useLocation();
  const paquete = location.state;

  if (!paquete) {
    return <div>No se ha proporcionado un paquete para ver detalles.</div>;
  }

  const {
    nombre,
    total_personas,
    descripcion,
    fechainit,
    fechafin,
    detalles,
    precio_vuelo,
    precio_noche,
    imagenes,
    info_paquete: {
      nombre_opcion_hotel,
      descripcion_habitacion,
      servicios_habitacion,
      hotel_info,
    },
  } = paquete;

  const {
    nombre_hotel,
    direccion_hotel,
    valoracion_hotel,
    descripcion_hotel,
    servicios_hotel,
    telefono_hotel,
    correo_electronico_hotel,
    sitio_web_hotel,
  } = hotel_info;

const fechaInicio = new Date(fechainit);
const fechaFin = new Date(fechafin);
const diferenciaEnMilisegundos = fechaFin - fechaInicio;
const diferenciaEnDias = diferenciaEnMilisegundos / (1000 * 60 * 60 * 24);


  return (
    <div className="tarjeta-compra w-100 me-5 h-100 ">
      <h1>{nombre}</h1>
      <p>{descripcion_hotel}</p>
      <p1>{<div className="starsContainer" style={{fontSize:'2rem', marginTop:"-20px"}}>{renderStars(valoracion_hotel)}</div>}</p1>
      <p>{descripcion_habitacion}</p>
      <p>{<div className="servicesContainer "style={{fontSize:'1.5rem'}}>{renderServiceIcons(servicios_habitacion)}<p></p> </div>}</p>
      <h4>{`Final ${total_personas} personas`}</h4>
      <h4> {`$${precio_vuelo * total_personas + precio_noche * diferenciaEnDias}`} </h4>
        <button className="comprar-button">Comprar</button>
      </div>
  );
};

export default TarjetaCompra;
