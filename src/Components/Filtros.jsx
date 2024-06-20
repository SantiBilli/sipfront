import React from 'react'
import DesplegableInstitucion from './DesplegableInstitucion'
import DesplegableZona from './DesplegableZona'
import DesplegableMateria from './DesplegableMateria'
import DesplegableAño from './DesplegableAño'
import '../Styles/Filtros.css'
const Filtros = ({handleFiltroChange}) => {
  
  return (
    <div className="filtros">
        <h2>Filtros</h2>
        <DesplegableInstitucion handleFiltroChange={handleFiltroChange}/>
        <DesplegableZona handleFiltroChange={handleFiltroChange}/>
        <DesplegableMateria handleFiltroChange={handleFiltroChange}/>
        <DesplegableAño handleFiltroChange={handleFiltroChange}/>
    </div>
  )
}

export default Filtros