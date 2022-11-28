/*Tabla dinámica */
"use strict";
let botonAgregar = document.querySelector("#btn-agregar");
let botonAgregarTres = document.querySelector("#btn-agregar-tres");
let botonsiguiente = document.querySelector("#btn-siguiente");
let botonanterior = document.querySelector("#btn-anterior");


botonAgregar.addEventListener("click", function (e) {
  agregar(1);
});
botonAgregarTres.addEventListener("click", function (e) {
  agregar(3);
});

let pageNum = 1;
const url = "https://62b31e4c20cad3685c9badd9.mockapi.io/api/Personajes";
let id = 0;
let pageNumView = document.querySelector("#pageNum");

botonsiguiente.addEventListener("click", function(e){
  e.preventDefault
 
  pageNum = pageNum + 1;
  
  pageNumView.innerHTML = pageNum;//esto para que el usuario sepa en qué página está
  
  mostrarDatosTabla();
}); 

botonanterior.addEventListener("click", function(e){
  e.preventDefault
  if(pageNum > 1){

    pageNum = pageNum - 1;
    pageNumView.innerHTML = pageNum;
  
    mostrarDatosTabla();
  }
});
/*Funcion asicronica de carga de datos mediante API Rest para la tabla dinamica de personajes en Guts.html*/
async function mostrarDatosTabla() {
  const tabla = document.getElementById("insertarTabla");
  tabla.innerHTML = "";

  pageNumView.innerHTML = pageNum;
  try {
    /*Hago fetch mediante la variable "res" para llamar al api,
    y aplico los parametros necesarios para la paginacion*/
    let res = await fetch(`${url}/?page=${pageNum}&limit=5`);
    /*Mediante la variable "json" tomo los datos del url (que seria "res") y los convierto a formato json*/
    let json = await res.json();
    /*Hago un forof para recorrer todos los datos del api e imprimirlos en la tabla dinamica*/
    for (const personaje of json) {
      tabla.innerHTML += `<tr>          
                              <td> ${personaje.nombre}</td>
                              <td> ${personaje.edad}</td>
                              <td> ${personaje.apodo}</td>
                              <td><button data-id ="${personaje.id}" class="btn-eliminar">Eliminar</button></td>
                              <td><button data-id ="${personaje.id}" class="btn-editar">Editar</button></td>
                          </tr>`;

                          /*Creo dos botones "Eliminar" y "Editar",
                          asignandoles dos funciones propias a cada boton perteneciente a cada fila de la tabla*/
     }
     document.querySelectorAll(".btn-eliminar").forEach((boton) => {
       boton.addEventListener("click", eliminar);
                          
      });
     document.querySelectorAll(".btn-editar").forEach((boton) => {
       boton.addEventListener("click", editar);
      });
  } catch (error) {
  }
}
mostrarDatosTabla();

/*Funcion para eliminar una fila seleccionada por el usuario*/
async function eliminar(e) {
  e.preventDefault();
  /*declaro variable "borrarId" que toma los datos del json convertido del api*/
  let borrarId = this.dataset.id;
  let msj = document.querySelector("#msj");
  try {
    let res = await fetch(`${url}/${borrarId}`, {
      method: "DELETE",
    });
    /*verifico que el metodo de DELETE se ejecute correctamente mediante su status*/
    if (res.status == 200) {
      msj.innerHTML = `Eliminado correctamente!`;
    }
  } catch (error) {
  
  }
  /*Llamo a la función para mostrar la tabla ya actualizada con el json que se haya borrado luego de ejectuar la funcion "eliminar"*/
  mostrarDatosTabla();
}

/*Funcion asincronica para agregar datos del usuario en la tabla dinamica que esta en Guts.html*/
async function agregar(numero) {
  let formTable = document.querySelector("#form-insertar-tabla");

  /*Creo la variable form para enviarle los datos del formulario
  usando la variable formTable como parametro de envio de dichos datos*/
  let form = new FormData(formTable);

  /*Creo la variable "msj" donde se imprimira si los datos ingresados
  por el usuario fueron creados correctamente*/
  let msj = document.querySelector("#msj");

  /*Tomo los datos de los inputs del formulario*/
  let nombre = form.get("nombre");
  let edad = form.get("edad");
  let apodo = form.get("apodos");

  /*Se agregan los datos en formato JSON ingresados por el usuario en el api, y a su vez en la tabla*/
  let personaje = {
    nombre: nombre,
    edad: edad,
    apodo: apodo,
  };

  /*Recorro*/
  for (let i = 0; i < numero; i++) {
    /*Dependiendo del parametro de la funcion seleccionada, se iterara de a 1 o 3 veces la carga del contenido
    ingresado por el usuario, y se imprimira en la tabla*/
    try {
      /*Se agrega el JSON, avisandole al servidor que es un JSON, y finalmente se lo convierte en string para agregarse en la API*/
      let res = await fetch(url, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(personaje),
      });
      /*Si se cumple el requisito anterior, se verifica y se agrega en la tabla*/
      if (res.status == 201) {
        msj.innerHTML = `${personaje.nombre} fue creado correctamente!`;
      }
    } catch (error) {
      /*Si no se cumple lo requerido primeramente,
      se imprime el error en la consola*/
      console.log(error);
    }
  }
  mostrarDatosTabla();
}


/*Funcion para eliminar una fila seleccionada por el usuario*/
async function editar(e) {
  e.preventDefault();
  
  let msj = document.querySelector("#msj");
  let formTable = document.querySelector("#form-insertar-tabla");
  let form = new FormData(formTable);
  
  let nombre = form.get("nombre");
  let edad = form.get("edad");
  let apodo = form.get("apodos");
  
  /*Si los inputs del formulario estan vacios al momento de apretar el boton "Editar",
  mediante la variable "msj" se le dice al usuario que ingrese sus nuevos datos
  en dichos inputs y vuelva a presionar el boton "Editar"
  de la fila correspondiente a editar*/
  if(nombre == "" || edad == "" || apodo == ""){
    msj.innerHTML = `Ingrese los datos nuevos aqui y vuelva a presionar el boton editar!`;
  } 
  else {
    /*Se agregan los datos en formato JSON ingresados por el usuario en el api, y a su vez en la tabla*/

    let personaje = {
      nombre: nombre,
      edad: edad,
      apodo: apodo,
    };
    let editarId = this.dataset.id;


    try {
      let res = await fetch(`${url}/${editarId}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(personaje),
      });
      if (res.status === 200) {
        msj.innerHTML = `${personaje.nombre} editado correctamente!`;
      }
    } catch (error) {
      console.log(error);
    }
    mostrarDatosTabla();
  }
}