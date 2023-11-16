// VerPaquetes.jsx (sin el filtro de servicios)

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner';
import { getPaquetes, getPaquetesMes, agregarVista } from '../../api';
import { useNavigate } from 'react-router-dom';
import { Collapse, Modal, Button } from 'react-bootstrap';
import { MesString } from '../../Components/utils';

import BuscaViaje from '../../Components/buscaViaje/BuscaViaje';
import ListaPaquetes from '../../Components/listaPaquetes/ListaPaquetes';
import BotonOrdener from '../../Components/botonOrdenar/SortBy';
import Header from '../../utils/Header';
import Footer from '../../utils/Footer';
import Filtros from '../../Components/Filtros';
import NoPaquetesDisp from '../../Components/NoPaquetesDisp';

import './VerPaquetes.css';
import { BsSearch } from "react-icons/bs";

const VerPaquetes = () => {
  const location = useLocation();
  const data = location.state;
  const respuesta = data.respuesta;
  const aeropuertos = data.aeropuertos;
  const [paquetes, setPaquetes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [paquetesFiltrados, setPaquetesFiltrados] = useState([]);
  const [anchoPantalla, setAnchoPantalla] = useState(window.innerWidth);
  const [isCollapseOpen, setIsCollapseOpen] = useState(false);

  useEffect(() => {
    const actualizarAnchoDePantalla = () => {
      setAnchoPantalla(window.innerWidth);
    };

    window.addEventListener('resize', actualizarAnchoDePantalla);

    return () => {
      window.removeEventListener('resize', actualizarAnchoDePantalla);
    };
  }, []);


  const handleToggleCollapse = () => {
    setIsCollapseOpen(!isCollapseOpen);
  };


  const filtrarPaquetes = (stars, selectedServices) => {
    const paquetesFiltrados = paquetes.filter((paquete) => {
      const cumpleValoracion = stars === '' || Math.round(paquete.info_paquete.hotel_info.valoracion_hotel) === Math.round(stars);
      const cumpleServicios = selectedServices.length === 0 || selectedServices.every((service) => paquete.info_paquete.servicios_habitacion.includes(service));
      return cumpleValoracion && cumpleServicios;
    });

    setPaquetesFiltrados(paquetesFiltrados);
  };


  const initialValues = {
    origen: respuesta.origen_id,
    destino: respuesta.destino_id,
    fecha: {
      tipo: respuesta.mes ? 'mes' : 'rango',
      fechaInicio: respuesta.mes ? null : respuesta.fechaInit,
      fechaFin: respuesta.mes ? null : respuesta.fechaFin,
      mes: respuesta.mes || null,
    },
    pasajeros: respuesta.personas,
    valoracion: respuesta.valoracion_hotel,
  };

  const handleBuscarViaje = (respuesta) => {
    
    const dataForNavigate = {
      respuesta,
      aeropuertos
    }
    navigate('/ver-paquetes', { state: dataForNavigate });
  };

  const handleComprar = (paquete) => {
    agregarVista({ fk_fechaPaquete: paquete.id })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error(error);
      });

    navigate('/detalle', { state: paquete });
  }

  useEffect(() => {
    const fetchPaquetes = async () => {
      try {
        setLoading(true);
        setError(null);

        let data;
        if (respuesta.mes) {
          data = await getPaquetesMes(respuesta);
        } else {
          data = await getPaquetes(respuesta);
        }
        setPaquetes(data);
        setPaquetesFiltrados(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (respuesta) {
      fetchPaquetes();
    }
  }, [respuesta]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!paquetes || paquetes.length === 0) {
    return (
      <div>
        <Header /> {/* Mostrar el encabezado */}
        <div className='contenedor-buscador'>
          <BuscaViaje
            aeropuertos={aeropuertos}
            onSubmit={handleBuscarViaje}
            initialValues={initialValues}
            className={"BuscaViajeVerPaquetes_"}
          />
        </div>
        <NoPaquetesDisp onNewSearch={filtrarPaquetes} showFilterButton={false} showFilterMessage={false}/> {/* Mostrar el mensaje de NoPaquetesDisp */}
        <Footer /> {/* Mostrar el pie de página */}
      </div>
    );
  }

  const placeholder = {
    origen: ` ${paquetes[0].nombre_ciudad_origen}`,
    destino: ` ${paquetes[0].nombre_ciudad_destino}`,
    calendario: respuesta.mes ? `Mes: ${MesString(respuesta.mes)}` : `${respuesta.fechaInit} - ${respuesta.fechaFin}`,
    pasajeros: `Pasajeros: ${respuesta.personas}`
  };





  return (
    <>
      <Header />

      <div className="BuscaViajeVerPaquetes">
        <div className='w-100'>
          {anchoPantalla < 768 ? (
            <>
              <Button
                variant="primary"
                onClick={handleToggleCollapse}
                className="w-100"
              >
                <BsSearch />
              </Button>
              <Collapse in={isCollapseOpen && anchoPantalla < 768}>
                <div>
                  <BuscaViaje
                    aeropuertos={aeropuertos}
                    placeholder={placeholder}
                    onSubmit={handleBuscarViaje}
                    initialValues={initialValues}
                    className={'VerPaquetes__Header'}
                  />
                </div>
              </Collapse>
            </>
          ) :

            <BuscaViaje
              aeropuertos={aeropuertos}
              placeholder={placeholder}
              onSubmit={handleBuscarViaje}
              initialValues={initialValues}
              className={'VerPaquetes__Header'}
            />
          }
        </div>
      </div>

      <div className="VerListaPaquetes">
        {paquetesFiltrados.length === 0 ? ( // Comprueba si no hay paquetes disponibles
          <NoPaquetesDisp onNewSearch={filtrarPaquetes} showFilterButton={true} showFilterMessage={true}/> // Muestra el mensaje cuando no hay paquetes
        ) : (
          <div className="col-md-12 mx-5 mr-5 mt-2 pl-5 ">
            <div className="Botones" >
              <BotonOrdener paquetes={paquetes} setPackages={setPaquetes} />
              <button type='button' className='btn' onClick={() => setShowModal(true)}>Filtros</button>
            </div>
          </div>
        )}
        {paquetesFiltrados.length > 0 && ( // Solo muestra la lista de paquetes si hay paquetes disponibles
          <ListaPaquetes
            paquetes={paquetesFiltrados}
            onBuy={handleComprar}
          />
        )}
      </div>
      <Footer />
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Body>
          <Filtros filtrarPaquetes={filtrarPaquetes} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default VerPaquetes;
