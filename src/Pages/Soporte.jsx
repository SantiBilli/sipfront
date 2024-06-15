import React, { useEffect } from 'react'
import '../Styles/Soporte.css'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import { useNavigate } from 'react-router-dom'
import { sendToken } from '../utils/api/checkToken'

const Soporte = () => {
  
  const navigate = useNavigate()

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
    <div>
        <Header/>
        <div className='box-soporte'>
            <h2>Soporte:</h2>
            <div className="input-box-description-soporte">
                <label>Escribi tu consulta de la forma mas detallada posible:</label>
                <textarea name="" id=""></textarea>
            </div> 
            <div className="input-box-soporte">
                <label>Adjuntar Imagen: (Opcional)</label>
                <input type="file" required accept="image/png"/>
            </div> 
        </div>
        <Footer/>
    </div>
  )
}

export default Soporte