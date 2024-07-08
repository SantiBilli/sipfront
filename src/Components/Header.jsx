import React, { useEffect, useState } from 'react'
import '../Styles/Header.css'
import { CgProfile } from "react-icons/cg";
import { IoMdSearch } from "react-icons/io";
import { IoMenuOutline } from "react-icons/io5";
import { GrUploadOption } from "react-icons/gr";
import { useLocation, useNavigate } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';

import Logo7 from '../assets/Logo7.png';
import DesplegablePerfil from './DesplegablePerfil';

const Header = ({busqueda}) => {
    
    const navigate = useNavigate()
    const location = useLocation()

    const [openProfile, setOpenProfile] = useState(false);

    return (
        <>
        <header className='header'>
            <div className="left1">
                <img className='img-logo-header'  onClick={() => {navigate('/dashboard')}} src={Logo7} alt="" />
                {/* <h2 className='logo-texto-header'>Smart Swap</h2> */}
            </div>

            {
                location.pathname === '/dashboard' && 
                <div className="middle">
                    <input className = 'search-bar' type="text" placeholder='Buscar' onChange={(evento) => busqueda(evento.target.value)}/>
                    <button className='search'>
                        <IoMdSearch/>
                    </button>
                </div>
            }

            {/* <div className="middle">
                <input className = 'search-bar' type="text" placeholder='Buscar' onChange={(evento) => busqueda(evento.target.value)}/>
                <button className='search'>
                    <IoMdSearch/>
                </button>
            </div> */}

            <div className="right1">
                <button className = "upload">
                    <ArrowCircleUpIcon style={{width:"50px", height:"50px"}} className='upload-icon' onClick={() => {navigate('/publicar')}}/>
                </button>
                <div className='relativa-dropdown'>
                    <button className = "profile" onClick={() => setOpenProfile((prev) => !prev)}>
                        <AccountCircleIcon fontSize="large" style={{width:"50px", height:"50px"}}/>
                    </button>
                    {
                     openProfile && <DesplegablePerfil/>
                    }
                </div>                
                <div className='relativa-dropdown'>
                    <button className = "menu" onClick={() => setOpenProfile((prev) => !prev)}>
                        <MenuIcon fontSize="large"/>
                    </button>
                </div>                
            </div>
        </header>
        
        </>
  )
}

export default Header