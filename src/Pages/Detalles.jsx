import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import '../Styles/Detalles.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { sendToken } from "../utils/api/checkToken";
import { BACK_ENDPOINT } from "../../config.js"
import { obtainProductDetail } from '../utils/api/obtainProducto.js';

const Detalles = () => {

    const navigate = useNavigate();
    
    const { id } = useParams();

    const [nombre, setNombre] = useState("")
    const [descripcion, setDescripcion] = useState("")
    const [precio, setPrecio] = useState("")
    const [imagen, setImagen] = useState("")
    const [nombreVendedor, setNombreVendedor] = useState("")
    const [apellidoVendedor, setApellidoVendedor] = useState("")

    const [telefono, setTelefono] = useState("")
    const [email, setEmail] = useState("")

    useEffect(() => {
        const token = localStorage.getItem('userToken')
        if (!token) return navigate("/login")
        
        const sendTokenToServer = async () => {
          const response = await sendToken(token)
          if (response == false) return navigate('/login')
        }

        const obtenerDetalles = async () => {
            const response = await obtainProductDetail({postId: id})
            
            if (response == 204) return console.log("Error al obtener los datos")

            setNombre(response.producto.nombreProd)
            setDescripcion(response.producto.descripcionProd)
            setPrecio(response.producto.precio)
            setImagen(response.producto.imagen)
            setNombreVendedor(response.vendedor.nombre)
            setApellidoVendedor(response.vendedor.apellido)
            setTelefono(response.vendedor.telefono)
            setEmail(response.vendedor.email)
        }

        sendTokenToServer()
        obtenerDetalles()
        },[])


    return (
    <>
        <Header/>
        <div className="detalles-box">
            <div className='detalles-left-box'>
                <div className="input-box2">
                    <label>Nombre:</label>
                    <p>{nombre}</p>
                </div> 
                <div className="input-box-description">
                    <label>Descripcion:</label>
                    <p>{descripcion}</p>
                </div> 
                <div className="input-box2">
                    <label>Precio:</label>
                    <p>{precio}</p>
                </div> 
                <div className="detalle-botones">
                    <button className='wpp-detalles' onClick={() => window.open(`https://wa.me/+54${telefono}`)}>WhatsApp</button>
                    <button className='mail-detalles' onClick={() =>  window.location.href = `mailto:${email}`}>Mail</button>
                </div>
            </div>
            <hr className='detalles-barra'/>
            <div className="detalles-right-box">
                <img src={`${BACK_ENDPOINT}/api/images/${imagen}`} alt={`Image ${nombre}`}/>
                <p>Vendedor: {nombreVendedor} {apellidoVendedor}</p>
            </div>
        </div>
        <Footer/>
    </>
  )
}

export default Detalles