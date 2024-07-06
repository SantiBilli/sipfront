import { BACK_ENDPOINT } from "../../../config.js"
export const obtenerDatosPerfil = async () => {

    const token = localStorage.getItem("userToken")

    const response = await fetch(`${BACK_ENDPOINT}/api/obtener-datos`, {
        method: "GET",
        mode: "cors",
        headers: {"Authorization":`Bearer ${token}`},
    })

    if (response.status == 204) return 204

    return response.json()
}
