const cardRows = document.getElementById("cardRows")


const baseDeDatos = [
    {
        id:1 ,
        nombre: "Sombrero tipo vaquero",
        precio: 800,
        tipo:"sombrero",
        imagen: "assets/imagenes/Productos/sombreros.jpg"
    },
    {
        id:2,
        nombre: "Remera"
    }
]

function renderHTML (imgSource , precio) {
    let cardContainer = document.createElement("div");
    cardContainer.classList.add("col", "mb-5");


    let cardBody = document.createElement("div");
    cardBody.classList.add("card", "h-100");

    let imgCard = document.createElement("img");
    imgCard.classList.add("card-img-top")
    imgCard.setAttribute = "src", imgSource;

    let cardDetails = document.createElement("div");
    cardDetails.classList.add("card-body", "p-4", "text-center");
    cardDetails.innerText = precio;


}
