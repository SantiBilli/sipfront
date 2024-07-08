import React, { useEffect, useState } from 'react'
import '../Styles/Header2.css'
import { CgProfile } from "react-icons/cg";
import { IoMdSearch } from "react-icons/io";
import { IoMenuOutline } from "react-icons/io5";
import { FaPencilAlt } from "react-icons/fa";
import { GrUploadOption } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';

import Logo7 from '../assets/Logo7.png';
import DesplegablePerfil from './DesplegablePerfil';

const Header2 = ({busqueda}) => {
    
    const navigate = useNavigate()

    const [openProfile, setOpenProfile] = useState(false);

    return (
        <>
        <header className='header2'>
            <div className="left">
                <img className='img-logo-header'  onClick={() => {navigate('/dashboard')}} src={Logo7} alt="" />
            </div>
        
            <div className="middle">
                <input className = 'search-bar' type="text" placeholder='Buscar' onChange={(evento) => busqueda(evento.target.value)}/>
                <button className='search'>
                    <IoMdSearch/>
                </button>
            </div>

            <div className="right">
                <button className = "upload">
                    <GrUploadOption style={{color: "rgb(251, 234, 199)"}} className='upload-icon' onClick={() => {navigate('/publicar')}}/>
                </button>
                <div className='relativa-dropdown'>
                    <button className = "profile" onClick={() => setOpenProfile((prev) => !prev)}>
                        <CgProfile style={{color: "rgb(251, 234, 199)"}} className='profile-icon'/>
                    </button>
                    {
                     openProfile && <DesplegablePerfil/>
                    }
                </div>                
                <div className='relativa-dropdown'>
                    <button className = "menu" onClick={() => setOpenProfile((prev) => !prev)}>
                        {/* <IoMenuOutline style={{color: "rgb(251, 234, 199)"}}/> */}
                        <FaPencilAlt className='lapizEdit'/>
                    </button>
                </div>                
            </div>
        </header>
        
        </>
  )
}

export default Header2