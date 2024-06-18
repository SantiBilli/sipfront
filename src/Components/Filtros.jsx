import React from 'react'
import DesplegableInstitucion from './DesplegableInstitucion'
import DesplegableZona from './DesplegableZona'
import DesplegableMateria from './DesplegableMateria'
import DesplegableAño from './DesplegableAño'
import '../Styles/Filtros.css'
const Filtros = () => {
  return (
    <div className="filtros">
        <h2>Filtros</h2>
        <DesplegableInstitucion/>
        <DesplegableZona/>
        <DesplegableMateria/>
        <DesplegableAño/>
    </div>
  )
}

export default Filtros