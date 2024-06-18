//http://localhost:3500/api/obtain-ventas
//https://sipback-production.up.railway.app/api/obtain-ventas

export const obtainVentas = async () => {

    const token = localStorage.getItem("userToken")

    const response = await fetch("http://localhost:3500/api/obtain-ventas", {
        method: "GET",
        mode: "cors",
        headers: {"Content-Type": "application/json", "Authorization":`Bearer ${token}`},
    })

    if (response.status == 204) return 204

    return response.json()
}
