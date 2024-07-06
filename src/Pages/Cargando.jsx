import React, { useEffect } from 'react';
import '../Styles/Cargando.css'
import Logo7 from '../assets/Logo7.png';

const Cargando = () => {

    useEffect(() => {
        const timer = setTimeout(() => {
          window.location.href = '/login';
        }, 2500);
    
        return () => clearTimeout(timer);
      }, []);

    return (
        <div className="cargando">
            <img className="cargando-logo" src={Logo7} alt="logo" />
        </div>
    )
}

export default Cargando