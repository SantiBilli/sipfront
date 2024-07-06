import { BACK_ENDPOINT } from "../../../config.js"
export const sendToken = async (token) => {

    const response = await fetch(`${BACK_ENDPOINT}/api/login/verify-token`, {
        method: "GET",
        mode: "cors",
        headers: {"Content-Type": "application/json", "Authorization":`Bearer ${token}`}
    })

    if (!response.ok) return false
    return true
}