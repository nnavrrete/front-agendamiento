// tarjetaDescripcion.jsx

import 'bootstrap/dist/css/bootstrap.min.css';
import "./tarjetaDescripcion.css"
import { useLocation } from "react-router-dom";
import { BsFillBuildingFill } from 'react-icons/bs';
import {  FaPlaneDeparture } from 'react-icons/fa';

const tarjetaDescripcion = () => {
  const location = useLocation();
  const paquete = location.state;

  if (!paquete) {
    return <div>No se ha proporcionado un paquete para ver detalles.</div>;
  }

  const {
    nombre,
    nombre_ciudad_origen,
    nombre_ciudad_destino,
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
    <div className="tarjeta-resumen">
      <div className="seccion">
        <h1>Alojamiento <BsFillBuildingFill/></h1>
        <p>{nombre_hotel}, {direccion_hotel}</p>
        <p>{`Estadia: ${diferenciaEnDias} días y ${diferenciaEnDias - 1} noches `}</p>
        <p className="icono-texto">{`Telefono: ${telefono_hotel}`}</p>
        <p className="icono-texto">{`Web: ${sitio_web_hotel}`}</p>
        <p className="icono-texto">{`Correo: ${correo_electronico_hotel}`}</p>
      </div>
      <div className="seccion transicion">
        <img src="/logo.png" alt="logo" className="logo" />
      </div>
      <div className="seccion">
        <h1>Vuelo <FaPlaneDeparture/></h1>
        <p>{`Origen: ${nombre_ciudad_origen}`}</p>
        <p>{`Destino: ${nombre_ciudad_destino}`}</p>
        <p>{`Fecha de ida: ${fechainit}`}</p>
        <p>{`Fecha de vuelta: ${fechafin}`}</p>
        <p>{`Cantidad de personas: ${total_personas} personas`}</p>
      </div>
    </div>
  );
};

export default tarjetaDescripcion;
