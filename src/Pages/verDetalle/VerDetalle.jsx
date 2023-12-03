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
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default VerDetalle;
