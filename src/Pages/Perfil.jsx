import React, { useEffect, useState } from 'react'
import '../Styles/Perfil.css'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import { useNavigate } from 'react-router-dom'
import { sendToken } from '../utils/api/checkToken'
import { obtenerDatosPerfil } from '../utils/api/obtenerDatos'
import { fotoPerfil, fotoPerfilReset } from '../utils/api/fotoPerfil'
import { FaPencilAlt } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

const Perfil = () => {

    const navigate = useNavigate()
    const [email, setEmail] = useState();
    const [nombre, setNombre] = useState();
    const [apellido, setApellido] = useState();
    const [telefono, setTelefono] = useState();
    const [imagen, setImagen] = useState(null)

    const [inputNombre, setInputNombre] = useState(false)
    const [inputApellido, setInputApellido] = useState(false)
    const [inputTelefono, setInputTelefono] = useState(false)

    const [cargando, setCargando] = useState(false)

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

            if (value == null) return console.log("No hay imagen");

            setCargando(true)

            const formdata = new FormData();
            formdata.append('imagen', value)
            formdata.append('imagenVieja', imagen)
    
            const response = await fotoPerfil(formdata)
    
            if (response == 204) {
                setImagen(null)
                setCargando(false)
                return console.log("Error al Cargar PFP");
            }
            if (response == 406) {
                setCargando(false)
                return console.log("Contenido no aceptado.");
            }
    
            setImagen(response.imagen)

            setCargando(false)
        }

        const handleClickBorrar = async () => {

            if (imagen == null) return

            setCargando(true)

            const userId = JSON.parse(localStorage.getItem('userData')).userId

            const response = await fotoPerfilReset({userId: userId, imagenVieja: imagen})

            setImagen(null)

            setCargando(false)
        }

    return (
        <div>
            <Header/>
            <div className='box-perfil'>
                <div className="left-perfil">
                   
                    <img className = 'perfil-pic' src={ (imagen != null) ? `http://localhost:3500/api/pfp/${imagen}` : `http://localhost:3500/api/pfp/default.png`} alt="" style = { cargando ? {display: 'none'} : {display: 'block'}}/>
                    
                    <div style = { !cargando ? {display: 'none'} : {display: 'flex'}} className="loader-container-perfil">
                        <div className="loader"></div>
                    </div>

                    <div className='botones-perfil'>
                        <div className='input-perfil'>
                            <label disabled={cargando} className='label-perfilpic-upload' htmlFor="file-upload-profile"><FaPencilAlt/></label>
                            <input disabled={cargando} style={{display: 'none'}} id= 'file-upload-profile' type="file" required accept="image/png" onChange={(event) => handleClick(event.target.files[0])}/>
                        </div>
                        <label disabled={cargando} className='delete-perfilpic' onClick={handleClickBorrar}><FaTrash/></label>
                    </div>
                </div>
                <hr className='barra-perfil'/>
                <div className="right-perfil">
                    <div className='datos-usuario'>
                    <h3>Datos de usuario</h3>
                        <div className="nueva-data-perfil-box" >
                            <p>Email: {email}</p>
                        </div>
                        <div  className="nueva-data-perfil-box" >
                            <p>Nombre: {nombre}</p>
                            <button className='boton-edit-datos' onClick={() => setInputNombre(!inputNombre)}><FaPencilAlt/></button>
                        </div>
                        <div className="nuevo-mail-perfil-box">
                            <input className='nuevo-mail-perfil' type="text" placeholder="Nuevo Nombre" style={inputNombre ? {display:"flex"} : {display:"none"}}/>

                        </div>                        
                        <div className="nueva-data-perfil-box" >
                            <p>Apellido: {apellido}</p>
                            <button className='boton-edit-datos' onClick={() => setInputApellido(!inputApellido)}><FaPencilAlt/></button>
                        </div>
                        <div className="nuevo-mail-perfil-box">
                            <input className='nuevo-mail-perfil' type="text" placeholder="Nuevo Apellido" style={inputApellido ? {display:"flex"} : {display:"none"}}/>

                        </div>                        
                        <div className="nueva-data-perfil-box" >
                            <p>Telefono: {telefono}</p>
                            <button className='boton-edit-datos' onClick={() => setInputTelefono(!inputTelefono)}><FaPencilAlt/></button>
                        </div>
                        <div className="nuevo-mail-perfil-box">
                            <input className='nuevo-mail-perfil' type="text" placeholder="Nuevo Telefono" style={inputTelefono ? {display:"flex"} : {display:"none"}}/>

                        </div>
                    </div>
                    <div className='Seguridad'>
                        <h3>Seguridad:</h3>
                        <a href="#" onClick={() => navigate('/olvidastecontra')}>Cambiar Contraseña</a>
                    </div>
                    <button className='guardar-cambios-perfil'>Guardar Cambios</button>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Perfil