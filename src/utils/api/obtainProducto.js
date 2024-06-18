//http://localhost:3500/api/obtain-product
//https://sipback-production.up.railway.app/api/obtain-product

export const obtainProductDetail = async (credentials) => {

    const id = credentials.id

    const response = await fetch("http://localhost:3500/api/obtain-product", {
        method: "POST",
        mode: "cors",
        headers: {"Content-Type": "application/json", "Authorization":`Bearer ${credentials.token}`},
        body: JSON.stringify({id})
    })

    if (response.status == 204) return 204

    return response.json()
}
