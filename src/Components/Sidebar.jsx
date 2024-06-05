import React from 'react'
import '../Styles/Sidebar.css'

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className="filtros">
            <h2>Filtros</h2>
            <div className='input-box3'>
                <input type="checkbox" />
                <label>Institucion</label>
                {/* <select name="Institucion" id="" multiple>
                <option value="o1">Colegio San Agustin</option>
                <option value="o2">Colegio Santa Teresa</option>
                <option value="o3">Colegio Bayard</option>
                <option value="o4">Colegio San Agustin</option>
                <option value="o5">Colegio Lange Ley</option>
                </select> */}
            </div>
            <div className='input-box3'>
                <input type="checkbox" />
                <label>Zona</label>
                {/* <select name="Institucion" id="" multiple>
                <option value="o1">Colegio San Agustin</option>
                <option value="o2">Colegio Santa Teresa</option>
                <option value="o3">Colegio Bayard</option>
                <option value="o4">Colegio San Agustin</option>
                <option value="o5">Colegio Lange Ley</option>
                </select> */}
            </div>
            <div className='input-box3'>
                <input type="checkbox" />
                <label>Materia</label>
                {/* <select name="Institucion" id="" multiple>
                <option value="o1">Colegio San Agustin</option>
                <option value="o2">Colegio Santa Teresa</option>
                <option value="o3">Colegio Bayard</option>
                <option value="o4">Colegio San Agustin</option>
                <option value="o5">Colegio Lange Ley</option>
                </select> */}
            </div>
            <div className='input-box3'>
                <input type="checkbox" />
                <label>Costo</label>
                {/* <select name="Institucion" id="" multiple>
                <option value="o1">Colegio San Agustin</option>
                <option value="o2">Colegio Santa Teresa</option>
                <option value="o3">Colegio Bayard</option>
                <option value="o4">Colegio San Agustin</option>
                <option value="o5">Colegio Lange Ley</option>
                </select> */}
            </div>
            <div className='input-box3'>
                <input type="checkbox" />
                <label>Año academico</label>
                {/* <select name="Institucion" id="" multiple>
                <option value="o1">Colegio San Agustin</option>
                <option value="o2">Colegio Santa Teresa</option>
                <option value="o3">Colegio Bayard</option>
                <option value="o4">Colegio San Agustin</option>
                <option value="o5">Colegio Lange Ley</option>
                </select> */}
            </div>
        </div>
        <div className="ordenar">
            <h2>Ordenar por</h2>
            <div className='input-box3'>
                <input type="checkbox" />
                <label>Precio de menor a mayor</label>
            </div>          
            <div className='input-box3'>
                <input type="checkbox" />
                <label>Precio de mayor a menor</label>
            </div>
            <div className='input-box3'>
                <input type="checkbox" />
                <label>Fecha de publicacion</label>
            </div>
            <div className='input-box3'>
                <input type="checkbox" />
                <label>A-Z</label>
            </div>
            <div className='input-box3'>
                <input type="checkbox" />
                <label>Z-A</label>
            </div>
        </div>
  </div>

  )
}

export default Sidebar