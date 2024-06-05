export const fileUpload = async (formdata) => {
    const token = localStorage.getItem("userToken")
    if (!token) return

    const response = await fetch("https://sipback-production.up.railway.app/api/upload", {
        method: "POST",
        mode: "cors",
        headers: {"Authorization":`Bearer ${token}`},
        body: formdata
    })

    if (response.status == 204) return 204;

    return true
}

export const getPosts = async () => {
    const token = localStorage.getItem("userToken")

    const response = await fetch("https://sipback-production.up.railway.app/api/get-posts", {
        method: "GET",
        mode: "cors",
        headers: {"Authorization":`Bearer ${token}`}
    })

    if (!response.ok) return false

    return response.json()
}