import React, { useEffect, useState } from 'react';
import { getAeropuertos, getUbicacion, getOfertas ,agregarVista, getMasvistos } from '../../api';
import BuscaViaje from '../../Components/buscaViaje/BuscaViaje';
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate desde react-router-dom
import Carrusel from './carruseloferta'
import carruselGeneral from './carrruselGeneral'


import './Home.css';
import Footer from '../../utils/Footer';
import Header from '../../utils/Header';

const Home = () => {
    const [aeropuertos, setAeropuertos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [paquetesOfertas, setPaquetesOfertas]= useState([])
    const [MasVistosState, setMasVistos] = useState([]);
    const [ubicacion, setUbicacion]= useState({Ciudad:''})
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Obtén la función de navegación

    useEffect(() => {
        const fetchAeropuertos = async () => {
            try {
                const data = await getAeropuertos();
                setAeropuertos(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchAeropuertos();
    }, []);

    useEffect(() => {
      const fetchUbicacion = async () => {
          try {
              const data = await getUbicacion();
              setUbicacion({ Ciudad: data.cityName });
          } catch (error) {
                setError(error);
           } finally {
               setLoading(false);
            }
        };

         fetchUbicacion();
    }, []);
  console.log(ubicacion)


    useEffect(() => {
        const fetchOfertas = async () => {
            try {
                const data = await getOfertas(ubicacion);
                setPaquetesOfertas(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchOfertas();
    }, [ubicacion]);


    // useEffect(() => {
    //     const fetchMasVistos = async () => {
    //         try {
    //             const data = await getMasvistos(ubicacion);
    //             setMasVistos(data);
    //         } catch (error) {
    //             setError(error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    
    //     fetchMasVistos();
    // }, [ubicacion]);

    console.log(MasVistosState)

    const handleBuscarViaje = (respuesta) => {
        console.log(respuesta);
        const dataForNavigate = {
            respuesta,
            aeropuertos
        }
        navigate('/ver-paquetes', { state: dataForNavigate }); // Navega a la página "/ver-paquetes" con el objeto respuesta
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    const handleComprar = (paquete) => {
        // Log the package id
        // console.log(paquete.id);

        // Call the agregarVista function with the package id
        agregarVista({ fk_fechaPaquete: paquete.id })
            .then(response => {
                // Handle the response if needed
                // console.log(response);
            })
            .catch(error => {
                // Handle errors
                console.error(error);
            });

        // Navigate to the '/detalle' route with the package details
        navigate('/detalle', { state: paquete });
    }

    return (
        <div className="Home">
            <Header />
            <div className="Contenedor">
                
                <h1 className="Titulo">¡Busca tu viaje ahora!</h1>
                <BuscaViaje
                    aeropuertos={aeropuertos}
                    onSubmit={handleBuscarViaje}
                />
            </div>
            <div className="carrusel">
            
                {paquetesOfertas != null ? (
                    <div className=''>
                       <div className= " d-flex mt-4 mb-2 me-5 w-25 justify-content-end "><h1 className='text-end'>Ofertas</h1></div> 
                        <Carrusel paquetes={paquetesOfertas} handleBuy = {handleComprar} />
                   </div>
                    
                ) : (
                    <div className="d-flex align-items-center  justify-content-center">
             <div className="mt-5 align-items-center w-50 ">
              <h4 className='ms-4'>No se encontraron paquetes en tu ubicación 😒</h4>
            </div>
           <div className="d-flex">
        <img src="/error.png" alt="yamsha" className="img-fluid" style={{ maxWidth: '60vh' }} />
       </div>
       </div>
  
                )}
            </div>

            <footer>
                <Footer/>
            </footer>

        </div>
        
    );
};

export default Home;
