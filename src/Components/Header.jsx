import React, { useState } from 'react'
import '../Styles/Header.css'
import { FaPlus } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { IoMdSearch } from "react-icons/io";
import { IoMenuOutline } from "react-icons/io5";
import { GrUploadOption } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';

import Logo7 from '../assets/Logo7.png';
import DesplegablePerfil from './DesplegablePerfil';

const Header = () => {
    const navigate = useNavigate()

    const [openProfile, setOpenProfile] = useState(false);

    return (
        <>
        <header className='header'>
            <div className="left">
                <img className='img-logo-header'  onClick={() => {navigate('/dashboard')}} src={Logo7} alt="" />
                {/* <h2 className='logo-texto-header'>Smart Swap</h2> */}
            </div>
            <div className="middle">
                <input className = 'search-bar' type="text" placeholder='Buscar'/>
                <button className='search'>
                    <IoMdSearch/>
                </button>
            </div>
            <div className="right">
                <button className = "upload">
                    <GrUploadOption className='upload-icon' onClick={() => {navigate('/publicar')}}/>
                </button>
                <div className='relativa-dropdown'>
                    <button className = "profile" onClick={() => setOpenProfile((prev) => !prev)}>
                        <CgProfile className='profile-icon'/>
                    </button>
                    {
                     openProfile && <DesplegablePerfil/>
                    }
                </div>                
                <div className='relativa-dropdown'>
                    <button className = "menu" onClick={() => setOpenProfile((prev) => !prev)}>
                        <IoMenuOutline/>
                    </button>
                </div>                
            </div>
        </header>
        
        </>
  )
}

export default Header