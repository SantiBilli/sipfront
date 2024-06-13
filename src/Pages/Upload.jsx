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

  useEffect(() => {
    if (nombre == "") return setMostrarBoton(false)
    if (desc == "") return setMostrarBoton(false)
    if (precio == "") return setMostrarBoton(false)
    if (archivo == null) return setMostrarBoton(false)
    return setMostrarBoton(true)
  },[nombre, desc, precio, archivo])

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

    console.log();

    const response = await fileUpload(formdata)

    // for (const pair of formdata.entries()) {
    //   console.log(pair[0], pair[1]);
    // } //Muestro el formdata

    if (response == 204) return setError(true)
    
    return setError(false)
    }

  return (
    <>
      <Header/>
      <div className='publicar'>
          <h2>Hola nombre! Que vas a publicar?</h2>
          <div className='publicar-row'>
            <div className='publicar-datos'>
              <div className="input-box2">
                <label>Nombre:</label>
                <input type="text" required onChange={event => setNombre(event.target.value)}/>
              </div> 
              <div className="input-box-description-publicar">
                <label>Descripcion:</label>
                <textarea name="" id="" onChange={event => setDesc(event.target.value)}></textarea>
              </div> 
              <div className="input-box2">
                <label>Precio:</label>
                <input type="text" required onChange={event => setPrecio(event.target.value)}/>
              </div> 
              <div className="input-box2">
                <label>Adjuntar Imagen:</label>
                <input type="file" required accept="image/png" onChange={event => setArchivo(event.target.files[0])}/>
              </div> 
            </div>
            <hr className='barra'/>
            <div className="publicar-caracteristicas">
              <div className='desplegable'>
                <label>Institucion: </label>
                <select name="Institucion" id="">
                  <option>Colegio San Agustin</option>
                  <option>Colegio Santa Teresa</option>
                  <option>Colegio Bayard</option>
                  <option>Colegio Lange Ley</option>
                </select>
              </div>
              <div className='desplegable'>
                <label>Zona: </label>
                <select name="Institucion" id="">
                </select>
              </div>
              <div className='desplegable'>
                <label>Materia: </label>
                <select name="Institucion" id=""></select>
              </div>
              <div className='desplegable'>
                <label>Año Academico: </label>
                <select name="Institucion" id=""></select>
              </div>
            </div>
          </div>
          <button class="button-publicar" disabled={!mostrarBoton} onClick={handleUpload}>Publicar</button>

          {error ? <h1>Ocurrio un error.</h1> : null}
      </div>
      <Footer/>
    </>
  )
}

export default Upload