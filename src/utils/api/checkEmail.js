import { BACK_ENDPOINT } from "../../../config.js"
export const sendCheckEmail = async (credentials) => {

    const response = await fetch(`${BACK_ENDPOINT}/api/check-email`, {
        method: "POST",
        mode: "cors",
        headers: {"Content-Type": "application/json"}, //Indica al servidor que le esoty mandando un json / Si le mando una imagen en binario seria image...
        body: JSON.stringify(credentials)
    })

    if (response.status == 204) return 204;

    return true
}