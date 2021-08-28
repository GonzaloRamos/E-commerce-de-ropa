//Clase Producto

class Producto {
  constructor(id, nombre, precio, tipo, imagen) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.tipo = tipo;
    this.imagen = imagen;
  }
}

//Constantes de DOM
const DOMcardRows = $("#cardRows");
const DOMcontador = $("#contador");
const DOMCarrito = $("#carrito");
const DomTotalCarrito = $("#total");
const DOMBotonVaciar = $("#botonVaciar");
const DOMCuotas = $("#cuotas");
const DOMComprar = $("#comprar");
const DOMBotonRemeras = $("#remeras");
const DOMInputNombre = $("#inputNombre");
const DOMInputPrecio = $("#inputPrecio");
const DOMInputCategoria = $("#inputCategoria");
//Arrays
const baseDeDatos = [
  {
    id: 1,
    nombre: "Sombreros tipo vaquero",
    precio: 800,
    tipo: "sombrero",
    imagen: "assets/imagenes/Productos/sombreros.jpg",
  },
  {
    id: 2,
    nombre: "Remera Standard Blanca o Negra",
    precio: 1200,
    tipo: "remera",
    imagen:
      "https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
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
    imagen:
      "https://images.pexels.com/photos/251454/pexels-photo-251454.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },

  {
    id: 5,
    nombre: "Media para chicxs",
    precio: 500,
    tipo: "medias",
    imagen: "assets/imagenes/Productos/medias ralladas.jpg",
  },

  {
    id: 6,
    nombre: "Combo zapato + camisa",
    precio: 9000,
    tipo: "combo",
    imagen:
      "https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },

  {
    id: 7,
    nombre: "Conjunto para bebes completo",
    precio: 3000,
    tipo: "combo",
    imagen:
      "https://images.pexels.com/photos/3671111/pexels-photo-3671111.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },

  {
    id: 8,
    nombre: "Conjunto Casual para niñas Completo",
    precio: 5000,
    tipo: "combo",
    imagen:
      "https://images.pexels.com/photos/5623054/pexels-photo-5623054.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
];

let arrayProductosUsuario = [];

let arrayCarrito = [];

let arrayUrls = [];

//Total Carrito
let total = 0;

//Funciones
function agregarCarrito(evento) {
  arrayCarrito.push(evento.target.getAttribute("marcador"));
  contadorCarro();
  renderCarrito();
  sumaTotal();
  guardarCarritoEnLocalStorage();
  habilitar();
}

//Toma el length del array del carrito para sumar al contador del carrito.
function contadorCarro() {
  let contadorCarro = arrayCarrito.length;
  DOMcontador.text(contadorCarro);
}

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
      return itemId === item ? (total += 1) : total;
    }, 0);

    DOMCarrito.append(
      `<li class="list-group-item">${numeroUnidadesItem} x ${
        miItem[0].nombre
      } - $${miItem[0].precio * numeroUnidadesItem}</li>`
    );
  });
}

function sumaTotal() {
  total = 0;
  //Obtento los elementos segun el id
  arrayCarrito.forEach((elemento) => {
    const item = baseDeDatos.filter((itemBaseDatos) => {
      //comparo el id con el atributo del elemento
      return itemBaseDatos.id === parseInt(elemento);
    });
    total = total + item[0].precio;
  });
  DomTotalCarrito.text(total.toFixed(2)); //para que siempre tenga .00 en el final del precio
  return total;
}

//Funcion de render, la imagen viene como un string con un URL local o internet. El atributo src se le agrega al html

function renderHTMLjQuery() {
  baseDeDatos.forEach((e) => {
    DOMcardRows.append(`
        <div class="col mb-5 slidedown">
        <div class="card h-100">
            <img class="card-img-top img" src="${e.imagen}" alt="..." />
            <div class="card-body p-4 text-center">

                <h5 class="fw-bolder">${e.nombre}</h5>
                <div>$${e.precio}</div>

            </div>
            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent text-center">
                <button class="btn btn-outline-dark mt-auto agregarCarrito" marcador="${e.id}">Agregar al Carrito</button>
                
            </div>
        </div>
    </div>`);
  });

  //Ahora renderizo el producto del usuario

  let productosUsuario = localStorage.getItem("productosUsuario");

  if (productosUsuario !== null) {
    arrayProductosUsuario = JSON.parse(productosUsuario);
    baseDeDatos.push(...arrayProductosUsuario);
    arrayProductosUsuario.forEach((e) => {
      DOMcardRows.append(`
          <div class="col mb-5 slidedown">
          <div class="card h-100">
              <img class="card-img-top img" src="${e.imagen}" alt="..." />
              <div class="card-body p-4 text-center">
  
                  <h5 class="fw-bolder">${e.nombre}</h5>
                  <div>$${e.precio}</div>
  
              </div>
              <div class="card-footer p-4 pt-0 border-top-0 bg-transparent text-center">
                  <button class="btn btn-outline-dark mt-auto agregarCarrito" marcador="${e.id}">Agregar al Carrito</button>
                  
              </div>
          </div>
      </div>`);
    });
  }
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

function cuotas() {
  //Saco el valor del select
  const cuotas = DOMCuotas.val();
  let total = (sumaTotal() / cuotas).toFixed(2);
  const subTotal = $("#subTotal");
  //Si el valor de cuotas es distinto a 1, remuevo y agrego nuevo valor
  if (cuotas != 1) {
    $("#subTotalCuotas").remove();
    subTotal.append(
      `<p class="text-center" id="subTotalCuotas">- vas a pagar en ${cuotas} cuotas de &dollar;${total}</p>`
    );
  } else {
    $("#subTotalCuotas").remove();
  }
}

function habilitar() {
  if (DOMCarrito.children().length > 0) {
    DOMCuotas.prop("disabled", false);
    DOMComprar.prop("disabled", false);
    DOMBotonVaciar.prop("disabled", false);
  } else {
    DOMCuotas.prop("disabled", true);
    DOMComprar.prop("disabled", true);
    DOMBotonVaciar.prop("disabled", true);
  }
}

function vaciarCarrito() {
  arrayCarrito = [];
  renderCarrito();
  sumaTotal();
  contadorCarro();
  DOMCuotas.val(1);
  cuotas();
  habilitar();
  localStorage.clear();
}

function comprar() {
  if (confirm("¿Deseas confirmar la compra?")) {
    txt = "Compra realizada con exito!";
    vaciarCarrito();
    window.location.reload();
  }
}

function filter(tipoDeProducto) {
  DOMcardRows.empty();

  if (tipoDeProducto === "todosLosProductos") {
    renderHTMLjQuery();
  } else {
    let filtroA = baseDeDatos.filter(
      (tipoProducto) => tipoProducto.tipo === tipoDeProducto
    );
    filtroA.forEach((e) => {
      DOMcardRows.append(`  
      <div class="col mb-5 slidedown">
        <div class="card h-100">
          <img class="card-img-top img" src="${e.imagen}" alt="..." />
          <div class="card-body p-4 text-center">
    
              <h5 class="fw-bolder">${e.nombre}</h5>
              <div>$${e.precio}</div>
    
          </div>
          <div class="card-footer p-4 pt-0 border-top-0 bg-transparent text-center">
              <button class="btn btn-outline-dark mt-auto agregarCarrito" marcador="${e.id}">Agregar al Carrito</button>
              
          </div>
        </div>
      </div>`);
    });
  }
  $(".agregarCarrito").on("click", agregarCarrito);
}

//Funciones de la pagina "subi tu producto"

function busquedaImagen(numeroPagina) {
  let busqueda = DOMInputCategoria.val();
  const DOMCreador = $("#creador");
  let DomCreadorChildrens = DOMCreador.children().length;

  if (DomCreadorChildrens > 0) {
    DOMCreador.empty();
  }

  $.get(
    `https:api.unsplash.com/search/photos?page=${numeroPagina}&query=${busqueda}&client_id=6jOe1shlCKU5MbgMiSbWZ73v365p9Lu0ZrFKKQOY17k`,
    function (respuesta, estado) {
      if (estado === "success") {
        let datosAPI = respuesta.results;

        datosAPI.forEach((element) => {
          let i = DOMCreador.children().length;
          $(`
             <div class="col mb-3 asd" id="cardBusqueda" style="display:none;">
               <div class="card" style="width: 18rem;">
                   <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault${i}" name="urlImagen" direccion="${element.urls.raw}" onclick="obtenerUrlImagen(this)" >
                   <label class="form-check-label" for="flexRadioDefault${i}" >
                     <img src="${element.urls.raw}" class="card-img-top img_search" alt="${element.alt_description}">
                   </label>
                 <div class="card-body">
                   <p class="card-text">Foto sacada por ${element.user.name} <br>Foto de libre uso.</p>
                 </div>
               </div>
             </div>`)
            .appendTo(DOMCreador)
            .fadeIn(1500);
        });
      }
    }
  );
}

function paginaBusqueda(evento) {
  let pagina = evento.target.getAttribute("pagina");
  if (pagina !== null) {
    return pagina;
  }
}

function obtenerUrlImagen(e) {
  arrayUrls.push(e.getAttribute("direccion"));
}

function agregarProductoUsuario(listaUrls) {
  let nombre = $("#inputProducto").val();

  let precio = Number($("#inputPrecio").val());

  let id = baseDeDatos.length + 1;

  let categoria = DOMInputCategoria.val();

  switch (categoria) {
    case "socks":
      categoria = "medias";
      break;

    case "hat":
      categoria = "sombrero";
      break;

    case "clothes":
      categoria = "combo";
      break;

    case "shirt":
      categoria = "remera";
      break;

    default:
      break;
  }

  let imagen = listaUrls[arrayUrls.length - 1];

  if (confirm("¿Revisaste bien?")) {
    arrayProductosUsuario.push(
      new Producto(id, nombre, precio, categoria, imagen)
    );
    localStorage.setItem(
      "productosUsuario",
      JSON.stringify(arrayProductosUsuario)
    );
    window.location.href = "./index.html";
  }
}

//Inicio del programa
cargarCarritoDeLocalStorage();
renderHTMLjQuery();
sumaTotal();
contadorCarro();
renderCarrito();
habilitar();

setInterval(() => {
  let nombre = $("#inputProducto").val().length;
  let precio = $("#inputPrecio").val().length;
  let categoria = DOMInputCategoria.val();
  if (nombre > 0 && precio > 0 && categoria) {
    $("#enviar").prop("disabled", false);
  }
}, 1000);

//Eventos
DOMBotonVaciar.on("click", vaciarCarrito);

$(".agregarCarrito").on("click", agregarCarrito);

DOMCuotas.change(cuotas);

DOMComprar.on("click", comprar);

$(".dropdown-item").click(function () {
  let atributoFiltro = $(this).attr("filtro");
  filter(atributoFiltro);
});

//Evento para cambiar el tipo de imagen en el creador de productos
DOMInputCategoria.change(busquedaImagen);

//Evento para conseguir un numero de pagina y pasarselo a lo API para que muestre mas imagenes
$(".breadcrumb-item").on("click", function (evento) {
  let numeroPagina = paginaBusqueda(evento);
  busquedaImagen(numeroPagina);
});

//Evento que agrega el producto al index

$("#enviar").click(function () {
  agregarProductoUsuario(arrayUrls);
});

$("#eliminar").click(() => {
  localStorage.clear("productosUsuario");
  alert("Productos eliminados con exito");
  window.location.reload();
});

//Animaciones

$("header").fadeIn(800, function () {
  $("#tituloPag").fadeIn("slow", function () {
    $("#subTituloPag").fadeIn("slow");
  });
});

$(".asd").fadeIn(800);
