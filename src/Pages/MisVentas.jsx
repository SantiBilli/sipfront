import React, { useEffect, useState } from 'react'
import '../Styles/MisVentas.css'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import CardMisVentas from '../Components/CardMisVentas'
import { IoMdCart } from "react-icons/io";
import { useNavigate } from 'react-router-dom'
import { sendToken } from '../utils/api/checkToken'
import { obtainVentas } from '../utils/api/obtainVentas'

const MisVentas = () => {
  
  const navigate = useNavigate()

  const [arrVentas, setArrVentas] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('userToken')
    if (!token) return navigate("/login")
    
    const sendTokenToServer = async () => {
      const response = await sendToken(token)
      if (response == false) return navigate('/login')
    }

    const obtenerVentas = async () => {
      const ventas = await obtainVentas()

      setArrVentas(ventas)
    } 

    obtenerVentas()
    sendTokenToServer()
    },[])

  return (
    <>
    <Header/>
    <h2 className='titulo-mis-ventas'>Mis Ventas <IoMdCart/></h2>
    <div className='boxMisVentas'>
        <div className='box-cart-mis-ventas'>
          {
          arrVentas.map((venta) => (
            <CardMisVentas key={venta.postId} infoVenta={venta}/>
          ))
          }
        </div>
        <hr className='barra-mis-ventas-box'/>
        <div className='mis-ventas-box-right'>
          <p>Estadisticas:</p>
          <hr className='barra-mis-ventas-box-right'/>
          <p>Ventas Totales: 10</p>
          <p>Total Recaudado: $5000</p>
        </div>
    </div>
    <Footer/>
    </>
  )
}

export default MisVentas