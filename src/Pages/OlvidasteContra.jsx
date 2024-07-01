import React, { useEffect, useState } from 'react'
import '../Styles/OlvidasteContra.css'
import Logo7 from '../assets/Logo7.png'
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { sendCheckEmail } from '../utils/api/checkEmail'
import { olvideConstraseñaForm } from '../utils/api/olvideContraseña';

const OlvidasteContra = () => {

    const [mail, setMail] = useState('');
    const [emailExists, setEmailExists] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [enviado, setEmailEnviado]=useState(false)

    const navigate = useNavigate();

    const handleClick = async (event) => {
        event.preventDefault();
        setSubmitted(true)
        
        if(emailExists){
            setSubmitted(false)
            setEmailEnviado(true)

            const response = await olvideConstraseñaForm({email : mail})

            if (response == 204) return console.log("Error al enviar mail")

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

  return (
    <form className='form-box'>
        <div className='form'>
        <IoArrowBackCircleOutline className='icon-arrow' onClick={() => navigate('/login')}/>
                <h2>¿Olvidaste tu contraseña?</h2>
                <p>Ingrese el correo electrónico asociado a su cuenta para cambiar su contraseña.</p>
                <div className='top-form'>
                    <div className="input-box">
                        <label>Email</label>
                        <input type="text" required onChange={event => setMail(event.target.value)}/>
                    </div>   
                    {submitted && !emailExists && <p className='invalidCredentials'>El email no existe</p>}
                    {enviado && emailExists && <p className='validCredentials'>Se envió el mail correctamente</p>}
                </div>
                <div className='bottom-form'>
                    <button type='button' onClick={handleClick}>Enviar Correo</button>
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