import React from 'react'
import '../Styles/CardMisCompras.css'
import ImagenLogin from '../assets/ImagenLogin.jpg'
import { FaTrash } from "react-icons/fa";
import { BACK_ENDPOINT } from "../../../config.js"

const CardMisCompras = ({infoCompra}) => {

  const fechaFormatted = new Date(infoCompra.fecha).toLocaleDateString()

  return (
    <div className='CardVentas'>
        <div className='left-mis-vetas'>
          <img className = 'imagen-mis-ventas' src={`${BACK_ENDPOINT}/api/images/${infoCompra.imagen}`} alt="" />
          <hr className='barra-mis-ventas-left'/>
          <div className='medio-mis-ventas'>
            <p className='nombre-mis-ventas'>Nombre: {infoCompra.nombreProd}</p>
            <p>Descripción: {infoCompra.descripcionProd}</p>
            <p>Precio: ${infoCompra.precio}</p>
          </div>
        </div>
        <div className='right-mis-vetas'>
          <hr className='barra-mis-ventas-right'/>
          <div>
            <p>Fecha: {fechaFormatted}</p>
            <p>Vendedor: {infoCompra.email}</p>
            <p>Estado: {infoCompra.estado == "vendido" ? "comprado" : infoCompra.estado}</p>
          </div>
        </div>
        <p className='trash-mis-ventas'><FaTrash/></p>
    </div>
  )
}

export default CardMisCompras