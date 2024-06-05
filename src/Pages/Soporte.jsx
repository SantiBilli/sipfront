import React from 'react'
import '../Styles/Soporte.css'
import Header from '../Components/Header'
import Footer from '../Components/Footer'

const Soporte = () => {
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