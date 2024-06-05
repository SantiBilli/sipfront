import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import '../Styles/Detalles.css';
import imagen from '../assets/ImagenLogin.jpg';
import { useNavigate } from 'react-router-dom';
import { sendToken } from "../utils/api/checkToken";
import { obtainProductDetail } from '../utils/api/obtainProducto';
import { useParams } from 'react-router-dom';

const Detalles = () => {

    const navigate = useNavigate();
    const { id } = useParams()

    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [precio, setPrecio] = useState('')
    const [imagen, setImagen] = useState()

    const [nombreVendedor, setNombreVendedor] = useState('')

    useEffect(() => {
        const token = localStorage.getItem('userToken')
        if (!token) return navigate("/login")
        
        const sendTokenToServer = async () => {
          const response = await sendToken(token)
          if (response == false) return navigate('/login')
        }

        const productDetail = async () => {
            
            const response2 = await obtainProductDetail({token, id})
            
            if (response2 == 204) return
            
            setNombre(response2.producto.nombreProd)
            setDescripcion(response2.producto.descripcionProd)
            setPrecio(response2.producto.precio)
            setImagen(response2.producto.imagen)

            setNombreVendedor(response2.vendedor.nombre)
        }

        sendTokenToServer()
        productDetail()
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
                <img src={`data:image/png;base64,${imagen}`} alt={`Image ${nombre}`}/>
                <p>Nombre del Vendedor: {nombreVendedor}</p>
            </div>
        </div>
        <Footer/>
    </>
  )
}

export default Detalles