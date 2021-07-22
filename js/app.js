const DOMcardRows = $("#cardRows");
const DOMcontador = $("#contador");
const DOMCarrito = $("#carrito");
const DomTotalCarrito = $("#total");
const DOMBotonVaciar = $("#botonVaciar");
const baseDeDatos = [
    {
        id: 1,
        nombre: "Sombreros tipo vaquero",
        precio: 800,
        tipo: "sombrero",
        imagen: "assets/imagenes/Productos/sombreros.jpg"
    },
    {
        id: 2,
        nombre: "Remera Standard Blanca o Negra",
        precio: 1200,
        tipo: "remera",
        imagen: "https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    },

    {
        id: 3,
        nombre: "Remera Nirvana",
        precio: 1499,
        tipo: "remera",
        imagen: "assets/imagenes/Productos/remera_nirvana.jpg",

    },

    {
        id: 4,
        nombre: "Medias de invierno",
        precio: 700,
        tipo: "medias",
        imagen: "https://images.pexels.com/photos/251454/pexels-photo-251454.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
    },

    {
        id: 5,
        nombre: "Media para chicxs",
        precio: 500,
        tipo: "medias",
        imagen: "assets/imagenes/Productos/medias ralladas.jpg"
    },

    {
        id: 6,
        nombre: "Combo zapato + camisa",
        precio: 9000,
        tipo: "zapato, camisa",
        imagen: "https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
    },

    {
        id: 7,
        nombre: "Conjunto para bebes completo",
        precio: 3000,
        tipo: "combo",
        imagen: "https://images.pexels.com/photos/3671111/pexels-photo-3671111.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
    },

    {
        id: 8,
        nombre: "Conjunto Casual para niñas Completo",
        precio: 5000,
        tipo: "combo",
        imagen: "https://images.pexels.com/photos/5623054/pexels-photo-5623054.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
    }
];

let arrayCarrito = [];
let total = 0;

function agregarCarrito(evento) {
    arrayCarrito.push(evento.target.getAttribute('marcador'));
    contadorCarro();
    renderCarrito();
    sumaTotal();
    guardarCarritoEnLocalStorage()
};

//Toma el length del array del carrito para sumar al contador del carrito.
function contadorCarro() {
    let contadorCarro = arrayCarrito.length;
    DOMcontador.text(contadorCarro) ;
};

function renderCarrito() {

    DOMCarrito.text("");
    // Saco los duplicados del arrayCarrito
    const carritoSinDuplicados = [...new Set(arrayCarrito)]; //convierte el array carrito en un SET que hace que no se repitan las mismas entradas

    carritoSinDuplicados.forEach((item) => {
        // Busco el item que necesita del array de base de datos
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            // ¿Coincide las id? Solo puede existir un caso, pasamos a Int el item por que el numero que consigue del atributo asignado al boton es de tipo string y sino no lo puede comparar
            return itemBaseDatos.id === parseInt(item);
        });
        //Cuenta el número de veces que se repite el producto
        const numeroUnidadesItem = arrayCarrito.reduce((total, itemId) => {
            // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
            return itemId === item ? total += 1 : total;
        }, 0);


        //Nodo del item del carrito

        // let itemCarro = document.createElement("li");
        // itemCarro.classList.add("list-group-item");
        // itemCarro.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - $${miItem[0].precio}`

        

        DOMCarrito.append(`<li class="list-group-item">${numeroUnidadesItem} x ${miItem[0].nombre} - $${miItem[0].precio}</li>`);
    });


};

function sumaTotal() {
    total = 0;
    //Obtento los elementos segun el id
    arrayCarrito.forEach(elemento => {
        const item = baseDeDatos.filter((itemBaseDatos) => {
            //comparo el id con el atributo del elemento
            return itemBaseDatos.id === parseInt(elemento);
        });
        total = total + item[0].precio;
    });
    DomTotalCarrito.text(total.toFixed(2)) //para que siempre tenga .00 en el final del precio
};


//Funcion de render, la imagen viene como un string con un URL local o internet. El atributo src se le agrega al html
function renderHTML() {

    baseDeDatos.forEach(element => {

        const cardContainer = document.createElement("div");
        cardContainer.classList.add("col", "mb-5");

        const cardBody = document.createElement("div");
        cardBody.classList.add("card", "h-100");

        const imgCard = document.createElement("img");
        imgCard.classList.add("card-img-top")
        imgCard.setAttribute("src", element.imagen);

        const cardDetails = document.createElement("div");
        cardDetails.classList.add("card-body", "p-4", "text-center");

        const productName = document.createElement("h5");
        productName.classList.add("fw-bolder");
        productName.innerText = element.nombre;

        const productPrice = document.createElement("div")
        productPrice.innerText = `$${element.precio}`;

        const cardActionContainer = document.createElement("div");
        cardActionContainer.classList.add("card-footer", "p-4", "pt-0", "border-top-0", "bg-transparent", "text-center");

        const cardAction = document.createElement("button");
        cardAction.classList.add("btn", "btn-outline-dark", "mt-auto");
        cardAction.innerText = "Agregar al carrito";
        cardAction.setAttribute("marcador", element.id);
        cardAction.addEventListener("click", agregarCarrito);

        DOMcardRows.append(cardContainer);
        cardContainer.appendChild(cardBody);
        cardBody.appendChild(imgCard);
        cardBody.appendChild(cardDetails);
        cardBody.appendChild(cardActionContainer);
        cardActionContainer.appendChild(cardAction);
        cardDetails.appendChild(productName);
        cardDetails.appendChild(productPrice);

    });
};

function renderHTMLjQuery() {
    baseDeDatos.forEach(e => {

        DOMcardRows.append(`
        <div class="col mb-5">
        <div class="card h-100">
            <img class="card-img-top" src="${e.imagen}" alt="..." />
            <div class="card-body p-4 text-center">

                <h5 class="fw-bolder">${e.nombre}</h5>
                <div>${e.precio}</div>

            </div>
            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent text-center">
                <button class="btn btn-outline-dark mt-auto agregarCarrito" marcador="${e.id}">Agregar al Carrito</button>
                
            </div>
        </div>
    </div>`)

            ;
    })
}


function guardarCarritoEnLocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(arrayCarrito));
}

function cargarCarritoDeLocalStorage() {
    let carritoLocalStorage = localStorage.getItem("carrito");
    // ¿Existe un carrito previo guardado en LocalStorage?
    if (carritoLocalStorage !== null) {
        // Carga la información
        arrayCarrito = JSON.parse(carritoLocalStorage);
    }
}

//Inicio del programa
cargarCarritoDeLocalStorage();
//renderHTML();
renderHTMLjQuery();
sumaTotal();
contadorCarro();
renderCarrito();


//Eventos
DOMBotonVaciar.on("click",function vaciarCarrito() {
    arrayCarrito = [];
    renderCarrito();
    sumaTotal();
    contadorCarro();
    localStorage.clear();

});

$(".agregarCarrito").on("click", agregarCarrito)