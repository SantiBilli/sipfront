import React from 'react'
import '../Styles/MisCompras.css'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import CardMisVentas from '../Components/CardMisVentas'
import CardMisCompras from '../Components/CardMisCompras'
import { IoMdCart } from "react-icons/io";

const MisCompras = () => {
  return (
    <>
    <Header/>
    <h2 className='titulo-mis-ventas'>Mis Compras <IoMdCart/></h2>
    <div className='boxMisVentas'>
        <div className='box-cart-mis-ventas'>
          <CardMisCompras/>
          <CardMisCompras/>
          <CardMisCompras/>
          <CardMisCompras/>
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

export default MisCompras