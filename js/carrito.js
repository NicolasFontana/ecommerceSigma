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
  let acumulador = 0;
  containerCarritoFinalizarCompra.innerHTML = ""

  carrito.forEach( (prod) => {
    const divCarritoFinalizarCompra = document.createElement('div');
    divCarritoFinalizarCompra.className = 'productoEnCarritoFinalizarCompra d-flex justify-content-between';
    divCarritoFinalizarCompra.innerHTML = `
                  <div class="d-flex align-items-center">
                    <img src="../../src/multimedia/fotos/productos/${prod.imagen}" alt="Girl in a jacket" width="100">
                    <p class="nombreProductoCarrito">x${prod.cantidad} ${prod.nombre}</p>
                  </div>
                  <div class="precioTachito d-flex align-items-center fs-3">
                    <p class="precioProductoCarrito">$${prod.precio}/u.</p>
                    <button onclick="eliminarDelCarrito(${prod.id})" class = "botonEliminar"><i class="far fa-trash-alt"></i></button>
                  </div>
    `
    containerCarritoFinalizarCompra.append(divCarritoFinalizarCompra);
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
    precioProducto.innerHTML = `Precio total: $${acumulador}`
    carritoVacio(carrito);
    addLocalStorage();
}


// Si carrito esta vacio mostrar mensaje

function carritoVacio(carrito) {
  if (carrito[0] === undefined) {
    let divCarritoVacio = document.createElement('div');
    divCarritoVacio.innerHTML = `<p class="msjCarritoVacio">No hay productos en el carrito</p>
                              <a class="irAProductos" href="/src/paginas/productos.html"><button class="btnCarritoVacio">Ver productos</button></a>
    `
    containerCarritoFinalizarCompra.appendChild(divCarritoVacio);
  }
}
carritoVacio(carrito);


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

// Verifico que haya seleccionado las opciones

function verificacionCompra () {
  const opt1 = document.getElementById('opt1');
  const opt2 = document.getElementById('opt2');
  const opt3 = document.getElementById('opt3');
  const opc1 = document.getElementById('opc1');
  const opc2 = document.getElementById('opc2');
  const opc3 = document.getElementById('opc3');
  const msjDeCompra = document.getElementById('msjDeCompra');
  const cardFormasDePago = document.getElementById('cardFormasDePago2');
  const cardMetodoEnvio = document.getElementById('cardMetodoEnvio');

  if((opt1.checked == false && opt2.checked == false && opt3.checked == false) && (opc1.checked == false && opc2.checked == false && opc3.checked == false)) {
    msjDeCompra.innerHTML = `<p class="d-flex justify-content-center mt-3 p-3 bg-danger text-white fs-3">Complete los campos solicitados porfavor</p>`
    $("#msjDeCompra").slideDown("slow");
    cardFormasDePago.classList.add("cardCompletarDatos")
    cardMetodoEnvio.classList.add("cardCompletarDatos")
  } else if ((opt1.checked == true || opt2.checked == true || opt3.checked == true)) {
    cardFormasDePago.classList.remove("cardCompletarDatos")
    msjDeCompra.innerHTML = `<p class="d-flex justify-content-center mt-3 p-3 bg-danger text-white fs-3">Complete los campos solicitados porfavor</p>`
    if (opc1.checked == false && opc2.checked == false && opc3.checked == false) {
    cardMetodoEnvio.classList.add("cardCompletarDatos")
    msjDeCompra.innerHTML = `<p class="d-flex justify-content-center mt-3 p-3 bg-danger text-white fs-3">Complete los campos solicitados porfavor</p>`
    $("#msjDeCompra").slideDown("slow");
  } else {
    cardFormasDePago.classList.remove("cardCompletarDatos")
    cardMetodoEnvio.classList.remove("cardCompletarDatos")
    $("#msjDeCompra").slideUp("slow");
    setTimeout(() => {
      msjDeCompra.innerHTML = `<p class="d-flex justify-content-center mt-3 p-3 bg-success text-white fs-3">La compra fue realizada exitosamente! Muchas gracias por confiar en nosotros.</p>`
      $("#msjDeCompra").slideDown("slow");
    }, 600)
  }
} 
}

const btnComprar = document.getElementById('btnComprar')
btnComprar.addEventListener('click', () => verificacionCompra());