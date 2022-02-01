$(document).ready(function() {
  console.log("El DOM esta ready")
})

class Producto {
  constructor (valor) {
    this.nombre = valor.nombre;
    this.imagen = valor.imagen;
    this.precio = valor.precio;
  } 
}

function guardarProductos (productos) {
  localStorage.setItem("productos", JSON.stringify(productos));
}
guardarProductos(productos);

function cargarModelos () {
  return JSON.parse(localStorage.getItem("productos"));
}

let paginaModelos = document.getElementById('modelos');

let productosCargados = cargarModelos();

// Cargar productos a la pag

let carrito = [];

productosCargados.forEach( (producto) =>  {
let productoX = document.createElement('div');
  productoX.innerHTML = `<div class="card" style="width: 30rem;">
                            <img src="../../src/multimedia/fotos/productos/${producto.imagen}" class="card-img-top" alt="...">
                            <div class="card-body p-3">
                              <h3 class="card-title">${producto.nombre}</h3>
                              <p class="card-text fs-4">Precio: <strong>$${producto.precio}</strong></p>
                              <a class="btn btn-primary fs-5" id="agregar${producto.id}" style="background-color:#FD885ED6; color:#363434; border: none #363434">Agregar al carrito</a>
                            </div>
                          </div>`
  productoX.className = "col-md-4 py-3";
  paginaModelos.appendChild(productoX);

// Agregar al carrito

  const botonCarrito = document.getElementById(`agregar${producto.id}`)

  botonCarrito.addEventListener('click', () => {
    agregarAlCarrito(producto.id)
  })
});

const agregarAlCarrito = (prodId) => {
  const itemProductos = productosCargados.find ( (prod) => prod.id === prodId)
  carrito.push(itemProductos);
  actualizarCarrito ();
  // console.log(carrito);
}

const eliminarDelCarrito = (prodId) => {
  const item = carrito.find ( (prod) => prod.id === prodId);
  const indice = carrito.indexOf(item)

  carrito.splice(indice, 1)
  actualizarCarrito();
  // console.log(carrito);
}

// Modal carrito con jQuery

const modalAbrir = $('#modalAbrir');
// const modalCerrar = document.getElementById('modalCerrar');
const modalContainer = document.getElementById('modalContainer');
const carritoContenedor = document.getElementById('carritoContenedor')

modalAbrir.on('click', function() {
  modalContainer.classList.toggle('modalActive');
})

$('#modalCerrar').on('click', function () {
  modalContainer.classList.toggle('modalActive')
})

// modalCerrar.addEventListener('click', () => {
//   modalContainer.classList.toggle('modalActive');
// })

// modalContainer.addEventListener('click', () => {
//   modalContainer.classList.toggle('modalActive')
// })

// Agregar productos del carrito al modal

const modal = document.getElementById('modal');
let acumulador = 0;
let precioTotal = document.getElementById('precioTotal');

const actualizarCarrito = () => {
  carritoContenedor.innerHTML = ""

  carrito.forEach( (prod) => {
    const div = document.createElement('div');
    div.className = 'productoEnCarrito';
    div.innerHTML = `
                  <p class="nombreProductoCarrito">${prod.nombre}</p>
                  <div class="precioTachito">
                    <p class="precioProductoCarrito">$${prod.precio}</p>
                    <button onclick="eliminarDelCarrito(${prod.id})" class = "botonEliminar"><i class="far fa-trash-alt"></i></button>
                  </div>
    `
    carritoContenedor.append(div);
}) 
    contadorCarrito.innerHTML = carrito.length;
    acumulador = 0;
    carrito.forEach ( (prod) => {
      acumulador = acumulador + prod.precio;
      console.log(prod.precio);
      console.log(acumulador);
    })
    precioTotal.innerText = `$${acumulador}`
    // precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.precio, 0)
}

// Vaciar carrito

const vaciarCarrito = document.getElementById('vaciarCarrito');

vaciarCarrito.addEventListener('click', () => {
  carrito.length = 0;
  actualizarCarrito();
})

// Contador carrito

const contadorCarrito = document.getElementById('contadorCarrito');



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











