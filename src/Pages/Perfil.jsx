import React, { useEffect, useState } from 'react'
import '../Styles/Perfil.css'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import perfil from '../assets/perfil.jpg'
import { useNavigate } from 'react-router-dom'
import { sendToken } from '../utils/api/checkToken'
import { obtenerDatosPerfil } from '../utils/api/obtenerDatos'
import { fotoPerfil } from '../utils/api/fotoPerfil'

const Perfil = () => {

    const navigate = useNavigate()
    const [email, setEmail] = useState();
    const [nombre, setNombre] = useState();
    const [apellido, setApellido] = useState();
    const [telefono, setTelefono] = useState();
    const [imagen, setImagen] = useState(null)
    const [imagenCargar, setImagenCargar] = useState(null)


    useEffect(() => {
        const token = localStorage.getItem('userToken')
        if (!token) return navigate("/login")
        
        const sendTokenToServer = async () => {
          const response = await sendToken(token)
          if (response == false) return navigate('/login')
        }

        const obtenerDatos = async () => {
            const response = await obtenerDatosPerfil()

            if (response == 204) return console.log("Error al obtener los datos");

            setEmail(response.email)
            setNombre(response.nombre)
            setApellido(response.apellido)
            setTelefono(response.telefono)
            setImagen(response.pfp)

            // console.log(response.pfp);

            return
        }

        sendTokenToServer()
        obtenerDatos()
        },[])

    const handleClick = async (value) => {

        setImagen(value.name)

        const formdata = new FormData();
        formdata.append('imagen', value)

        const response = await fotoPerfil(formdata)

        setImagen(response.imagen)

        if (response == 204) return console.log("Error al Cargar PFP");
    }

    return (
        <div>
            <Header/>
            <div className='box-perfil'>
                <div className="left-perfil">
                    <img className = 'perfil-pic' src={ (imagen != null) ? `http://localhost:3500/api/pfp/${imagen}` : perfil} alt="" />
                    <div className='input-perfil'>
                        <input type="file" required accept="image/png" onChange={(event) => handleClick(event.target.files[0])}/>
                    </div>
                </div>
                <hr className='barra-perfil'/>
                <div className="right-perfil">
                    <div className='datos-usuario'>
                        <h3>Datos de usuario</h3>
                        <p>Email: {email}</p>
                        <p>Nombre: {nombre}</p>
                        <p>Apellido: {apellido}</p>
                        <p>Telefono: {telefono}</p>
                    </div>
                    <div className='Seguridad'>
                        <h3>Seguridad:</h3>
                        <a href="#" onClick={() => navigate('/olvidastecontra')}>Cambiar Contraseña</a>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Perfil