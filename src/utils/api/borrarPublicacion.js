import { BACK_ENDPOINT } from "../../../config.js"
export const borrarPublicacion = async (credentials) => {

    const token = localStorage.getItem("userToken")
    if (!token) return

    const response = await fetch(`${BACK_ENDPOINT}/api/borrar-publicacion`, {
        method: "POST",
        mode: "cors",
        headers: {"Content-Type": "application/json", "Authorization":`Bearer ${token}`},
        body: JSON.stringify(credentials)
    })

    if (response.status == 204) return 204;

    return true
}
