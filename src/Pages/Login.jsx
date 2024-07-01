import React, { useEffect, useState } from 'react'
import '../Styles/Login.css'
import { useNavigate } from 'react-router-dom'
import { sendLoginForm } from '../utils/api/login'
import Logo7 from '../assets/Logo7.png';
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa";


const Login = () => {

    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordStatus, setPasswordStatus] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem("userToken")
        localStorage.removeItem("userData")
    },[])

    const submitForm = async () => {
        const response = await sendLoginForm({mail, password})

        if (response == 401) {
            setPasswordStatus(true)
            return
        }

        localStorage.setItem("userToken",JSON.stringify(response.token))
        localStorage.setItem("userData",JSON.stringify(response.userData))
        navigate("/dashboard")
        return
    }

    const [showPwd, setShowPws] = useState(false)

    return ( 
        <div className='form-box'>
            <form className='form'>
                    <h2>Inicia sesión</h2>
                    <div className='top-form'>
                        <div className="input-box">
                            <label>Email</label>
                            <input type="text" required onChange={event => setMail(event.target.value)} maxLength={50}/>
                        </div>   
                        <div className="input-box">
                            <label>Password</label>
                            <input type={showPwd ? "text" : "Password"} required onChange={event => setPassword(event.target.value)} maxLength={50}/>
                            
                            <div className='eye-login' onClick={() => setShowPws(!showPwd)}>
                                {showPwd ? <FaRegEyeSlash/> : <FaRegEye/>
                                }
                            </div>                            
                        </div>
                        <div className='recordame'>
                            <label style={{fontFamily: 'Poppins'}}><input type="checkbox"/>Recordarme</label>
                        </div>
                    </div>
                    <div className='bottom-form'>
                        <button type='button' onClick={submitForm}>Iniciar sesión</button>
                        {passwordStatus ? <h1 className="invalidCredentials" >Email o contraseña incorrectos</h1> : null}
                        <a onClick={() => {navigate('/olvidastecontra')}}>¿Olvidaste tu contraseña?</a>
                        <a style={{color: 'black'}} onClick={() => {navigate('/register')}}>Crear cuenta</a>
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

export default Login