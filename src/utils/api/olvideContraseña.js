export const olvideConstraseñaForm = async (credentials) => {
    // console.log(credentials)
    const response = await fetch("http://localhost:3500/api/olvide-contrasena", {
        method: "POST",
        mode: "cors",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(credentials)
    })

    if (response.status == 501) return false;

    return true
}