import React, { useEffect, useState } from 'react'
import '../Styles/Upload.css'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import { fileUpload } from "../utils/api/fileUpload"
import { useNavigate } from 'react-router-dom'
import { sendToken } from "../utils/api/checkToken"

const Upload = () => {
  
  const navigate = useNavigate()

  const [archivo, setArchivo] = useState(null)
  const [nombre, setNombre] = useState("")
  const [desc, setDesc] = useState("")
  const [precio, setPrecio] = useState()
  const [error, setError] = useState(false)
  const [mostrarBoton, setMostrarBoton] = useState(false)

  const [institucion, setInstitucion] = useState("DEFAULT")
  const [zona, setZona] = useState("DEFAULT")
  const [materia, setMateria] = useState("DEFAULT")
  const [ano, setAno] = useState("DEFAULT")

  useEffect(() => {

    if (nombre == "") return setMostrarBoton(false)
    if (desc == "") return setMostrarBoton(false)
    if (precio == "") return setMostrarBoton(false)
    if (archivo == null) return setMostrarBoton(false)
    if (institucion == "DEFAULT") return setMostrarBoton(false)
    if (zona == "DEFAULT") return setMostrarBoton(false)
    if (materia == "DEFAULT") return setMostrarBoton(false)
    if (ano == "DEFAULT") return setMostrarBoton(false)

    return setMostrarBoton(true)
  }, [nombre, desc, precio, archivo, institucion, zona, materia, ano])

  useEffect(() => {
    const token = localStorage.getItem('userToken')
    if (!token) return navigate("/login")
    
    const sendTokenToServer = async () => {
      const response = await sendToken(token)
      if (response == false) return navigate('/login')
    }

    sendTokenToServer()
    },[])

  const handleUpload = async () => {
    const userData = JSON.parse(localStorage.getItem("userData")).userId
    const formdata = new FormData();

    formdata.append('file', archivo)
    formdata.append('nameProd', nombre)
    formdata.append('description', desc)
    formdata.append('price', precio)
    formdata.append('userId', userData)
    formdata.append('institucion', institucion)
    formdata.append('zona', zona)
    formdata.append('materia', materia)
    formdata.append('ano', ano)

    const response = await fileUpload(formdata)

    if (response == 204) return setError(true)

    navigate("/dashboard")
    return setError(false)
    }

  return (
    <>
      <Header/>
      <div className='publicar'>
          <h2>¿Qué vas a publicar?</h2>
          <div className='publicar-row'>
            <div className='publicar-datos'>
              <div className="input-box2">
                <label>Nombre:</label>
                <input type="text" required onChange={event => setNombre(event.target.value)}/>
              </div> 
              <div className="input-box-description-publicar">
                <label>Descripción:</label>
                <textarea name="" id="" onChange={event => setDesc(event.target.value)}></textarea>
              </div> 
              <div className="input-box2">
                <label>Precio:</label>
                <input type="number" required onChange={event => setPrecio(event.target.value)}/>
              </div> 
              <div className="input-box2">
                <label>Adjuntar Imagen:</label>
                <input type="file" required accept="image/png" onChange={event => setArchivo(event.target.files[0])}/>
              </div> 
            </div>
            <hr className='barra'/>
            <div className="publicar-caracteristicas">
              <div className='desplegable'>
                <label>Institución: </label>
                <select name="Institucion" defaultValue={institucion} id="" onChange={(event) => setInstitucion(event.target.value)}>
                  <option value="DEFAULT" disabled hidden>Seleccionar</option>
                  <option>San Agustín</option>
                  <option>Guadalupe</option>
                  <option>Bayard</option>
                  <option>Lange Ley</option>
                  <option>Otra</option>
                </select>
              </div>
              <div className='desplegable'>
                <label>Zona: </label>
                <select name="Zona" defaultValue={zona} id="" onChange={(event) => setZona(event.target.value)}>
                  <option value="DEFAULT" disabled hidden>Seleccionar</option>
                  <option>Palermo</option>
                  <option>Recoleta</option>
                  <option>Otra</option>
                </select>
              </div>
              <div className='desplegable'>
                <label>Materia: </label>
                <select name="Materia" defaultValue={materia} id="" onChange={(event) => setMateria(event.target.value)}>
                  <option value="DEFAULT" disabled hidden>Seleccionar</option>
                  <option>Matemática</option>
                  <option>Lengua y Literatura</option>
                  <option>Música</option>
                  <option>Física / Química</option>
                  <option>Otra</option>
                </select>
              </div>
              <div className='desplegable'>
                <label>Año Académico: </label>
                <select name="Año" defaultValue={ano} id="" onChange={(event) => setAno(event.target.value)}>
                  <option value="DEFAULT" disabled hidden>Seleccionar</option>
                  <option>Primaria</option>
                  <option>Primer Año</option>
                  <option>Segundo Año</option>
                  <option>Tercer Año</option>
                  <option>Cuarto Año</option>
                  <option>Quinto Año</option>
                </select>
              </div>
            </div>
          </div>
          <button className="button-publicar" disabled={!mostrarBoton} style = { mostrarBoton ? {display: 'block'} : {display: 'none'}} onClick={handleUpload}>Publicar</button>

          {error ? <h1>Ocurrio un error.</h1> : null}
      </div>
      <Footer/>
    </>
  )
}

export default Upload