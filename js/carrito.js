$(document).ready(function() {
  console.log("El DOM esta ready")
})

window.onload = function readLocalStorage() {
  const storage = JSON.parse(localStorage.getItem('carrito'))
  console.log("estoy aca")
  if (storage != "" && storage != null) {
    carrito = storage;
    console.log("entre");
    console.log(carrito);
    actualizarCarrito();
  }
}

const containerCarritoFinalizarCompra = document.getElementById('containerCarritoFinalizarCompra');
let carrito = [];


function addLocalStorage () {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

const actualizarCarrito = () => {
  let acumulador = 0;
  containerCarritoFinalizarCompra.innerHTML = ""

  carrito.forEach( (prod) => {
    const divCarritoFinalizarCompra = document.createElement('div');
    console.log(prod)
    console.log(prod.nombre)
    divCarritoFinalizarCompra.className = 'productoEnCarritoFinalizarCompra d-flex justify-content-between border-bottom';
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
    precioTotal.innerText = `$${acumulador}`
    addLocalStorage();
}






carrito.forEach( (prod) => {
  const divFinalizarCompra = document.createElement('div');
  divFinalizarCompra.innerHTML =   `<p>asd${prod.nombre}</p>
                    <div>
                      <p>$${prod.precio}</p>
                      <button class="botonEliminar"><i class="far fa-trash-alt"></i></button>
                    </div>
  `;
  containerCarritoFinalizarCompra.appendChild(divFinalizarCompra)
})

