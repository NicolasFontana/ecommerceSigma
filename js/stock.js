// Stock
const productos = [{id:1, nombre:"Maceta Mica", imagen:"maceta-mica.jpg", precio:550, cantidad:1, categoria:"macetas"},
                  {id:2, nombre:"Maceta Marina", imagen:"maceta-marina.jpg", precio:550, cantidad:1, categoria:"macetas"},
                  {id:3, nombre:"Tiburon articulado", imagen:"juguete-tiburon-articulado.JPG", precio: 350, cantidad:1, categoria:"juguete"},
                  {id:4, nombre:"Soporte alto", imagen:"soporte-alto-notebook.jpg", precio:700, cantidad:1, categoria:"soportesNotebook"},
                  {id:5, nombre:"Soporte celular", imagen:"soporte-celular.jpg", precio:650, cantidad:1, categoria:"soportesCelular"},
                  {id:6, nombre:"Soporte auricular mesada", imagen:"soporte-auriculares-mesada.jpg", precio:900, cantidad:1, categoria:"soportesAuriculares"},
                  {id:7, nombre:"Marcador de libro", imagen:"marcador-de-libro.jpg", precio:250, cantidad:1, categoria:"libro"},
                  {id:8, nombre:"Soporte regulable", imagen:"soporte-regulable-notebook.jpg", precio:850, cantidad:1, categoria:"soportesNotebook"},
                  {id:9, nombre:"Soporte auricular pie", imagen:"soporte-auriculares2.jpg", precio:950, cantidad:1, categoria:"soportesAuriculares"},
                  {id:10, nombre:"Lapicero Darth Vader", imagen:"lapicero-darth-vader.png", precio:900, cantidad:1, categoria:"lapicero"},
                  {id:11, nombre:"Topper personalizado", imagen:"topper-personalizado.jpg", precio:600, cantidad:1, categoria:"toppers"},
                  {id:12, nombre:"Topper feliz día papá", imagen:"topper-feliz-dia-papa.jpg", precio:400, cantidad:1, categoria:"toppers"},
                  {id:13, nombre:"Topper feliz día papá 2", imagen:"topper-feliz-dia-pa.jpg", precio:400, cantidad:1, categoria:"toppers"},
                  {id:14, nombre:"Lapicero monstruo", imagen:"lapicero-monstruo.png", precio:750, cantidad:1, categoria:"lapicero"},
                  {id:15, nombre:"Pulpo articulado", imagen:"juguete-pulpo-articulado.JPG", precio:350, cantidad:1, categoria:"juguete"}];

                  
class Producto {
    constructor (valor) {
    this.nombre = valor.nombre;
    this.imagen = valor.imagen;
    this.precio = valor.precio;
    } 
  }