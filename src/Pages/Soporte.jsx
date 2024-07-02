import React, { useEffect, useState } from 'react'
import '../Styles/Soporte.css'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import { useNavigate } from 'react-router-dom'
import { sendToken } from '../utils/api/checkToken'
import { TbHeadphonesFilled } from "react-icons/tb";
import { handleSoporte } from '../utils/api/soporte'

const Soporte = () => {
  
  const navigate = useNavigate()

  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState(null);


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

    navigate("/dashboard")
  }

  return (
    <div>
        <Header/>
        <div className='box-soporte'>
            <h2 className='soporte-headphones'>Soporte <TbHeadphonesFilled/></h2>
            <div className="input-box-description-soporte">
                <label>Escribi tu consulta de la forma mas detallada posible:</label>
                <textarea maxLength={500} name="" id="" onChange={(event) => setDescripcion(event.target.value)}></textarea>
                <div style={{display: 'flex', alignItems: 'center', fontFamily: 'Poppins', fontSize: '13px'}}>{descripcion.length}/500</div>
            </div> 
            <div className="input-box-soporte">
                <label>Adjuntar Imagen: </label>
                <input type="file" required accept="image/*" onChange={event => setImagen(event.target.files[0])}/>
            </div>
            <button className="button-publicar" style = { (descripcion != "" && imagen != null) ? {display: 'block'} : {display: 'none'}} onClick={handleClick}>Enviar</button>
        </div>
        <Footer/>
    </div>
  )
}

export default Soporte