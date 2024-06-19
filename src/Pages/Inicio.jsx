import React, { useEffect, useState } from 'react'
import '../Styles/Inicio.css'
import Header2 from '../Components/Header2'
import Sidebar from '../Components/Sidebar'
import Footer from '../Components/Footer'
import Card from '../Components/Card'
import { useNavigate } from 'react-router-dom'
import { sendToken } from "../utils/api/checkToken"
import { getPosts } from "../utils/api/fileUpload"
import { FaFilter } from "react-icons/fa";
import { GoArrowSwitch } from "react-icons/go";
import Filtros from '../Components/Filtros'

const Inicio = () => {
  
  const [filteredArr, setFilteredArr] = useState([]);
  const [arr, setArr] = useState([])
  const navigate = useNavigate()

  const [busqueda, setBusqueda] = useState("");
  const [ordenar, setOrdenar] = useState("A-Z");

  const handleFiltroChange = (value) => {
    console.log("Valor", value);
  };

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


  const [openFiltros, setOpenFiltros] = useState(false);

  const [openOrdenar, setOpenOrdenar] = useState(false);

  return (
      <div className='inicio-box'>
        <Header2 busqueda={setBusqueda}/>
        <Sidebar ordenarPor={setOrdenar} handleFiltroChange={handleFiltroChange}/>
        <div className='filtros-inicio'>


          <div className='relative-dropdown-filtros'>
            <button className = 'boton-filtros-responsive'onClick={() => setOpenFiltros((prev) => !prev)} >Filtros<FaFilter className='logo-filtro'/>
            </button>
            {
                     openFiltros && <Filtros/>
            }
          </div>
          
          <div className='relative-dropdown-filtros'>
            <button className = 'boton-filtros-responsive'onClick={() => setOpenOrdenar((prev) => !prev)} >Ordenar Por<GoArrowSwitch className='logo-filtro'/></button>
            {
                     openOrdenar && <>            
                     <div className="ordenar">
                        <h2>Ordenar por</h2>
                        <div className='input-box3'>
                            <input type="radio" name='orden' value="A-Z" onChange={(event) => {setOrdenar(event.target.value)}}/>
                            <label>A-Z</label>
                        </div>
                        <div className='input-box3'>
                            <input type="radio" name='orden' value="Z-A" onChange={(event) => {setOrdenar(event.target.value)}}/>
                            <label>Z-A</label>
                        </div>
                        <div className='input-box3'>
                            <input type="radio" name='orden' value="ASC" onChange={(event) => {setOrdenar(event.target.value)}}/>
                            <label>Precio ascendente</label>
                        </div>          
                        <div className='input-box3'>
                            <input type="radio" name='orden' value="DSC" onChange={(event) => {setOrdenar(event.target.value)}}/>
                            <label>Precio descendente</label>
                        </div>
                        <div className='input-box3'>
                            <input type="radio" name='orden' value="DATE" onChange={(event) => {setOrdenar(event.target.value)}}/>
                            <label>Fecha de publicacion</label>
                        </div>
                      </div></>
            }
          </div>
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