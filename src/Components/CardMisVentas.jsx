import React, { useEffect, useState } from 'react'
import '../Styles/CardMisVentas.css'
import { actualizarEstado } from '../utils/api/actualizarEstado';
import { actualizarComprador } from '../utils/api/actualizarComprador';
import { sendCheckEmail } from '../utils/api/checkEmail';
import { FaTrash } from "react-icons/fa";
import { borrarPublicacion } from '../utils/api/borrarPublicacion';
import { BACK_ENDPOINT } from "../../../config.js"

const CardMisVentas = ({infoVenta, setRefreshAux}) => {

  const fechaFormatted = new Date(infoVenta.fecha).toLocaleDateString()

  const [estado, setEstado] = useState(infoVenta.estado);
  const [comprador, setComprador] = useState(infoVenta.comprador)
  const [emailExists, setEmailExists] = useState();


  useEffect(() => {
    const checker = async () => {
        await checkEmailAPI({comprador})
    }
    checker() 
  }, [comprador])

  const checkEmailAPI = async () => {
      const response = await sendCheckEmail({email: comprador})

      if (response == 204) {
          setEmailExists(false)
          return
      }
      setEmailExists(true)
  }

  const handleClickEstado = async (value) => {

    setEstado(value);

    if (value == "publicado") {
      const actualizar = await actualizarComprador({postId: infoVenta.postId, comprador: ""})
      setComprador("") 
    }

    const actualizar = await actualizarEstado({postId: infoVenta.postId, estado: value});

    setRefreshAux((prev) => !prev);

    if (actualizar == 204) return console.log("Error");
    
    return
  
  }

  const handleClickComprador = async (comprador) => {

    setComprador(comprador)

    const actualizar = await actualizarComprador({postId: infoVenta.postId, comprador: comprador});
    if (actualizar == 204) return console.log("Error");
    return
    
  }

  const handleClickBorrar = async () => {
    
    const response = await borrarPublicacion(({postId: infoVenta.postId, imagen: infoVenta.imagen}));

    if (response == 204) return console.log("Error al borrar la publicación");

    setRefreshAux((prev) => !prev);
  }

  return (
    <div className='CardVentas'>
        <div className='left-mis-vetas'>
          <img className = 'imagen-mis-ventas' src={`${BACK_ENDPOINT}/api/images/${infoVenta.imagen}`} alt="" />
          <hr className='barra-mis-ventas-left'/>
          <div className='medio-mis-ventas'>
            <p style={{maxWidth: "400px"}}>Nombre: {infoVenta.nombreProd}</p>
            <p style={{maxWidth: "1000px"}}>Descripción: {infoVenta.descripcionProd}</p>
            <p>Precio: ${infoVenta.precio}</p>
          </div>
        </div>
        <div className='right-mis-vetas'>
        <hr className='barra-mis-ventas-right'/>
          <div>
            <p>Fecha: {fechaFormatted}</p>

            <div className='estado-comprador-box'>
              <p>Estado:</p>
              <select name="Institucion" defaultValue={estado} id="" onChange={(event) => handleClickEstado(event.target.value)}>
                  <option value={"publicado"}>Publicado</option>
                  <option value={"reservado"}>Reservado</option>
                  <option value={"vendido"}>Vendido</option>
              </select>
            </div>
            
            { (estado == "vendido" || estado == "reservado") &&
            <div className='estado-comprador-box2'>
              <p>Comprador:</p> 
              <input className='input-comprador-mail' type="text" defaultValue={comprador} onChange={(event) => handleClickComprador(event.target.value)}/>
            </div>}

            { (emailExists == false && estado != "publicado") && <p style={{color:"red"}}>Email Invalido</p> }

          </div>
        </div>
        <p className='trash-mis-ventas' onClick={handleClickBorrar}><FaTrash/></p>
    </div>
  )
}

export default CardMisVentas