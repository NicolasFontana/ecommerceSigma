// Nodos

let formNumero = document.getElementById('formNumero');
let formEmail = document.getElementById('formEmail');
let formTexto = document.getElementById('formTexto');
let formCheckbox = document.getElementById('formCheckbox');
let formEnviar = document.getElementById('formEnviar');
let formNombre = document.getElementById('formNombre');
let resultado = document.getElementById('resultado');

// Validar
function validar () {

  // validar nombre
  if ((formNombre.value == "") || (formNombre.value.length < 3)) {
    formNombre.classList.remove("is-valid");
    formNombre.classList.add("is-invalid"); 
    resultado.innerHTML = `<p class="d-flex justify-content-center mt-3 p-3 bg-danger text-white fs-3">Complete los campos solicitados porfavor</p>`;
    // El return false permite salir de la función y que resultado.innerHTML = "" no pise a los anteriores resultado.innerHTML
    return false;
  } else if (formNombre.value.length >= 3) {
    formNombre.classList.remove("is-invalid");
    formNombre.classList.add("is-valid"); 
    resultado.innerHTML = "";
  }

    // validar nombre
    console.log(formNumero.value);
    console.log(typeof(parseInt(formNumero.value)));
  if (formNumero.value.length < 10 || isNaN(parseInt(formNumero.value))) {
    formNumero.classList.remove("is-valid");
    formNumero.classList.add("is-invalid");
    resultado.innerHTML = `<p class="d-flex justify-content-center mt-3 p-3 bg-danger text-white fs-3">Complete los campos solicitados porfavor</p>`;
    return false;
  } else {
    formNumero.classList.remove("is-invalid");
    formNumero.classList.add("is-valid");
    resultado.innerHTML = ""
  }

  // Validar mensaje
  if (formTexto.value.length < 5) {
    formTexto.classList.remove("is-valid");
    formTexto.classList.add("is-invalid");
    resultado.innerHTML = `<p class="d-flex justify-content-center mt-3 p-3 bg-danger text-white fs-3">Complete los campos solicitados porfavor</p>`;
    return false;
  } else {
    formTexto.classList.remove("is-invalid");
    formTexto.classList.add("is-valid");
    resultado.innerHTML = "";
  }

  // Validar mail
  let expReg= /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  let esValido = expReg.test(formEmail.value)
  if (esValido == false) {
    formEmail.classList.remove('is-valid');
    formEmail.classList.add('is-invalid');
    resultado.innerHTML = `<p class="d-flex justify-content-center mt-3 p-3 bg-danger text-white fs-3">Complete los campos solicitados porfavor</p>`;
    return false;
  } else {
    formEmail.classList.remove('is-invalid');
    formEmail.classList.add('is-valid');
    resultado.innerHTML = "";
  }
}

// Evento enviar
formEnviar.addEventListener('click', () => {
  // Actualizo los nodos cada vez que clickeo en ENVIAR
  formNumero = document.getElementById('formNumero');
  formEmail = document.getElementById('formEmail');
  formTexto = document.getElementById('formTexto');
  formCheckbox = document.getElementById('formCheckbox');
  formEnviar = document.getElementById('formEnviar');
  formNombre = document.getElementById('formNombre');

  validar();
})
