//http://localhost:3500/api/login
//https://sipback-production.up.railway.app/api/login

export const sendLoginForm = async (credentials) => {

    const response = await fetch("http://localhost:3500/api/login", {
        method: "POST",
        mode: "cors",
        headers: {"Content-Type": "application/json"}, //Indica al servidor que le estoy mandando un json / Si le mando una imagen en binario seria image...
        body: JSON.stringify(credentials)
    })

    if (response.status == 401) return 401;

    return response.json()
}