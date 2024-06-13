import React from 'react'
import '../Styles/CardMisCompras.css'
import ImagenLogin from '../assets/ImagenLogin.jpg'

const CardMisVentas = () => {
  return (
    <div className='CardVentas'>
        <div className='left-mis-vetas'>
          <img className = 'imagen-mis-ventas' src={ImagenLogin} alt="" />
          <hr className='barra-mis-ventas'/>
          <div className='medio-mis-ventas'>
            <p>Nombre: Libro De Los Arboles</p>
            <p>Descripcion: </p>
          </div>
        </div>
        <div className='right-mis-vetas'>
          <hr className='barra-mis-ventas'/>
          <div>
            <p>Fecha: Igna</p>
            <p>Comprador: Igna</p>
            <p>Estado: Vendido</p>
          </div>
        </div>
    </div>
  )
}

export default CardMisVentas