import { BACK_ENDPOINT } from "../../../config.js"
export const handleSoporte = async (formdata) => {
    const token = localStorage.getItem("userToken")
    if (!token) return

    const response = await fetch(`${BACK_ENDPOINT}/api/soporte`, {
        method: "POST",
        mode: "cors",
        headers: {"Authorization":`Bearer ${token}`},
        body: formdata
    })

    if (response.status == 204) return 204;

    return true
}