import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Modal from "react-modal";
import Footer from "../../utils/Footer/index.jsx";
import Header from "../../utils/Header/index.jsx";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
//import TarjetaContacto from "./tarjetaContacto/TarjetaContacto.jsx";
import "./verDetalle.css";
import TarjetaDescripcion from "./tarjetaDescripcion/tarjetaDescripcion.jsx";
import TarjetaCompra from "./tarjetaComprar/TarjetaCompra.jsx";
import Comentario from "./comentario/Index.jsx";

// Esta línea es necesaria para la accesibilidad del modal
Modal.setAppElement("#root");

const VerDetalle = () => {
  const location = useLocation();
  const paquete = location.state;

  if (!paquete) {
    return <div>No se ha proporcionado un paquete para ver detalles.</div>;
  }

  // Desestructuración de las propiedades del paquete
  const {
    imagenes,
    info_paquete: { hotel_info },
  } = paquete;

  const { nombre_hotel } = hotel_info;

  // Convertir cadena de imágenes en array y construir las URLs
  const imagesArray = imagenes
    ? imagenes.substring(1, imagenes.length - 1).split(",")
    : [];
  const VITE_PATH_IMAGES = import.meta.env.VITE_PATH_IMAGES;
  const imageGalleryItems = imagesArray.map((image) => ({
    original: `${VITE_PATH_IMAGES}${image.trim()}`,
  }));

  return (
    <div className="">
      <div className="header">
        <Header />
        <div className="detalle mt-3 mx-auto" style={{width:"90%", alignItems:'center'}} >
        <h1 className="mx-auto mt-2 w-75">{nombre_hotel}</h1>
        <div className="d-flex justify-content-center mt-2 mx-auto verDetalleContainer w-100">
          <div className="galeria-container" >
            <ImageGallery items={imageGalleryItems} />
          </div>
          <div className="tarjeta-compra-container ms-2 ">
            <TarjetaCompra paquete={paquete} />
          </div>
        </div>
        <div className="d-flex justify-content-center mx-auto tarjeta-descripcion-container mt-3 ">
          <TarjetaDescripcion />
          </div>
          <Comentario        
           usuario="matias chuope"
           texto="¡Wow! No puedo dejar de expresar lo encantado que estoy con este increíble paquete de vuelo. Desde el momento en que comencé a explorar las opciones hasta la reserva del vuelo, la experiencia fue simplemente excepcional.

           La selección de vuelos fue variada y se adaptaba perfectamente a mis necesidades de viaje. La información detallada sobre las ciudades de origen y destino, las fechas de ida y vuelta, así como la cantidad de personas, hizo que la planificación fuera muy fácil y conveniente."
           imagenPerfil="https://www.mundodeportivo.com/alfabeta/hero/2023/06/crash-bandicoot.1686205719.5438.jpg?width=1200&aspect_ratio=16:9"
           valoracion={4}
         />
   
         <Comentario
           usuario="Nicolas777"
           texto="Muy útil. Gracias por compartir."
           imagenPerfil="https://playcontestofchampions.com/wp-content/uploads/2021/11/champion-spider-man-morales-720x720.jpg"
           valoracion={5}
         />
   
         <Comentario
           usuario="Coni72"
           texto="Interesante perspectiva. Estoy de acuerdo."
           imagenPerfil="https://i0.wp.com/ellibero.s3.amazonaws.com/nuevoellibero/wp-content/uploads/2023/11/cubanas.jpg?fit=720%2C720&ssl=1"
           valoracion={4}
           />
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default VerDetalle;
