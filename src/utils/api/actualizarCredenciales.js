export const actualizarCredenciales = async (credentials) => {

    const token = localStorage.getItem("userToken")
    if (!token) return

    const response = await fetch("http://localhost:3500/api/actualizar-credenciales", {
        method: "POST",
        mode: "cors",
        headers: {"Content-Type": "application/json", "Authorization":`Bearer ${token}`},
        body: JSON.stringify(credentials)
    })

    if (response.status == 204) return 204;

    return true
}
