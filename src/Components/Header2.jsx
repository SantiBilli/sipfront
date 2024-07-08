import React, { useEffect, useState } from 'react'
import '../Styles/Header2.css'
import { useNavigate } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';

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
                    <SearchIcon fontSize="large"/>
                </button>
            </div>

            <div className="right">
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

export default Header2