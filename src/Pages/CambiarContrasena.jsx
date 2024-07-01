import React, { useState, useEffect } from 'react'
import Logo7 from '../assets/Logo7.png'
import { json, useNavigate, useParams } from 'react-router-dom';
import { cambiarContraseña, cambiarContraseñaForm } from '../utils/api/cambiarContraseña.js';
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa";

const CambiarContrasena = () => {

    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [mail, setMail] = useState('');
    const [showPwd, setShowPws] = useState(false);
    const [showPwd2, setShowPws2] = useState(false);

    const [error, setError] = useState(false)


    const { userId } = useParams();
    const { token } = useParams();
    const navigate = useNavigate();


    const handleClick = async (event) => {

        event.preventDefault();
        setSubmitted(true);

        const passwordValid = password.trim();
        const password2Valid = password2.trim();

        if (passwordValid && password2Valid && (password2 === password)){  

            const response = await cambiarContraseña({token: token, contra: password})

            console.log(response);

            if (response == 401) return setError(true)
            if (response == 204) return console.log("Error.");

            navigate("/login")

            setSubmitted(false);
        }
    }
    
    useEffect(() => {
        const obtenermail = async () => {
            const response = await cambiarContraseñaForm({token: token})

            if (response == 204) return navigate('/login')

            return setMail(response.email)
        }
        
        obtenermail()

    }, [])


  return (
    <div className='form-box'>
            <form className='form'>
                    <h2 style={{margin: 0}}>Restablecer Contraseña</h2>
                    <h3 style={{fontWeight: 400}}>{mail}</h3>

                    <div className='top-form'>
                    <div className="input-box">
                        <label>Contraseña*</label>
                        <input type={showPwd ? "text" : "Password"} required onChange={event => setPassword(event.target.value)} maxLength={50}/>
                        
                        <div className='eye-login' onClick={() => setShowPws(!showPwd)}>
                            {showPwd ? <FaRegEyeSlash/> : <FaRegEye/>
                            }
                        </div>                            
                    </div>     
                        {(submitted && !password.trim() ? <span className="invalidCredentials">Campo obligatorio</span> : null)}
                    <div className="input-box">
                            <label>Confirmar contraseña*</label>
                            <input type={showPwd2 ? "text" : "Password"} required onChange={event => setPassword2(event.target.value)} maxLength={50}/>
                            
                            <div className='eye-login' onClick={() => setShowPws2(!showPwd2)}>
                                {showPwd2 ? <FaRegEyeSlash/> : <FaRegEye/>
                                }
                            </div>                            
                    </div>
                        {(submitted && !password2.trim() ? <span className="invalidCredentials">Campo obligatorio</span> : null)}
                        {(submitted && password2.trim() && (password2 !== password) ? <span className="invalidCredentials">Las contraseñas no coinciden</span> : null)}
                    </div>
                    <div className='bottom-form'>
                        <button onClick={handleClick} type='button'>Cambiar Contraseña</button>
                    </div>
                    {(error ? <span className="invalidCredentials">Este link ya ha expirado</span> : null)}
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