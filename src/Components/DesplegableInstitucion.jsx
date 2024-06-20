import React, { useState, useEffect, useRef } from 'react';
import '../Styles/DesplegableInstitucion.css';
import { IoMdArrowDropright } from "react-icons/io";

const DesplegableInstitucion = ({handleFiltroChange}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [filters, setFilters] = useState({
    SanAgustin: false,
    Guadalupe: false,
    Bayard: false,
    LangeLey: false,
    Otro: false,
  });

  const filterNames = {
    SanAgustin: 'Colegio San Agustín',
    Guadalupe: 'Colegio Guadalupe',
    Bayard: 'Colegio Bayard',
    LangeLey: 'Colegio Lange Ley',
    Otro: 'Otro',
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
    handleFiltroChange("institucion", event.target.name)
  }

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button onClick={toggleDropdown} className="dropbtn">
        <IoMdArrowDropright />Institución
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

export default DesplegableInstitucion;
