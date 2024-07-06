import { BACK_ENDPOINT } from "../../../config.js"
export const obtainCompras = async () => {

    const token = localStorage.getItem("userToken")

    const response = await fetch(`${BACK_ENDPOINT}/api/obtain-compras`, {
        method: "GET",
        mode: "cors",
        headers: {"Content-Type": "application/json", "Authorization":`Bearer ${token}`},
    })

    if (response.status == 204) return 204

    return response.json()
}
