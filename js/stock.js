// Cargar productos a la página
const productos = [{id:1, nombre:"Maceta Mica", imagen:"maceta-mica.jpg", precio:550},
                  {id:2, nombre:"Maceta Marina", imagen:"maceta-marina.jpg", precio:550},
                  {id:3, nombre:"Tiburon articulado", imagen:"juguete-tiburon-articulado.JPG", precio: 350},
                  {id:4, nombre:"Soporte alto", imagen:"soporte-alto-notebook.jpg", precio:700},
                  {id:5, nombre:"Soporte celular", imagen:"soporte-celular.jpg", precio:650},
                  {id:6, nombre:"Soporte auricular mesada", imagen:"soporte-auriculares-mesada.jpg", precio:900},
                  {id:7, nombre:"Marcador de libro", imagen:"marcador-de-libro.jpg", precio:250},
                  {id:8, nombre:"Soporte regulable", imagen:"soporte-regulable-notebook.jpg", precio:850},
                  {id:9, nombre:"Soporte auricular pie", imagen:"soporte-auriculares.jpg", precio:950}];

class Producto {
    constructor (valor) {
    this.nombre = valor.nombre;
    this.imagen = valor.imagen;
    this.precio = valor.precio;
    } 
  }