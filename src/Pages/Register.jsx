import React from 'react'
import '../Styles/Register.css'
import Logo7 from '../assets/Logo7.png'

const Register = () => {
  return (
    <div className='form-box'>
        <form className='form'>
                <h2>Registrate</h2>
                <div className='top-form'>
                    <div className="input-box">
                        <label>Email</label>
                        <input type="text" required/>
                    </div>
                    <div className="input-box">
                        <label>Nombre</label>
                        <input type="text" required/>
                    </div>
                    <div className="input-box">
                        <label>Apellido</label>
                        <input type="text" required/>
                    </div> 
                    <div className="input-box">
                        <label>Telefono</label>
                        <input type="tel" required pattern='[0-9]{11}'/>
                    </div>
                    <div className="input-box">
                        <label>Contraseña</label>
                        <input type="Password" required/>
                    </div>      
                    <div className="input-box">
                    <label>Confirmar Contraseña</label>
                        <input type="Password" required/>
                    </div>
                </div>
                <div className='bottom-form'>
                    <button type='button'>Crear Cuenta</button>
                </div>
        </form>
        <div className="deco">
            <div className='c1'></div>
            <div className='c2'></div>
            <img className ='img-deco-register' src={Logo7} alt="" />
        </div>
    </div>
)
}

export default Register