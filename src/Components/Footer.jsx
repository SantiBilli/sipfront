import React from 'react'
import '../Styles/Footer.css'

import { FaWhatsapp } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className='footer-box'>
      <hr className='linea-footer'/>
      <div className='redes'>
        <div className='icon-redes'>
          <FaWhatsapp/>
          <FaInstagram/>
          <FaFacebookSquare/>
        </div>
        <hr className = 'barra-redes'/>
        <p>info@smartswap.com</p>
      </div>
      <hr className='linea-footer'/>
    </footer>
  )
}

export default Footer