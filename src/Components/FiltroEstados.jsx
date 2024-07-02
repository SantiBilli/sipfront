import React, { useState, useEffect, useRef } from 'react';
import { IoMdArrowDropright } from "react-icons/io";
import '../Styles/FiltrosEstados.css';

const DesplegableEstados = ({handleFiltroChange}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [filters, setFilters] = useState({
    Publicado: false,
    Reservado: false,
    Vendido: false,
  });

  const filterNames = {
    Publicado: 'Publicado',
    Reservado: 'Reservado',
    Vendido: 'Vendido'
  };

  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };


  const handleFilterChange = (e) => {
    const { name, checked } = e.target;
    setFilters({
      ...filters,
      [name]: checked
    });
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

  const handleClick = (event) => {
    handleFilterChange(event)
    handleFiltroChange(event.target.name)
  }

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button onClick={toggleDropdown} className="dropbtn-filtro-estados">
        <IoMdArrowDropright />Estado
      </button>
      <div className={`dropdown-content ${dropdownOpen ? 'show' : ''}`}>
        {Object.keys(filters).map((filter) => (
          <label key={filter}>
            <input
              type="checkbox"
              name={filter}
              checked={filters[filter]}
              onChange={(event) => handleClick(event)}
              className="filter-checkbox"
            /> {filterNames[filter]}
          </label>
        ))}
      </div>
    </div>
  );
};

export default DesplegableEstados;
