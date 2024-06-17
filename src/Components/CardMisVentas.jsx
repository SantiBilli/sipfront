import React, { useEffect, useState } from 'react'
import '../Styles/CardMisVentas.css'
import { actualizarEstado } from '../utils/api/actualizarEstado';
import { actualizarComprador } from '../utils/api/actualizarComprador';
import { sendCheckEmail } from '../utils/api/checkEmail';

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

    setRefreshAux((prev) => !prev);
    setEstado(value);

    if (value == "publicado") {
      const actualizar = await actualizarComprador({postId: infoVenta.postId, comprador: ""})
      setComprador("") 
    }

    const actualizar = await actualizarEstado({postId: infoVenta.postId, estado: value});

    if (actualizar == 204) return console.log("Error");
    
    return
  
  }

  const handleClickComprador = async (comprador) => {

    setComprador(comprador)

    const actualizar = await actualizarComprador({postId: infoVenta.postId, comprador: comprador});
    if (actualizar == 204) return console.log("Error");
    return
    
  }

  return (
    <div className='CardVentas'>
        <div className='left-mis-vetas'>
          <img className = 'imagen-mis-ventas' src={`http://localhost:3500/api/images/${infoVenta.imagen}`} alt="" />
          <hr className='barra-mis-ventas'/>
          <div className='medio-mis-ventas'>
            <p>Nombre: {infoVenta.nombreProd}</p>
            <p>Descripcion: {infoVenta.descripcionProd}</p>
            <p>Precio: ${infoVenta.precio}</p>
          </div>
        </div>
        <div className='right-mis-vetas'>
          <hr className='barra-mis-ventas'/>
          <div>
            <p>Fecha: {fechaFormatted}</p>

            <p>Estado:</p>
            <select name="Institucion" defaultValue={estado} id="" onChange={(event) => handleClickEstado(event.target.value)}>
                <option value={"publicado"}>Publicado</option>
                <option value={"reservado"}>Reservado</option>
                <option value={"vendido"}>Vendido</option>
            </select>
            
            { (estado == "vendido" || estado == "reservado") &&
            <>
              <p>Comprador:</p> 
              <input defaultValue={comprador} onChange={(event) => handleClickComprador(event.target.value)}/>
            </>}

            { (emailExists == false && estado != "publicado") && <p style={{color:"red"}}>Email Invalido</p> }

          </div>
        </div>
    </div>
  )
}

export default CardMisVentas