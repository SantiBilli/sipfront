import { BACK_ENDPOINT } from "../../../config.js"
export const fileUpload = async (formdata) => {
    const token = localStorage.getItem("userToken")
    if (!token) return

    try {
        const response = await fetch(`${BACK_ENDPOINT}/api/upload`, {
            method: "POST",
            mode: "cors",
            headers: {"Authorization":`Bearer ${token}`},
            body: formdata
        })
    
        if (response.status == 204) return 204;
        if (response.status == 406) return 406
    
        return true
    }
    catch (error) {
        alert(error)
        return false
    }
}

export const getPosts = async () => {
    const token = localStorage.getItem("userToken")

    const response = await fetch(`${BACK_ENDPOINT}/api/get-posts`, {
        method: "GET",
        mode: "cors",
        headers: {"Authorization":`Bearer ${token}`}
    })

    if (!response.ok) return false

    return response.json()
}