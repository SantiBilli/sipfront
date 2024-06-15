//http://localhost:3500/api/upload
//https://sipback-production.up.railway.app/api/upload
export const fileUpload = async (formdata) => {
    const token = localStorage.getItem("userToken")
    if (!token) return

    const response = await fetch("http://localhost:3500/api/upload", {
        method: "POST",
        mode: "cors",
        headers: {"Authorization":`Bearer ${token}`},
        body: formdata
    })

    if (response.status == 204) return 204;

    return true
}
//http://localhost:3500/api/get-posts
//https://sipback-production.up.railway.app/api/get-posts
export const getPosts = async () => {
    const token = localStorage.getItem("userToken")

    const response = await fetch("http://localhost:3500/api/get-posts", {
        method: "GET",
        mode: "cors",
        headers: {"Authorization":`Bearer ${token}`}
    })

    if (!response.ok) return false

    return response.json()
}