import React, { useEffect, useState } from 'react'
import '../Styles/Inicio.css'
import Header from '../Components/Header'
import Sidebar from '../Components/Sidebar'
import Footer from '../Components/Footer'
import Card from '../Components/Card'
import { useNavigate } from 'react-router-dom'
import { sendToken } from "../utils/api/checkToken"
import { getPosts } from "../utils/api/fileUpload"
import { FaFilter } from "react-icons/fa";
import { GoArrowSwitch } from "react-icons/go";

const Inicio = () => {
  
  const [filteredArr, setFilteredArr] = useState([]);
  const [arr, setArr] = useState([])
  const navigate = useNavigate()

  const [busqueda, setBusqueda] = useState("");
  const [ordenar, setOrdenar] = useState("A-Z");

  useEffect(() => {
    const token = localStorage.getItem('userToken')
    if (!token) return navigate("/login")
    
    const sendTokenToServer = async () => {
      const response = await sendToken(token)
      if (response == false) return navigate('/login')
    }

    const handlePosts = async () => {
      const response = await getPosts();

      if (!response) return
  
      setArr(response.sort((a, b) => a.nombreProd.localeCompare(b.nombreProd)))
    }

    sendTokenToServer()
    handlePosts()

  },[])

  useEffect(() => {
    
    if (ordenar === "A-Z") return setArr([...arr].sort((a, b) => a.nombreProd.localeCompare(b.nombreProd)))
    if (ordenar === "Z-A") return setArr([...arr].sort((a, b) => b.nombreProd.localeCompare(a.nombreProd)))
    if (ordenar === "ASC") return setArr([...arr].sort((a, b) => a.precio - b.precio))
    if (ordenar === "DSC") return setArr([...arr].sort((a, b) => b.precio - a.precio))
    if (ordenar === "DATE") return setArr([...arr].sort((a, b) => new Date(a.fecha) - new Date(b.fecha)))
      
  },[ordenar])

  useEffect(() => {
    const filtered = arr.filter(producto =>
      producto.nombreProd.toLowerCase().includes(busqueda.toLowerCase())
    );
    setFilteredArr(filtered);
  }, [busqueda, arr]);

  return (
      <div className='inicio-box'>
        <Header busqueda={setBusqueda}/>
        <Sidebar ordenarPor={setOrdenar}/>
        <div className='filtros-inicio'>
          <button>Filtros<FaFilter className='logo-filtro'/></button>
          <button>Ordenar Por<GoArrowSwitch className='logo-filtro'/></button>
        </div>
        <div className='conteiner'>
          <div className='grid-productos'>

            {filteredArr.map((url) => (
              <div className="displayImages" key={url.postId}>
                  <Card url={url}/>
              </div>
            ))}

          </div>
        </div>
        <Footer/>
      </div>
  )
}

export default Inicio