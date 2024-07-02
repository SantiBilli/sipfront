import React from 'react'
import '../Styles/Footer.css'

import { FaWhatsapp } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className='footer-box'>
      <hr className='linea-footer'/>
      <div className='redes'>
        <div className='icon-redes'>
          <FaWhatsapp className='redes-sociales' onClick={() => window.open(`https://wa.me/+5401137833124`)}/>
          <FaInstagram className='redes-sociales' onClick={() => window.open(`https://www.instagram.com/smartswap2024/`)}/>
          <FaXTwitter className='redes-sociales' onClick={() => window.open(`https://www.x.com/smartswap2024/`)}/>
          
        </div>
        <hr className = 'barra-redes'/>
        <p style={{"cursor":"pointer"}} onClick={() =>  window.location.href = `mailto:${"smartswapsip@gmail.com"}`}>smartswapsip@gmail.com</p>
      </div>
      <hr className='linea-footer'/>
    </footer>
  )
}

export default Footer