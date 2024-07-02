import React, { useEffect, useState } from 'react'
import '../Styles/MisCompras.css'
import Footer from '../Components/Footer'
import CardMisCompras from '../Components/CardMisCompras'
import { IoMdCart } from "react-icons/io";
import { useNavigate } from 'react-router-dom'
import { sendToken } from '../utils/api/checkToken'
import { obtainCompras } from '../utils/api/obtainCompras'
import Header2 from '../Components/Header2'
import FiltroEstadosCompras from '../Components/FiltroEstadosCompras'

const MisCompras = () => {
  
  const navigate = useNavigate()
  const [arrVentas, setArrVentas] = useState([]);
  const [comprasTotales, setComprasTotales] = useState("");
  const [gastado, setGastado] = useState(0);

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
        const ventas = await obtainCompras()

        if (ventas == 204) return

        setArrVentas(ventas)
      } 

      obtenerVentas()
    }, [])

    useEffect(() => {

      setComprasTotales(arrVentas.length > 0 ? [...arrVentas].filter(venta => venta.estado == "vendido").length : 0)
      setGastado(arrVentas.length > 0 ? [...arrVentas].filter(venta => venta.estado == "vendido").map(venta => venta.precio).reduce((a, b) => Number(a) + Number(b), 0) : 0)

    }, [arrVentas])

    useEffect(() => {
      const filtered = arrVentas.filter(producto =>
        producto.nombreProd.toLowerCase().includes(busqueda.toLowerCase())
      );

      setArrBusqueda(filtered);

    }, [busqueda, arrVentas]);

    const handleFiltroChange = (valor) => {

      valor = valor.toLowerCase();
      if (valor == "comprado") valor = "vendido"

      console.log(valor);

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
    {/* <h2 className='titulo-mis-ventas'>Mis Compras <IoMdCart/></h2> */}
    <div className='boxMisVentas'>
        <div className='box-cart-mis-ventas'>
          <div className='box-mis-ventas-estado-titulo'>
            <h2 className='titulo-mis-ventas'>Mis Compras <IoMdCart/></h2>
            <FiltroEstadosCompras handleFiltroChange={handleFiltroChange}/>
          </div>
          {
            publicacionesFiltradas.length > 0 && publicacionesFiltradas.map((venta) => (
              <CardMisCompras key={venta.postId} infoCompra={venta}/>
            ))
          }
        </div>
        <hr className='barra-mis-ventas-box'/>
        <div className='mis-ventas-box-right'>
          <p>Estadisticas:</p>
          <hr className='barra-mis-ventas-box-right'/>
          <p>Compras Totales: {comprasTotales}</p>
          <p>Total: ${gastado}</p>
        </div>
    </div>
    <Footer/>
    </>
  )
}

export default MisCompras