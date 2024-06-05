import React from 'react'
import '../Styles/Card.css'
import { FaImage } from "react-icons/fa";
import imagentest from '../assets/ImagenLogin.jpg'
import { useNavigate } from 'react-router-dom';


const Card = ({url}) => {

  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/detalles/${url.postId}`);
  };

  return (
        <div className='card' onClick={handleClick}>
            <img className = 'imagen-card' key={url.postId} src={`data:image/png;base64,${url.imagen}`} alt={`Image ${url.postId}`}/>
            <p>{url.nombreProd}</p>
            <p className='precio-card'>${url.precio}</p>
        </div>
  )
}

export default Card