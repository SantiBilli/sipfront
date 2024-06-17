import Card from "./Card"

export const OrdenarMaterial = ({arr, ordenarPor}) => {

    const json = {
        "": arr,
        "A-Z": arr.sort((a, b) => a.nombreProd.localeCompare(b.nombreProd)),
        "Z-A": arr.sort((a, b) => b.nombreProd.localeCompare(a.nombreProd)),
        "ASC": arr.sort((a, b) => a.precio - b.precio),
        "DSC": arr.sort((a, b) => b.precio - a.precio),
        "DATE": arr.sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
    } 

    return (
        <>
            {arr.length > 0 && json[ordenarPor].map((url) => (
              <div className="displayImages" key={url.postId}>
                  <Card url={url}/>
              </div>
            ))}

        </>
    )
}