import React, { useState } from 'react'
import Filtros from './Filtros'
import Ordenar from './Ordenar'
import '../Styles/ResponsiveSidebar.css'

const ResponsiveSidebar = ({setOrdenar, handleFiltroChange}) => {

    const [openFiltros, setOpenFiltros] = useState(false);

    const [openOrdenar, setOpenOrdenar] = useState(false);

  return (
    <div className='box-responsive-filters'>

        <div className='filter-element-responsive'>
            <button className="filtrar-responsive-dropdown" onClick={() => setOpenFiltros((prev) => !prev)}>Filtro</button>
            {
                     openFiltros && <Filtros handleFiltroChange={handleFiltroChange}/>
            }

        </div>

        <div className='ordenar-element-responsive'>
            <button className='ordenar-responsive-dropdown' onClick={() => setOpenOrdenar((prev) => !prev)}>Ordenar</button>
            {
                     openOrdenar && <Ordenar ordenarPor={setOrdenar}/>
            }
        </div>
    </div>
)
}

export default ResponsiveSidebar