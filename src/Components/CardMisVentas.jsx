import React from 'react'
import '../Styles/CardMisVentas.css'

const CardMisVentas = ({infoVenta}) => {


  const fechaFormatted = new Date(infoVenta.fecha).toLocaleDateString()

  return (
    <div className='CardVentas'>
        <div className='left-mis-vetas'>
          <img className = 'imagen-mis-ventas' src={`http://localhost:3500/api/images/${infoVenta.imagen}`} alt="" />
          <hr className='barra-mis-ventas'/>
          <div className='medio-mis-ventas'>
            <p>Nombre: {infoVenta.nombreProd}</p>
            <p>Descripcion: {infoVenta.descripcionProd}</p>
          </div>
        </div>
        <div className='right-mis-vetas'>
          <hr className='barra-mis-ventas'/>
          <div>
            <p>Fecha: {fechaFormatted}</p>
            <p>Comprador: ???</p>
            <p>Estado: DROPDOWN MENU</p>
          </div>
        </div>
    </div>
  )
}

export default CardMisVentas