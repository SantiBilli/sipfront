import React from 'react'
import '../Styles/Perfil.css'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import perfil from '../assets/perfil.jpg'

const Perfil = () => {
  return (
    <div>
        <Header/>
        <div className='box-perfil'>
            <div className="left-perfil">
                <img className = 'perfil-pic' src={perfil} alt="" />
                <p>Nombre Usuario</p>
            </div>
            <hr className='barra-perfil'/>
            <div className="right-perfil">
                <div className='datos-usuario'>
                    <h3>Datos de usuario</h3>
                    <p>Email: mail@</p>
                    <p>Nombre: nombre</p>
                    <p>Apellido: apellido</p>
                    <p>Compleaños: cumple</p>
                </div>
                <div className='Seguridad'>
                    <h3>Seguridad:</h3>
                    <a href="#">Cambiar Contraseña</a>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default Perfil