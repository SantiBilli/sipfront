import { BACK_ENDPOINT } from "../../../config.js"
export const obtainProductDetail = async (credentials) => {

    const id = credentials.id

    const response = await fetch(`${BACK_ENDPOINT}/api/obtain-product`, {
        method: "POST",
        mode: "cors",
        headers: {"Content-Type": "application/json", "Authorization":`Bearer ${credentials.token}`},
        body: JSON.stringify({id})
    })

    if (response.status == 204) return 204

    return response.json()
}
