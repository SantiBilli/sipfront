import { BACK_ENDPOINT } from "../../../config.js"
export const obtainProductDetail = async (postId) => {

    const token = localStorage.getItem("userToken")

    const response = await fetch(`${BACK_ENDPOINT}/api/obtain-product`, {
        method: "POST",
        mode: "cors",
        headers: {"Content-Type": "application/json", "Authorization":`Bearer ${token}`},
        body: JSON.stringify(postId)
    })

    if (response.status == 204) return 204

    return response.json()
}
