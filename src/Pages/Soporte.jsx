import React, { useEffect, useState, useRef } from 'react'
import '../Styles/Soporte.css'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import { useNavigate } from 'react-router-dom'
import { sendToken } from '../utils/api/checkToken'
import { TbHeadphonesFilled } from "react-icons/tb";
import { handleSoporte } from '../utils/api/soporte'

const Soporte = () => {
  
  const navigate = useNavigate()
  const fileInputRef = useRef(null);

  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState(null);
  const [submitted, setSubmitted] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem('userToken')
    if (!token) return navigate("/login")
    
    const sendTokenToServer = async () => {
      const response = await sendToken(token)
      if (response == false) return navigate('/login')
    }

    sendTokenToServer()
    },[])

  const handleClick = async () => {
    const formdata = new FormData();

    formdata.append('descripcion', descripcion)
    formdata.append('imagen', imagen)

    const response = await handleSoporte(formdata)

    if (response == 204) return console.log("Error al mandar consulta");
    setSubmitted(true);
    setImagen(null);
    setDescripcion("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setTimeout(() => {
      setSubmitted(false);
    }, 2000);

  };

  return (
    <div>
        <Header/>
        <div className='box-soporte'>
            <h2 className='soporte-headphones'>Soporte <TbHeadphonesFilled/></h2>
            <div className="input-box-description-soporte">
                <label>Escribí tu consulta de la forma más detallada posible:</label>
                <textarea value = {descripcion} maxLength={500} name="" id="" onChange={(event) => setDescripcion(event.target.value)}></textarea>
                <div style={{display: 'flex', alignItems: 'center', fontFamily: 'Poppins', fontSize: '13px'}}>{descripcion.length}/500</div>
            </div> 
            <div className="input-box-soporte">
                <label>Adjuntar Imagen: </label>
                <input ref={fileInputRef} type="file" className='imagen-soporte' required accept="image/*" onChange={event => setImagen(event.target.files[0])}/>
            </div>
            <button className="button-publicar-soporte" style = { (descripcion != "" && imagen != null) ? {display: 'block'} : {display: 'none'}} onClick={handleClick}>Enviar</button>
            {submitted &&  <p className='validCredentials'>Tu consulta ha sido enviada con éxito</p>}
        </div>
        <Footer/>
    </div>
  )
}

export default Soporte