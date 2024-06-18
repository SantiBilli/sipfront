//http://localhost:3500/api/obtener-datos
//https://sipback-production.up.railway.app/api/obtener-datos

export const obtenerDatosPerfil = async () => {

    const token = localStorage.getItem("userToken")

    const response = await fetch("http://localhost:3500/api/obtener-datos", {
        method: "GET",
        mode: "cors",
        headers: {"Authorization":`Bearer ${token}`},
    })

    if (response.status == 204) return 204

    return response.json()
}
