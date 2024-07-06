import { BACK_ENDPOINT } from "../../../config.js"
export const fotoPerfil = async (formdata) => {
    const token = localStorage.getItem("userToken")
    if (!token) return

    const response = await fetch(`${BACK_ENDPOINT}/api/foto-perfil`, {
        method: "POST",
        mode: "cors",
        headers: {"Authorization":`Bearer ${token}`},
        body: formdata
    })

    if (response.status == 204) return 204;
    if (response.status == 406) return 406;

    return response.json()
}

export const fotoPerfilReset = async (credentials) => {

    const token = localStorage.getItem("userToken")

    const response = await fetch(`${BACK_ENDPOINT}/api/foto-perfil-reset`, {
        method: "POST",
        mode: "cors",
        headers: {"Content-Type": "application/json", "Authorization":`Bearer ${token}`},
        body: JSON.stringify(credentials)
    })

    if (response.status == 204) return 204

    return true
}