import React from 'react'
import Logo7 from '../assets/Logo7.png'

const OlvidasteContra = () => {
  return (
    <form className='form-box'>
        <div className='form'>
                <h2>¿Olvidaste tu contraseña?</h2>
                <p>Ingrese el correo electrónico asociado a su cuenta para cambiar su contraseña.</p>
                <div className='top-form'>
                    <div className="input-box">
                        <label>Email</label>
                        <input type="text" required />
                    </div>   
                </div>
                <div className='bottom-form'>
                    <button type='button'>Enviar Correo</button>
                </div>
        </div>
        <div className="deco">
            <div className='c1'></div>
            <div className='c2'></div>
            <img className ='img-deco-login' src={Logo7} alt="" />
        </div>
    </form>
  )
}

export default OlvidasteContra