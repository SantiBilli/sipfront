import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import '../Styles/Detalles.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { sendToken } from "../utils/api/checkToken";

const Detalles = () => {

    const navigate = useNavigate();
    
    const location = useLocation();

    const infoProducto = location.state.url
    const nombre = infoProducto.nombreProd
    const descripcion = infoProducto.descripcionProd
    const precio = infoProducto.precio
    const imagen = infoProducto.imagen
    const nombreVendedor = infoProducto.nombre

    useEffect(() => {
        const token = localStorage.getItem('userToken')
        if (!token) return navigate("/login")
        
        const sendTokenToServer = async () => {
          const response = await sendToken(token)
          if (response == false) return navigate('/login')
        }

        sendTokenToServer()
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
                    <button className='wpp-detalles'>WhatsApp</button>
                    <button className='mail-detalles'>Mail</button>
                </div>
            </div>
            <hr className='detalles-barra'/>
            <div className="detalles-right-box">
                <img src={`https://sipback-production.up.railway.app/api/images/${imagen}`} alt={`Image ${nombre}`}/>
                <p>Nombre del Vendedor: {nombreVendedor}</p>
            </div>
        </div>
        <Footer/>
    </>
  )
}

export default Detalles