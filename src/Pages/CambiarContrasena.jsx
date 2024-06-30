import React, { useState, useEffect } from 'react'
import Logo7 from '../assets/Logo7.png'
import { useNavigate } from 'react-router-dom';

const CambiarContrasena = () => {

    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [submitted, setSubmitted] = useState(false);


    const navigate = useNavigate();
    


  return (
    <div className='form-box'>
            <form className='form'>
                    <h2 style={{margin: 0}}>Restablecer Contraseña</h2>
                    <h3 style={{fontWeight: 400}}>ignabilli03@gmail.com</h3>

                    <div className='top-form'>
                        <div className="input-box">
                            <label>Contraseña</label>
                            <input type="text" required/>
                        </div>   
                        <div className="input-box">
                            <label>Confirmar Contraseña</label>
                            <input type="password" required/>                     
                        </div>
                    </div>
                    <div className='bottom-form'>
                        <button type='button'>Cambiar Contraseña</button>
                    </div>
            </form>
            <div className="deco">
                <div className='c1'></div>
                <div className='c2'></div>
                <img className ='img-deco-login' src={Logo7} alt="" />
            </div>
    </div>
  )
}

export default CambiarContrasena