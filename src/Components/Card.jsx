import React from 'react'
import '../Styles/Card.css'
import { useNavigate } from 'react-router-dom';


const Card = ({url}) => {

  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/dashboard/detalles/${url.postId}`, {state: {url: url}});
  };

  return (
        <div className='card' onClick={handleClick}>
            <img className = 'imagen-card' key={url.postId} src={`http://localhost:3500/api/images/${url.imagen}`} alt={`Image ${url.postId}`}/>
            <p>{url.nombreProd}</p>
            <p className='precio-card'>${url.precio}</p>
        </div>
  )
}

export default Card