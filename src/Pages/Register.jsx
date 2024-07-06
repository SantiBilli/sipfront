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
    const [loading, setLoading] = useState(false);
    const [mostrarBoton, setMostrarBoton] = useState(true)
    const [anoLectivo, setAnoLectivo] = useState('DEFAULT')


    const navigate = useNavigate();

    const handleClick = async (event) => {
        event.preventDefault();
        setSubmitted(true);

        const nameValid = nombre.trim();
        const lastNameValid = apellido.trim();
        const emailValid = mail.trim() && (mail.includes('@') && mail.includes('.'));
        const phoneValid = phone.trim() && phone.startsWith(11) && phone.length == 10;
        const passwordValid = password.trim();
        const password2Valid = password2.trim();
        const anoLectivoValid = anoLectivo != "DEFAULT"


        if (nameValid && lastNameValid && emailValid && phoneValid && passwordValid && password2Valid && (password2 === password) && !emailExists && anoLectivoValid) {
            setSubmitted(false); //Reseteamos el estado del form
            setHasError(false);
            setLoading(true);

            const response =  await sendRegisterForm({nombre: nombre, apellido: apellido, email: mail, telefono: phone, contra: password})
            setLoading(false);
            

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
                <IoArrowBackCircleOutline className='icon-arrow' onClick={() => navigate('/login')} style={{cursor: 'pointer'}}/>
                <h2>Regístrate</h2>
            </div>
                <div className='top-form'>
                    <div className="input-box">
                        <label>Email*</label>
                        <input type="text" required onChange={event => setMail(event.target.value)} maxLength={50}/>
                    </div>
                        {(submitted && !mail.trim() ? <span className="invalidCredentials">Campo obligatorio</span> : null)}
                        {(submitted && mail.trim() && (!mail.includes('@') || !mail.includes('.')) ? <span className="invalidCredentials">Email inválido</span> : null)}
                        {(submitted && emailExists ? <span className="invalidCredentials">Email ya registrado</span> : null)}                    
                    <div className="input-box">
                        <label>Nombre*</label>
                        <input type="text" required onChange={event => setNombre(event.target.value)} maxLength={25}/>
                    </div>
                        {(submitted && !nombre.trim() ? <span className="invalidCredentials">Campo obligatorio</span> : null)}
                    <div className="input-box">
                        <label>Apellido*</label>
                        <input type="text" required onChange={event => setApellido(event.target.value)} maxLength={25}/>
                    </div> 
                        {(submitted && !apellido.trim() ? <span className="invalidCredentials">Campo obligatorio</span> : null)}
                    <div className="input-box" style={{position: 'relative', marginBottom: '20px'}}>
                        <label>Teléfono*</label>
                        <input type="tel" required pattern='[0-9]{11}' onChange={event => setPhone(event.target.value)} maxLength={10}/>
                        <label style={{fontSize: '12px', position: 'absolute', bottom: '-25px'}}>Si es menor ponga el número de su padre/tutor</label>
                    </div>
                        {(submitted && !phone.trim() ? <span className="invalidCredentials">Campo obligatorio</span> : null)}
                        {(submitted && phone.trim() && (!phone.startsWith(11) || phone.length != 10) ? <span className="invalidCredentials">Telefono inválido</span> : null)}

                    <div className='input-box'>
                        <label>Año Lectivo</label>
                        <select className='select-año-electivo-register' onChange={event => setAnoLectivo(event.target.value)}>
                            <option value="DEFAULT" hidden>Seleccionar</option>
                            <option value="Primaria">Primaria</option>
                            <option value="Primer Año">Primer Año</option>
                            <option value="Segundo Año">Segundo Año</option>
                            <option value="Tercer Año">Tercer Año</option>
                            <option value="Cuarto Año">Cuarto Año</option>
                            <option value="Quinto Año">Quinto Año</option>
                        </select>
                    </div>
                    {(submitted && anoLectivo == "DEFAULT" ? <span className="invalidCredentials">Campo obligatorio</span> : null)}
                    

                    <div className="input-box">
                        <label>Contraseña*</label>
                        <input type={showPwd ? "text" : "Password"} required onChange={event => setPassword(event.target.value)} maxLength={50}/>
                        
                        <div className='eye-login' onClick={() => setShowPws(!showPwd)} style={{cursor: 'pointer'}}>
                            {showPwd ? <FaRegEyeSlash/> : <FaRegEye/>
                            }
                        </div>                            
                    </div>     
                        {(submitted && !password.trim() ? <span className="invalidCredentials">Campo obligatorio</span> : null)}
                    <div className="input-box">
                            <label>Confirmar contraseña*</label>
                            <input type={showPwd2 ? "text" : "Password"} required onChange={event => setPassword2(event.target.value)} maxLength={50}/>
                            
                            <div className='eye-login' onClick={() => setShowPws2(!showPwd2)} style={{cursor: 'pointer'}}>
                                {showPwd2 ? <FaRegEyeSlash/> : <FaRegEye/>
                                }
                            </div>                            
                    </div>
                        {(submitted && !password2.trim() ? <span className="invalidCredentials">Campo obligatorio</span> : null)}
                        {(submitted && password2.trim() && (password2 !== password) ? <span className="invalidCredentials">Las contraseñas no coinciden</span> : null)}
                </div>
                <div className='bottom-form'> 
                    <button type='button' onClick={handleClick}  style = { !loading ? {display: 'block', cursor: 'pointer', margin: '10px'} : {display: 'none'}}>Crear Cuenta</button>
                    <div style = { !loading ? {display: 'none'} : {display: 'block'}} className="loader"></div>
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