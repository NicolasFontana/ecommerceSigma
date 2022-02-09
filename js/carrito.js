console.log(carrito)
carrito.forEach( (prod) => {
  const div = document.createElement('div');
  div.innerHTML =   `<p>asd${prod.nombre}</p>
                    <div>
                      <p>$${prod.precio}</p>
                      <button class="botonEliminar"><i class="far fa-trash-alt"></i></button>
                    </div>
  `;
})