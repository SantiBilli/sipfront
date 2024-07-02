import React, { useEffect, useState, useRef } from 'react'
import '../Styles/MisVentas.css'
import Footer from '../Components/Footer'
import CardMisVentas from '../Components/CardMisVentas'
import { GiOpenBook } from "react-icons/gi";
import { useNavigate } from 'react-router-dom'
import { sendToken } from '../utils/api/checkToken'
import { obtainVentas } from '../utils/api/obtainVentas'
import Header2 from '../Components/Header2'
import FiltroEstados from '../Components/FiltroEstados'


const MisVentas = () => {
  
  const navigate = useNavigate()
  const [arrVentas, setArrVentas] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [publicados, setPublicados] = useState(0)
  const [reservados, setReservados] = useState(0);
  const [ventas, setVentas] = useState(0);
  const [recaudado, setRecaudado] = useState(0);

  const [busqueda, setBusqueda] = useState("")
  const [arrBusqueda, setArrBusqueda] = useState([]);

  const [filtros, setFiltros] = useState({
    estado: []
  });


  useEffect(() => {
    const token = localStorage.getItem('userToken')
    if (!token) return navigate("/login")
    
    const sendTokenToServer = async () => {
      const response = await sendToken(token)
      if (response == false) return navigate('/login')
    }

    sendTokenToServer()
    },[])

    useEffect(() => {

      const obtenerVentas = async () => {
        const ventas = await obtainVentas()

        if (ventas == 204) return

        setArrVentas(ventas)

      } 

      obtenerVentas()

    }, [refresh, busqueda, filtros])

    useEffect(() => {
  
        setPublicados(arrVentas.length > 0 ? [...arrVentas].filter(venta => venta.estado == "publicado").length : 0)
        setReservados(arrVentas.length > 0 ? [...arrVentas].filter(venta => venta.estado == "reservado").length : 0)
        setVentas(arrVentas.length > 0 ? [...arrVentas].filter(venta => venta.estado == "vendido").length : 0)
        setRecaudado(arrVentas.length > 0 ? [...arrVentas].filter(venta => venta.estado == "vendido").map(venta => venta.precio).reduce((a, b) => Number(a) + Number(b), 0) : 0)

    }, [arrVentas])

    useEffect(() => {

      const filtered = arrVentas.filter(producto =>
        producto.nombreProd.toLowerCase().includes(busqueda.toLowerCase())
      );
      
      setArrBusqueda(filtered);

    }, [busqueda, arrVentas]);

    const handleFiltroChange = (valor) => {

      valor = valor.toLowerCase();

      const filtroActual = filtros["estado"]

      const nuevoFiltro = filtroActual.includes(valor)
      ? filtroActual.filter(item => item !== valor)
      : [...filtroActual, valor];

      setFiltros(
        {...filtros, ["estado"]: nuevoFiltro}
      )
    }

    const publicacionesFiltradas = arrBusqueda.filter(publicacion => {
      const filtroEstado = filtros.estado.length === 0 || filtros.estado.includes(publicacion.estado);
      return filtroEstado
    });

  return (
    <>
      <Header2 busqueda={setBusqueda}/>
      {/* <div className='box-mis-ventas-estado-titulo'>
        <h2 className='titulo-mis-ventas'>Mis Publicaciones <IoMdCart/></h2>
        <FiltroEstados/>

      </div> */}
      <div className='boxMisVentas'>
        <div className='box-cart-mis-ventas'>
          <div className='box-mis-ventas-estado-titulo'>
            <h2 className='titulo-mis-ventas'>Mis Publicaciones <GiOpenBook/></h2>
            <FiltroEstados handleFiltroChange={handleFiltroChange}/>
          </div>

            { 
            publicacionesFiltradas.length > 0 && publicacionesFiltradas.map((venta) => (
              <CardMisVentas key={venta.postId} infoVenta={venta} setRefreshAux={setRefresh}/>
            ))
            }
  
        </div>
          <hr className='barra-mis-ventas-box'/>
          <div className='mis-ventas-box-right'>
            <p>Estadísticas:</p>
            <hr className='barra-mis-ventas-box-right'/>
            <p>Publicados: {publicados}</p>
            <p>Reservados: {reservados}</p>
            <p>Ventas Totales: {ventas}</p>
            <p>Total Recaudado: ${recaudado}</p>
          </div>
      </div>
      <Footer/>
    </>
  )
}

export default MisVentas