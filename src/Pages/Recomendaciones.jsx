import React, { useEffect, useState } from 'react'
import '../Styles/Inicio.css'
import Header2 from '../Components/Header2'
import Sidebar from '../Components/Sidebar'
import Footer from '../Components/Footer'
import Card from '../Components/Card'
import { useNavigate } from 'react-router-dom'
import { sendToken } from "../utils/api/checkToken"
import { getPosts } from "../utils/api/fileUpload"
import ResponsiveSidebar from '../Components/ResponsiveSidebar'

const Recomendaciones = () => {
  
  const [arrOrdenada, setArrOrdenada] = useState([]);
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
    setArrOrdenada(filtered);
  }, [busqueda, arr]);

  //Filtros
  const [filtros, setFiltros] = useState({
    institucion: [],
    zona: [],
    materia: [],
    año: []
  });

  const handleFiltroChange = (tipo, valor) => {

    const filtroActual = filtros[tipo]

    if (valor == "SanAgustin") valor = "San Agustín"
    if (valor == "LangeLey") valor = "Lange Ley"

    if (valor == "LenguayLiteratura") valor = "Lengua y Literatura"
    if (valor == "FisicaQuimica") valor = "Física / Química"

    if (valor == "PrimerAño") valor = "Primer Año"
    if (valor == "SegundoAño") valor = "Segundo Año"
    if (valor == "TercerAño") valor = "Tercer Año"
    if (valor == "CuartoAño") valor = "Cuarto Año"
    if (valor == "QuintoAño") valor = "Quinto Año"

    const nuevoFiltro = filtroActual.includes(valor)
         ? filtroActual.filter(item => item !== valor)
         : [...filtroActual, valor];

    setFiltros(
      {...filtros, [tipo]: nuevoFiltro}
    )

  };

  // useEffect(() => {
  //   console.log("Filtros Actuales: ", filtros);
  // }, [filtros]);

  const publicacionesFiltradas = arrOrdenada.filter(publicacion => {
    const filtroInstitucion = filtros.institucion.length === 0 || filtros.institucion.includes(publicacion.institucion);
    const filtroZona = filtros.zona.length === 0 || filtros.zona.includes(publicacion.zona);
    const filtroMateria = filtros.materia.length === 0 || filtros.materia.includes(publicacion.materia);
    const filtroAño = filtros.año.length === 0 || filtros.año.includes(publicacion.ano);
    return filtroInstitucion && filtroZona && filtroMateria && filtroAño;
  });

  return (
      <div className='inicio-box'>

        <Header2 busqueda={setBusqueda}/>

        <div style={{display: 'flex', flexDirection: 'column'}} className='conteiner'>
            <h2 style={{fontFamily: 'Poppins', padding: '10px', marginBottom: 0}}>Recomendaciones</h2>
            <div>        
                <Sidebar ordenarPor={setOrdenar} handleFiltroChange={handleFiltroChange}/>
                <ResponsiveSidebar setOrdenar={setOrdenar} handleFiltroChange={handleFiltroChange}/>
            </div>
            <div className='grid-productos'>

            {publicacionesFiltradas.map((url) => (
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

export default Recomendaciones