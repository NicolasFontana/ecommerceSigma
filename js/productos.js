$(document).ready(function() {
  
})

// Nodos
let paginaModelos = document.getElementById('modelos');
const modalAbrir = $('#modalAbrir');
const modalContainer = document.getElementById('modalContainer');
const modal = document.getElementById('modal');
const carritoContenedor = document.getElementById('carritoContenedor');
let precioTotal = document.getElementById('precioTotal');
const vaciarCarrito = document.getElementById('vaciarCarrito');
const contadorCarrito = document.getElementById('contadorCarrito');

// Cargar modelos a localStorage

function guardarProductos (productos) {
  localStorage.setItem("productos", JSON.stringify(productos));
}
guardarProductos(productos);

function cargarModelos () {
  return JSON.parse(localStorage.getItem("productos"));
}

let productosCargados = cargarModelos();

// Guardar productos en carrito localStorage

function addLocalStorage () {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

window.onload = function readLocalStorage() {
  const storage = JSON.parse(localStorage.getItem('carrito'))
  if (storage != "" && storage != null) {
    carrito = storage;
    actualizarCarrito();
    modalVacio(carrito);
  }
}

// Cargar productos a la pag

let carrito = [];
function actualizarProductos (productosCargados) {
  paginaModelos.innerHTML = ""

  productosCargados.forEach( (producto) =>  {
  let productoX = document.createElement('div');
    productoX.innerHTML = `<div class="card cardProductos" style="width: 30rem;">
                              <img src="../../src/multimedia/fotos/productos/${producto.imagen}" class="card-img-top" alt="...">
                              <div class="card-body p-3">
                                <h3 class="card-title">${producto.nombre}</h3>
                                <p class="card-text fs-4">Precio: <strong>$${producto.precio}</strong></p>
                                <a class="btn btn-primary fs-4 botonAgregarAlCarrito py-2" id="agregar${producto.id}">Agregar al carrito</a>
                              </div>
                            </div>`
    productoX.className = "p-4";
    paginaModelos.appendChild(productoX);
    // Agregar al carrito
    const botonCarrito = document.getElementById(`agregar${producto.id}`);
    botonCarrito.addEventListener('click', () => {
      agregarAlCarrito(producto.id)
      let myToast = Toastify({
        text: `Agregaste ${producto.nombre} al carrito`,
        className: "carritoToast",
        offset: {
          x: 0, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
          y: 0, // vertical axis - can be a number or a string indicating unity. eg: '2em'
        },
        duration: 3000,
        destination: "./carrito.html",
        newWindow: false,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #FD885ED6, #fa8231)",
        },
        onClick: function(){} // Callback after click
      }).showToast();
    })
  })
};

actualizarProductos(productosCargados);

const agregarAlCarrito = (prodId) => {
  const itemProductos = productosCargados.find ( (prod) => prod.id === prodId)

  for (let i = 0 ; i < carrito.length; i++) {
    if ( carrito[i].id === prodId) {
      carrito[i].cantidad ++;
      actualizarCarrito ();
      return null
    }
  }

  carrito.push(itemProductos);
  actualizarCarrito ();
  modalVacio(carrito);
}

const eliminarDelCarrito = (prodId) => {
  const item = carrito.find ( (prod) => prod.id === prodId);
  const indice = carrito.indexOf(item);
  carrito.splice(indice, 1);
  actualizarCarrito();
  modalVacio(carrito);
}

// Modal

modalAbrir.on('click', function() {
  modalContainer.classList.toggle('modalActive');
})

modalCerrar.addEventListener('click', () => {
  modalContainer.classList.toggle('modalActive');
})

// Agregar productos del carrito al modal


const actualizarCarrito = () => {
  let acumulador = 0;
  carritoContenedor.innerHTML = ""

  carrito.forEach( (prod) => {
    const div = document.createElement('div');
    div.className = 'productoEnCarrito';
    div.innerHTML = `
                  <p class="nombreProductoCarrito">x${prod.cantidad} ${prod.nombre}</p>
                  <div class="precioTachito">
                    <p class="precioProductoCarrito">$${prod.precio}/u.</p>
                    <button onclick="eliminarDelCarrito(${prod.id})" class = "botonEliminar"><i class="far fa-trash-alt"></i></button>
                  </div>
    `
    carritoContenedor.append(div);
}) 
    let acumuladorCarrito = carrito.length;
    carrito.forEach( (prod) => {
      if (prod.cantidad > 1) {
        acumuladorCarrito = acumuladorCarrito + prod.cantidad - 1
      }
    } )
    contadorCarrito.innerHTML = acumuladorCarrito;
    acumulador = 0;
    carrito.forEach ( (prod) => {
      acumulador = acumulador + prod.precio * prod.cantidad;
    })
    precioTotal.innerText = `$${acumulador}`
    addLocalStorage();
}

// Si modal esta vacio mostrar mensaje

function modalVacio(carrito) {
  if (carrito[0] === undefined) {
    let divModalVacio = document.createElement('div');
    divModalVacio.innerHTML = `<p class="msjCarritoVacio">No hay productos en el carrito</p>
                              <a class="irAProductos" href="/src/paginas/productos.html"><button class="btnCarritoVacio mb-4">Ver productos</button></a>
    `
    carritoContenedor.appendChild(divModalVacio);
  }
}
modalVacio(carrito);

// Vaciar carrito

vaciarCarrito.addEventListener('click', () => {
  carrito.length = 0;
  actualizarCarrito();
  modalVacio(carrito);
})


// Filtrar por categoria
function filtroCategoria() {
  soportesNotebook.addEventListener ('click', () => {
    const soportesNotebook = document.getElementById('soportesNotebook');
    filtroSoportesNotebook = productosCargados.filter (prod => prod.categoria === "soportesNotebook");
    actualizarProductos(filtroSoportesNotebook);
  })

  soportesAuriculares.addEventListener ('click', () => {
    const soportesAuriculares = document.getElementById('soportesAuriculares');
    filtroSoportesAuriculares = productosCargados.filter (prod => prod.categoria === "soportesAuriculares");
    actualizarProductos(filtroSoportesAuriculares);
  })

  soportesCelular.addEventListener ('click', () => {
    const soportesCelular = document.getElementById('soportesCelular');
    filtroSoportesCelular = productosCargados.filter (prod => prod.categoria === "soportesCelular");
    actualizarProductos(filtroSoportesCelular);
  })

  macetas.addEventListener ('click', () => {
    const macetas = document.getElementById('macetas');
    filtroMacetas = productosCargados.filter (prod => prod.categoria === "macetas");
    actualizarProductos(filtroMacetas);
  })

  juguetes.addEventListener ('click', () => {
    const juguetes = document.getElementById('juguetes');
    filtroJuguete = productosCargados.filter (prod => prod.categoria === "juguete");
    actualizarProductos(filtroJuguete);
  })

  libro.addEventListener ('click', () => {
    const libro = document.getElementById('libro');
    filtroLibro = productosCargados.filter (prod => prod.categoria === "libro");
    actualizarProductos(filtroLibro);
  })

  toppers.addEventListener ('click', () => {
    const toppers = document.getElementById('toppers');
    console.log("click")
    filtroToppers = productosCargados.filter (prod => prod.categoria === "toppers");
    actualizarProductos(filtroToppers);
  })

  lapiceros.addEventListener ('click', () => {
    const lapiceros = document.getElementById('lapiceros');
    filtroLapicero = productosCargados.filter (prod => prod.categoria === "lapicero");
    actualizarProductos(filtroLapicero);
  })
}

filtroCategoria();







