import React, { useState, useEffect, useRef } from 'react';
import '../Styles/DesplegableInstitucion.css';
import { IoMdArrowDropright } from "react-icons/io";

const DesplegableMateria = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [filters, setFilters] = useState({
    Matematica: false,
    LenguayLiteratura: false,
    Musica: false,
    FisicaQuimica: false,
    Otra: false,
  });

  const filterNames = {
    Matematica: 'Matematica',
    LenguayLiteratura: 'Lengua y Literatura',
    Musica: 'Musica',
    FisicaQuimica: 'Fisica / Quimica',
    Otra: 'Otra',
  };

  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setFilters(Object.keys(filters).reduce((acc, filter) => {
      acc[filter] = newSelectAll;
      return acc;
    }, {}));
  };

  const handleFilterChange = (e) => {
    const { name, checked } = e.target;
    setFilters({
      ...filters,
      [name]: checked
    });

    if (!checked) {
      setSelectAll(false);
    } else {
      setSelectAll(Object.values({ ...filters, [name]: checked }).every(Boolean));
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button onClick={toggleDropdown} className="dropbtn">
        <IoMdArrowDropright />Materia
      </button>
      <div className={`dropdown-content ${dropdownOpen ? 'show' : ''}`}>
        <label>
          <input
            type="checkbox"
            checked={selectAll}
            onChange={handleSelectAll}
          /> Seleccionar todo
        </label>
        {Object.keys(filters).map((filter) => (
          <label key={filter}>
            <input
              type="checkbox"
              name={filter}
              checked={filters[filter]}
              onChange={handleFilterChange}
              onClick={(event) => console.log(event.target.name)}
              className="filter-checkbox"
            /> {filterNames[filter]}
          </label>
        ))}
      </div>
    </div>
  );
};

export default DesplegableMateria;
