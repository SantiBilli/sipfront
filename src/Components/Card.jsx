import React from 'react'
import '../Styles/Card.css'
import { useNavigate } from 'react-router-dom';
import { BACK_ENDPOINT } from "../../config.js"

const Card = ({url}) => {

  // console.log(url);

  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/dashboard/detalles/${url.postId}`, {state: {url: url}});
  };

  //http://localhost:3500/api/images/${url.imagen}
  //https://sipback-production.up.railway.app/api/images/${url.imagen}
  return (
        <div className='card' onClick={handleClick}>
            <img className = 'imagen-card' key={url.postId} src={`${BACK_ENDPOINT}/api/images/${url.imagen}`} alt={`Image ${url.postId}`}/>
            <p className='nombre-card'>{url.nombreProd}</p>
            <p className='precio-card'>${url.precio}</p>
        </div>
  )
}

export default Card