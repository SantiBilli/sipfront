import { BACK_ENDPOINT } from "../../../config.js"
export const olvideConstraseñaForm = async (credentials) => {
    // console.log(credentials)
    const response = await fetch(`${BACK_ENDPOINT}/api/olvide-contrasena`, {
        method: "POST",
        mode: "cors",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(credentials)
    })

    if (response.status == 501) return false;

    return true
}