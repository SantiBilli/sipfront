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
import { OrdenarMaterial } from '../Components/OrdenarMaterial'

const Inicio = () => {
  
  const [arr, setArr] = useState([])
  const navigate = useNavigate()

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
  
      setArr(response)
    }

    sendTokenToServer()
    handlePosts()

    // setArr(arr.filter((url) => url.institucion === "Colegio Lange Ley"))
  },[])

  return (
      <div className='inicio-box'>
        <Header/>
        <Sidebar ordenarPor={setOrdenar}/>
        <div className='filtros-inicio'>
          <button>Filtros<FaFilter className='logo-filtro'/></button>
          <button>Ordenar Por<GoArrowSwitch className='logo-filtro'/></button>
        </div>
        <div className='conteiner'>
          <div className='grid-productos'>
            
            {/* {arr.length > 0 && <OrdenarMaterial arr={arr} ordenarPor={ordenar}/>}  */}


            {ordenar === "A-Z" && arr.sort((a, b) => a.nombreProd.localeCompare(b.nombreProd)).map((url) => (
              <div className="displayImages" key={url.postId}>
                  <Card url={url}/>
              </div>
            ))}
            {ordenar === "Z-A" && arr.sort((a, b) => b.nombreProd.localeCompare(a.nombreProd)).map((url) => (
              <div className="displayImages" key={url.postId}>
                  <Card url={url}/>
              </div>
            ))}
            {ordenar == "ASC" && arr.sort((a, b) => a.precio - b.precio).map((url) => (
              <div className="displayImages" key={url.postId}>
                <Card url={url}/>
              </div>
            ))}
            {ordenar == "DSC" && arr.sort((a, b) => b.precio - a.precio).map((url) => (
              <div className="displayImages" key={url.postId}>
                <Card url={url}/>
              </div>
            ))}
            {ordenar == "DATE" && arr.sort((a, b) => new Date(a.fecha) - new Date(b.fecha)).map((url) => (
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