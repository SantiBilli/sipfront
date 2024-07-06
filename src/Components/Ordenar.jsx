import React, { useState } from 'react'
import '../Styles/Ordenar.css'
import { IoIosArrowRoundDown, IoIosArrowRoundUp  } from "react-icons/io";

const Ordenar = ({ordenarPor}) => {
  return (
    <div className="ordenar">
    <h2>Ordenar por</h2>
    <div className='input-box3'>
        <input defaultChecked type="radio" name='orden' value="RELEVANTE" onChange={(event) => {ordenarPor(event.target.value)}}/>
        <label>Mas Relevante</label>
    </div>
    <div className='input-box3'>
        <input type="radio" name='orden' value="ASC" onChange={(event) => {ordenarPor(event.target.value)}}/>
        <label>Precio <IoIosArrowRoundUp style={{fontSize: '20px'}}/></label>
    </div>          
    <div className='input-box3'>
        <input type="radio" name='orden' value="DSC" onChange={(event) => {ordenarPor(event.target.value)}}/>
        <label>Precio <IoIosArrowRoundDown style={{fontSize: '20px'}}/></label>
    </div>
    <div className='input-box3'>
        <input type="radio" name='orden' value="A-Z" onChange={(event) => {ordenarPor(event.target.value)}}/>
        <label>A-Z</label>
    </div>
    <div className='input-box3'>
        <input type="radio" name='orden' value="Z-A" onChange={(event) => {ordenarPor(event.target.value)}}/>
        <label>Z-A</label>
    </div>
    <div className='input-box3'>
        <input type="radio" name='orden' value="DATE" onChange={(event) => {ordenarPor(event.target.value)}}/>
        <label>Fecha de publicación</label>
    </div>
    </div>
  )
}

export default Ordenar