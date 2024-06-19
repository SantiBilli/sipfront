import React from 'react'
import '../Styles/CardMisCompras.css'
import ImagenLogin from '../assets/ImagenLogin.jpg'

const CardMisCompras = ({infoCompra}) => {
  
  const fechaFormatted = new Date(infoCompra.fecha).toLocaleDateString()

  return (
    <div className='CardVentas'>
        <div className='left-mis-vetas'>
          <img className = 'imagen-mis-ventas' src={`http://localhost:3500/api/images/${infoCompra.imagen}`} alt="" />
          <hr className='barra-mis-ventas'/>
          <div className='medio-mis-ventas'>
            <p>Nombre: {infoCompra.nombreProd}</p>
            <p>Descripción: {infoCompra.descripcionProd}</p>
            <p>Precio: ${infoCompra.precio}</p>
          </div>
        </div>
        <div className='right-mis-vetas'>
          <hr className='barra-mis-ventas'/>
          <div>
            <p>Fecha: {fechaFormatted}</p>
            <p>Vendedor: {infoCompra.email}</p>
            <p>Estado: {infoCompra.estado == "vendido" ? "comprado" : infoCompra.estado}</p>
          </div>
        </div>
    </div>
  )
}

export default CardMisCompras