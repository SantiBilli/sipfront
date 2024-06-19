import React, { useEffect, useState } from 'react'
import '../Styles/Register.css'
import Logo7 from '../assets/Logo7.png'
import { sendCheckEmail } from '../utils/api/checkEmail'
import { sendRegisterForm } from '../utils/api/register'
import { useNavigate } from 'react-router-dom'
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa";


const Register = () => {

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [mail, setMail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [hasError, setHasError] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [emailExists, setEmailExists] = useState(false);

    const navigate = useNavigate();

    const handleClick = async (event) => {
        event.preventDefault();
        setSubmitted(true);

        const nameValid = nombre.trim();
        const lastNameValid = apellido.trim();
        const emailValid = mail.trim() && (mail.includes('@'));
        const phoneValid = phone.trim() && phone.startsWith(11) && phone.length == 10;
        const passwordValid = password.trim();
        const password2Valid = password2.trim();

        console.log(nameValid, lastNameValid, emailValid, phoneValid, passwordValid, password2Valid, (password2 === password));

        if(nameValid && lastNameValid && emailValid && phoneValid && passwordValid && password2Valid && (password2 === password)){
            console.log("Form submited");
            setSubmitted(false); //Reseteamos el estado del form
            setHasError(false);

            const response =  sendRegisterForm({nombre: nombre, apellido: apellido, email: mail, telefono: phone, contra: password})
            
            if (response == 204) return console.log("Error al registrar el usuario")
            
            return navigate("/login")

        } else{
            setHasError(true);
        }
    }

    useEffect(() => {
        const checker = async () => {
            await checkEmailAPI()
        }
        checker()
    }, [mail])

    const checkEmailAPI = async () => {
        const response = await sendCheckEmail({email : mail})
        if (response == 204) {
            setEmailExists(false)
            return
        }
        setEmailExists(true)
    }


    const [showPwd, setShowPws] = useState(false)
    const [showPwd2, setShowPws2] = useState(false)

  return (
    <div className='form-box'>
        <form className='form'>
            <div className='box-register'>
                <IoArrowBackCircleOutline className='icon-arrow' onClick={() => navigate('/login')}/>
                <h2>Regístrate</h2>
            </div>
                <div className='top-form'>
                    <div className="input-box">
                        <label>Email*</label>
                        <input type="text" required onChange={event => setMail(event.target.value)}/>
                    </div>
                        {(submitted && !mail.trim() ? <span className="invalidCredentials">Campo obligatorio</span> : null)}
                        {(submitted && mail.trim() && (!mail.includes('@')) ? <span className="invalidCredentials">Email inválido</span> : null)}
                        {(submitted && emailExists ? <span className="invalidCredentials">Email ya registrado</span> : null)}                    
                    <div className="input-box">
                        <label>Nombre*</label>
                        <input type="text" required onChange={event => setNombre(event.target.value)}/>
                    </div>
                        {(submitted && !nombre.trim() ? <span className="invalidCredentials">Campo obligatorio</span> : null)}
                    <div className="input-box">
                        <label>Apellido*</label>
                        <input type="text" required onChange={event => setApellido(event.target.value)}/>
                    </div> 
                        {(submitted && !apellido.trim() ? <span className="invalidCredentials">Campo obligatorio</span> : null)}
                    <div className="input-box">
                        <label>Telefono*</label>
                        <input type="tel" required pattern='[0-9]{11}' onChange={event => setPhone(event.target.value)}/>
                    </div>
                        {(submitted && !phone.trim() ? <span className="invalidCredentials">Campo obligatorio</span> : null)}
                        {(submitted && phone.trim() && (!phone.startsWith(11) || phone.length != 10)? <span className="invalidCredentials">Telefono inválido</span> : null)}

                    <div className="input-box">
                        <label>Contraseña*</label>
                        <input type={showPwd ? "text" : "Password"} required onChange={event => setPassword(event.target.value)}/>
                        
                        <div className='eye-login' onClick={() => setShowPws(!showPwd)}>
                            {showPwd ? <FaRegEyeSlash/> : <FaRegEye/>
                            }
                        </div>                            
                    </div>     
                        {(submitted && !password.trim() ? <span className="invalidCredentials">Campo obligatorio</span> : null)}
                    <div className="input-box">
                            <label>Confirmar contraseña*</label>
                            <input type={showPwd2 ? "text" : "Password"} required onChange={event => setPassword(event.target.value)}/>
                            
                            <div className='eye-login' onClick={() => setShowPws2(!showPwd2)}>
                                {showPwd2 ? <FaRegEyeSlash/> : <FaRegEye/>
                                }
                            </div>                            
                    </div>
                        {(submitted && !password2.trim() ? <span className="invalidCredentials">Campo obligatorio</span> : null)}
                        {(submitted && password2.trim() && (password2 !== password) ? <span className="invalidCredentials">Las contraseñas no coinciden</span> : null)}
                </div>
                <div className='bottom-form'>
                    <button type='button' onClick={handleClick}>Crear Cuenta</button>
                </div>
                {hasError ? <span className="invalidCredentials" style={{color: 'gray'}}>Uno o más campos tienen un error. Por favor revisa e intenta de nuevo</span> : null}
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