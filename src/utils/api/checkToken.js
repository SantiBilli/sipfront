export const sendToken = async (token) => {

    const response = await fetch("http://localhost:3500/api/login/verify-token", {
        method: "GET",
        mode: "cors",
        headers: {"Content-Type": "application/json", "Authorization":`Bearer ${token}`}
    })

    if (!response.ok) return false
    return true
}