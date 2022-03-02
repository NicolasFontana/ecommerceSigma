$(document).ready(function() {
  
})

// Nodos

let precioProducto = document.getElementById('precioProducto');
const modalAbrir = $('#modalAbrir');
const modalContainer = document.getElementById('modalContainer');
const modal = document.getElementById('modal');
const containerCarritoFinalizarCompra = document.getElementById('containerCarritoFinalizarCompra');

let carrito = [];

// Leer localStorage

window.onload = function readLocalStorage() {
  const storage = JSON.parse(localStorage.getItem('carrito'))
  if (storage != "" && storage != null) {
    carrito = storage;
    actualizarCarrito();
    actualizarModal();
    modalVacio(carrito);
  }
}

function addLocalStorage () {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Mantener actualizado el carrito cuando haya cambios

const actualizarCarrito = () => {
  
}

// Eliminar del carrito

const eliminarDelCarrito = (prodId) => {
  const item = carrito.find ( (prod) => prod.id === prodId);
  const indice = carrito.indexOf(item);
  carrito.splice(indice, 1);
  actualizarCarrito();
  actualizarModal();
  modalVacio(carrito);
}

// Modal

modalAbrir.on('click', function() {
  modalContainer.classList.toggle('modalActive');
})

modalCerrar.addEventListener('click', () => {
  modalContainer.classList.toggle('modalActive');
})

// Actualizar modal

const actualizarModal = () => {
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
  actualizarModal();
  modalVacio(carrito);
})

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