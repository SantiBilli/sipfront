import React, { useState } from 'react'
import '../Styles/Sidebar.css'
import Filtros from './Filtros'
import Ordenar from './Ordenar'


const Sidebar = ({ordenarPor, handleFiltroChange}) => {
  
    return (
      
    <div className='sidebar'>
        <Filtros handleFiltroChange={handleFiltroChange}/>
        <Ordenar ordenarPor={ordenarPor}/>
    </div>

  )
}

export default Sidebar