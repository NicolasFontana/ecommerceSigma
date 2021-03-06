// Nodos

let formNombre = document.getElementById('formNombre');
let formNumero = document.getElementById('formNumero');
let formEmail = document.getElementById('formEmail');
let formTexto = document.getElementById('formTexto');
let formCheckbox = document.getElementById('formCheckbox');
let formEnviar = document.getElementById('formEnviar');
let resultado = document.getElementById('resultado');

// Validar
function validar () {
  
  // validar nombre
  if ((formNombre.value == "") || (formNombre.value.length < 3)) {
    formNombre.classList.remove("is-valid");
    formNombre.classList.add("is-invalid");
    resultado.innerHTML = `<p class="d-flex justify-content-center mt-3 p-3 bg-danger text-white fs-3">Complete los campos solicitados porfavor</p>`;
    $("#resultado").slideDown("slow");
    return false;
  } else if (formNombre.value.length >= 3) {
    formNombre.classList.remove("is-invalid");
    formNombre.classList.add("is-valid"); 
  }

    // validar número
  if (formNumero.value.length < 10 || isNaN(parseInt(formNumero.value))) {
    formNumero.classList.remove("is-valid");
    formNumero.classList.add("is-invalid");
    resultado.innerHTML = `<p class="d-flex justify-content-center mt-3 p-3 bg-danger text-white fs-3">Complete los campos solicitados porfavor</p>`;
    $("#resultado").slideDown("slow");
    return false;
  } else {
    formNumero.classList.remove("is-invalid");
    formNumero.classList.add("is-valid");

  }

    // Validar mail
    let expReg= /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    let esValido = expReg.test(formEmail.value)
    if (esValido == false) {
      formEmail.classList.remove('is-valid');
      formEmail.classList.add('is-invalid');
      resultado.innerHTML = `<p class="d-flex justify-content-center mt-3 p-3 bg-danger text-white fs-3">Complete los campos solicitados porfavor</p>`;
      $("#resultado").slideDown("slow");
      return false;
    } else {
      formEmail.classList.remove('is-invalid');
      formEmail.classList.add('is-valid');
    }

  // Validar mensaje
  if (formTexto.value.length < 5) {
    formTexto.classList.remove("is-valid");
    formTexto.classList.add("is-invalid");
    resultado.innerHTML = `<p class="d-flex justify-content-center mt-3 p-3 bg-danger text-white fs-3">Complete los campos solicitados porfavor</p>`;
    $("#resultado").slideDown("slow");
    return false;
  } else {
    formTexto.classList.remove("is-invalid");
    formTexto.classList.add("is-valid");
    $("#resultado").slideUp("slow");
    return true;
  }
}

// Evento enviar

formEnviar.addEventListener('click', () => {
  validar();
  if (validar() == true) {
    const APIURL = 'https://jsonplaceholder.typicode.com/posts';
    const infoUsuario = {nombre: formNombre.value, numero: formNumero.value, email: formEmail.value, mensaje: formTexto.value};
    function datosPost () {
      $.ajax({
        method: "POST",
        url: APIURL,
        data: infoUsuario,
        success: function (respuesta) {
          resultado.innerHTML = `<p class="d-flex justify-content-center mt-3 p-3 bg-success text-white fs-3">Los datos se enviaron correctamente ${respuesta.nombre}! Te responderemos lo antes posible.</p>`;
          $("#resultado").slideDown("slow");
        }
      });
    }
    datosPost();
  }
});

// Eventos focusout

formNombre.addEventListener('blur', () => {
  validar();
})

formNumero.addEventListener('blur', () => {
  validar();
})

formEmail.addEventListener('blur', () => {
  validar();
})

formTexto.addEventListener('blur', () => {
  validar();
})
