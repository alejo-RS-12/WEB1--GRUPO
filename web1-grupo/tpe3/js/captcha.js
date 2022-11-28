/*Captcha de contacto.html*/
"use strict";
/*Llama a los inputs del html de "contacto"
y se les asigna una variable a cada uno*/

let valorCaptcha = document.getElementById('codigo');
let formulario = document.getElementById('respuesta');
let submitButton = document.getElementById('enviar');
let refreshButton = document.getElementById('reset');

/*Se llama la funcion que genera el codigo captcha*/
generateCaptchaCode();

/*Se asignan funciones a los botones de "Enviar" y "Resetear"
a partir del evento "click"*/
submitButton.addEventListener('click', testear);
refreshButton.addEventListener('click', generateCaptchaCode);

function generateCaptchaCode() {
    //se vacía el parrafo del html para que no quede superpuesto con el anterior al resetear
    document.getElementById('resultado').innerHTML = " "; 

    let captchaRandom = Math.floor(Math.random() * 60000) + 10000; 
    
    let captchaCode = captchaRandom;

    /*Se le asigna el valor de la variable "captchaCode" al valor html
    de la variable "valorCaptcha", imprimiendo*/
    valorCaptcha.innerHTML = captchaCode;

}

function testear(e) {
  e.preventDefault();
  if (formulario.value == valorCaptcha.textContent) {
    /*Si el valor ingresado por el usuario es igual al valor dentro
    del input "respuesta" con variable "formulario"; se cambia el valor html
    de la variable "parrafo" para indicarle al usuario que el captcha es válido.
    Y se vacian los inputs de email y telefono.*/
    let parrafo = document.getElementById('resultado');
    parrafo.innerHTML = "Captcha VALIDO";
    document.getElementById('email').value = "";
    document.getElementById('tel').value = "";
  }
  else {
    /*En caso de que el valor ingresado por el usuario sea distinto al del captcha;
    se cambia el valor html de "parrafo" para indicarle que su respuesta es invalida*/
    let parrafo = document.getElementById('resultado');
    parrafo.innerHTML = "Captcha INVALIDO";
  }
}