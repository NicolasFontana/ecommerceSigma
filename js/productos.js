$(document).ready(function() {
  console.log("El DOM esta ready")
})

// Nodos
let paginaModelos = document.getElementById('modelos');
const modalAbrir = $('#modalAbrir');
const modalContainer = document.getElementById('modalContainer');
const carritoContenedor = document.getElementById('carritoContenedor');
const modal = document.getElementById('modal');
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
  console.log("estoy aca")
  if (storage != "" && storage != null) {
    carrito = storage;
    console.log("entre")
    console.log(carrito)
    actualizarCarrito();
  }
}

// Cargar productos a la pag

let carrito = [];
console.log(carrito)

productosCargados.forEach( (producto) =>  {
let productoX = document.createElement('div');
  productoX.innerHTML = `<div class="card" style="width: 30rem;">
                            <img src="../../src/multimedia/fotos/productos/${producto.imagen}" class="card-img-top" alt="...">
                            <div class="card-body p-3">
                              <h3 class="card-title">${producto.nombre}</h3>
                              <p class="card-text fs-4">Precio: <strong>$${producto.precio}</strong></p>
                              <a class="btn btn-primary fs-4 botonAgregarAlCarrito py-2" id="agregar${producto.id}">Agregar al carrito</a>
                            </div>
                          </div>`
  productoX.className = "col-xl-4 col-md-6 col-sm-6 py-3";
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
});

const agregarAlCarrito = (prodId) => {
  const itemProductos = productosCargados.find ( (prod) => prod.id === prodId)

  for (let i = 0 ; i < carrito.length; i++) {
    if ( carrito[i].id === prodId) {
      carrito[i].cantidad ++;
      console.table(carrito);
      actualizarCarrito ();
      return null
    }
  }

  carrito.push(itemProductos);
  actualizarCarrito ();
}

const eliminarDelCarrito = (prodId) => {
  const item = carrito.find ( (prod) => prod.id === prodId);
  const indice = carrito.indexOf(item);
  console.log(indice);
  carrito.splice(indice, 1);
  actualizarCarrito();
}

// Modal

modalAbrir.on('click', function() {
  modalContainer.classList.toggle('modalActive');
})

modalCerrar.addEventListener('click', () => {
  modalContainer.classList.toggle('modalActive');
})

// modalContainer.addEventListener('click', () => {
//   modalContainer.classList.toggle('modalActive')
// })

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

// Vaciar carrito

vaciarCarrito.addEventListener('click', () => {
  carrito.length = 0;
  actualizarCarrito();
})

// Cambio de página
let paginaNavegador = document.createElement('div')
paginaNavegador.innerHTML = `<nav aria-label="Page navigation example">
<ul class="pagination justify-content-end pagination-lg">
  <li class="page-item disabled">
    <a class="page-link" href="#" aria-label="Previous">
      <span aria-hidden="true">&laquo;</span>
    </a>
  </li>
  <li class="page-item active"><a class="page-link" href="#">1</a></li>
  <li class="page-item"><a class="page-link" href="#">2</a></li>
  <li class="page-item"><a class="page-link" href="#">3</a></li>
  <li class="page-item">
    <a class="page-link" href="#" aria-label="Next">
      <span aria-hidden="true">&raquo;</span>
    </a>
  </li>
</ul>
</nav>`

paginaModelos.appendChild(paginaNavegador);





