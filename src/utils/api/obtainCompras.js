//http://localhost:3500/api/obtain-compras
//https://sipback-production.up.railway.app/api/obtain-compras

export const obtainCompras = async () => {

    const token = localStorage.getItem("userToken")

    const response = await fetch("http://localhost:3500/api/obtain-compras", {
        method: "GET",
        mode: "cors",
        headers: {"Content-Type": "application/json", "Authorization":`Bearer ${token}`},
    })

    if (response.status == 204) return 204

    return response.json()
}
