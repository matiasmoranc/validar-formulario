// variables
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

const btnEnviar = document.querySelector('#enviar');
const formularioEnviar = document.querySelector('#enviar-mail');
const resetBtn = document.querySelector('#resetBtn');
 
// event Listener

eventListeners();

function eventListeners() {
     console.log('test');
     // Inicio de la aplicación y deshabilitar submit
     document.addEventListener('DOMContentLoaded', inicioApp);

     // Campos del formulario
     email.addEventListener('blur', validarFormulario);
     asunto.addEventListener('blur', validarFormulario);
     mensaje.addEventListener('blur', validarFormulario);

     // Boton de enviar en el submit
     formularioEnviar.addEventListener('submit', enviarEmail);

     // Boton de reset
     resetBtn.addEventListener('click', resetFormulario);
}



// funciones
function inicioApp() {
     // deshabilitar el envio
     btnEnviar.disabled = true;
     btnEnviar.classList.add('cursor-not-allowed', 'opacity-50')
}


// Valida que el campo tengo algo escrito

function validarFormulario(e) {
    
     if(e.target.value.length > 0 ) {
         
          e.target.classList.remove('border', 'border-red-500');
          e.target.classList.add('border', 'border-green-500');
          e.target.classList.remove('error');
     } else {
          e.target.classList.remove('border', 'border-green-500');
          e.target.classList.add('border', 'border-red-500');
     }



     // Validar unicamente el email
     if(this.type === 'email') {
          validarEmail(this);
     }


     if(email.value !== '' && asunto.value !== '' && mensaje.value !== '' ) {
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('opacity-50');
        btnEnviar.classList.remove('cursor-not-allowed');
     }
}

// Resetear el formulario 
function resetFormulario(e) {
     formularioEnviar.reset();
     e.preventDefault();
}

// Cuando se envia el correo
function enviarEmail(e) {

    e.preventDefault();
     console.log('enviando');

     // Spinner al presionar Enviar
     const spinner = document.querySelector('#spinner');
     spinner.style.display = 'flex';

     // Gif que envia email
   

     // Ocultar Spinner y mostrar gif de enviado
     setTimeout( () => {
          spinner.style.display = 'none';
          const enviado = document.createElement('p');
          enviado.textContent = 'Mensaje Enviado Correctamente';
          enviado.classList.add('text-center', 'my-10', 'bg-green-500', 'text-white', 'uppercase');
          formularioEnviar.insertBefore(enviado, spinner);
 
          setTimeout(() =>  {
               enviado.remove();
               formularioEnviar.reset();
               inicioApp();
          }, 5000);
     }, 3000);

     
}



function validarEmail(campo) {
     const mensaje = campo.value;

     const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     
     if( re.test(mensaje.toLowerCase()) ) {
          campo.style.borderBottomColor = 'green';
          campo.style.borderColor = 'green';
          campo.classList.remove('error');
     } else {
          campo.style.borderColor = 'red';
          campo.classList.add('error');
     }
}
