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
  
  const [arr, setArr] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('userToken')
    if (!token) return navigate("/login")
    
    const sendTokenToServer = async () => {
      const response = await sendToken(token)
      if (response == false) return navigate('/login')
    }

    const handlePosts = async () => {
      const response = await getPosts();
      
      // console.log(response);

      if (!response) return
  
      setArr(response)
    }

    sendTokenToServer()
    handlePosts()
  },[])
  
  return (
      <div className='inicio-box'>
        <Header/>
        <Sidebar/>
        <div className='filtros-inicio'>
          <button>Filtros<FaFilter className='logo-filtro'/></button>
          <button>Ordenar Por<GoArrowSwitch className='logo-filtro'/></button>
        </div>
        <div className='conteiner'>
          <div className='grid-productos'>
            {arr.map((url, index) => (
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