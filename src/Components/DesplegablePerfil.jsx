import React from 'react'
import '../Styles/DesplegablePerfil.css'
import { useNavigate } from 'react-router-dom'

const DesplegablePerfil = () => {

    const navigate = useNavigate()

  return (
    <div className='desplegable-box-perfil'>
        <ul className='desplegable-lista-perfil'>
            <li onClick={() => {navigate('/perfil')}}>Mi Perfil</li>
            <li onClick={() => {navigate('/misventas')}}>Mis Ventas</li>
            <li onClick={() => {navigate('/miscompras')}}>Mis Compras</li>
            <li>Recomendaciones</li>
            <li onClick={() => {navigate('/soporte')}}>Soporte</li>
            <li className='publicar-desplegable' onClick={() => {navigate('/publicar')}}>Publicar</li>
        </ul>

    </div>
  )
}

export default DesplegablePerfil