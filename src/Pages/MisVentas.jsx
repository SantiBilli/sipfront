import React, { useEffect, useState } from 'react'
import '../Styles/MisVentas.css'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import CardMisVentas from '../Components/CardMisVentas'
import { IoMdCart } from "react-icons/io";
import { useNavigate } from 'react-router-dom'
import { sendToken } from '../utils/api/checkToken'
import { obtainVentas } from '../utils/api/obtainVentas'
import { setRef } from '@mui/material'

const MisVentas = () => {
  
  const navigate = useNavigate()
  const [arrVentas, setArrVentas] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [publicados, setPublicados] = useState("")
  const [reservados, setReservados] = useState("");
  const [ventas, setVentas] = useState("");
  const [recaudado, setRecaudado] = useState(0);


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

        setArrVentas(ventas)

        setRefresh(!refresh)
      } 

      obtenerVentas()

      setPublicados(arrVentas.length > 0 ? [...arrVentas].filter(venta => venta.estado == "publicado").length : 0)
      setReservados(arrVentas.length > 0 ? [...arrVentas].filter(venta => venta.estado == "reservado").length : 0)
      setVentas(arrVentas.length > 0 ? [...arrVentas].filter(venta => venta.estado == "vendido").length : 0)

      setRecaudado(arrVentas.length > 0 ? [...arrVentas].filter(venta => venta.estado == "vendido").map(venta => venta.precio).reduce((a, b) => Number(a) + Number(b), 0) : 0)

    }, [refresh])

  return (
    <>
    <Header/>
    <h2 className='titulo-mis-ventas'>Mis Publicaciones <IoMdCart/></h2>
    <div className='boxMisVentas'>
        <div className='box-cart-mis-ventas'>
          { arrVentas.length > 0 &&
          arrVentas.map((venta) => (
            <CardMisVentas key={venta.postId} infoVenta={venta} setRefreshAux={setRefresh}/>
          ))
          }
        </div>
        <hr className='barra-mis-ventas-box'/>
        <div className='mis-ventas-box-right'>
          <p>Estadisticas:</p>
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