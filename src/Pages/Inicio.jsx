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
import Carrousel from '../Components/Carrousel'
import "../Styles/Carrousel.css";
import { obtenerDatosPerfil } from '../utils/api/obtenerDatos'

const Inicio = () => {
  
  const [arrOrdenada, setArrOrdenada] = useState([]);
  const [arr, setArr] = useState([])
  const [arrRecomendados, setArrRecomendados] = useState([])
  const [anoLectivo, setAnoLectivo] = useState([])
  const navigate = useNavigate()

  const [busqueda, setBusqueda] = useState("");
  const [ordenar, setOrdenar] = useState("RELEVANTE");

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

      setArrRecomendados(response)
  
      setArr(response.sort((a, b) => {
        if (a.recomendado === b.recomendado) {
            return new Date(a.fecha) - new Date(b.fecha);
        }
        return a.recomendado === 'S' ? -1 : 1;
    }))
    
    }

    const handlePostsRecomendados = async () => {
      
      const response = await obtenerDatosPerfil();

      if (response == 204) return console.log("Error al obtener los datos");

      setAnoLectivo(response.anoLectivo)
    }
    
    sendTokenToServer()
    handlePosts()
    handlePostsRecomendados()

  },[])

  useEffect(() => {
    
    if (ordenar === "A-Z") return setArr([...arr].sort((a, b) => a.nombreProd.localeCompare(b.nombreProd)))
    if (ordenar === "Z-A") return setArr([...arr].sort((a, b) => b.nombreProd.localeCompare(a.nombreProd)))
    if (ordenar === "ASC") return setArr([...arr].sort((a, b) => a.precio - b.precio))
    if (ordenar === "DSC") return setArr([...arr].sort((a, b) => b.precio - a.precio))
    if (ordenar === "DATE") return setArr([...arr].sort((a, b) => new Date(a.fecha) - new Date(b.fecha)))
    if (ordenar === "RELEVANTE") return setArr([...arr].sort((a, b) => {
      if (a.recomendado === b.recomendado) {
          return new Date(a.fecha) - new Date(b.fecha);
      }
      return a.recomendado === 'S' ? -1 : 1;
  }))
      
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
    if (valor == "Otro") valor = "Otra"

    if (valor == "LenguayLiteratura") valor = "Lengua y Literatura"
    if (valor == "FisicaQuimica") valor = "Física / Química"
    if (valor == "Matematica") valor = "Matemática"
    if (valor=="Musica") valor = "Música"
    
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

  const publicacionesAnoLectivo = arrRecomendados.filter(publicacion => publicacion.ano == anoLectivo);


  return (
      <div className='inicio-box'>

        <Header2 busqueda={setBusqueda}/>

        <Sidebar ordenarPor={setOrdenar} handleFiltroChange={handleFiltroChange}/>
        <ResponsiveSidebar setOrdenar={setOrdenar} handleFiltroChange={handleFiltroChange}/>

        <div className="containerInicio">

          <div className="recomendados" style={publicacionesAnoLectivo.length > 0 ? {display: 'flex', flexDirection: 'column'} : {display: 'none'}}>
            <div className='boxArribaRecomendados'>
              <h2 style={{fontFamily: 'Poppins', fontSize: '25px', marginTop: '33px'}}>Recomendados</h2>
              <hr className='barra-inicio-recomendado-grid'/>
            </div>


            <div className="carrousel">
              <Carrousel publicaciones={publicacionesAnoLectivo}/>
            </div>
            
            <hr className='barra-inicio-recomendado-grid'/>
          </div>
        

          <div className='conteiner'>
            <div className='grid-productos'>

              {publicacionesFiltradas.map((url) => (
                <div className="displayImages" key={url.postId}>
                    <Card url={url}/>
                </div>
              ))}

            </div>
          </div>
        </div>

        <Footer/>
      </div>
  )
}

export default Inicio