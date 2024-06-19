import React, { useState } from 'react'
import '../Styles/Sidebar.css'
import Filtros from './Filtros'


const Sidebar = ({ordenarPor, handleFiltroChange}) => {
  
    return (
    <div className='sidebar'>
        <Filtros handleFiltroChange={handleFiltroChange}/>

        <div className="ordenar">
            <h2>Ordenar por</h2>
            <div className='input-box3'>
                <input type="radio" name='orden' value="A-Z" onChange={(event) => {ordenarPor(event.target.value)}}/>
                <label>A-Z</label>
            </div>
            <div className='input-box3'>
                <input type="radio" name='orden' value="Z-A" onChange={(event) => {ordenarPor(event.target.value)}}/>
                <label>Z-A</label>
            </div>
            <div className='input-box3'>
                <input type="radio" name='orden' value="ASC" onChange={(event) => {ordenarPor(event.target.value)}}/>
                <label>Precio ascendente</label>
            </div>          
            <div className='input-box3'>
                <input type="radio" name='orden' value="DSC" onChange={(event) => {ordenarPor(event.target.value)}}/>
                <label>Precio descendente</label>
            </div>
            <div className='input-box3'>
                <input type="radio" name='orden' value="DATE" onChange={(event) => {ordenarPor(event.target.value)}}/>
                <label>Fecha de publicacion</label>
            </div>
        </div>
  </div>

  )
}

export default Sidebar