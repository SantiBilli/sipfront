export const sendToken = async (token) => {

    const response = await fetch("https://sipback-production.up.railway.app/api/login/verify-token", {
        method: "GET",
        mode: "cors",
        headers: {"Content-Type": "application/json", "Authorization":`Bearer ${token}`}
    })

    if (!response.ok) return false
    return true
}