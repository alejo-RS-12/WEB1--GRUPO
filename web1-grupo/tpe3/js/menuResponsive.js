/*Menú responsive*/
"use strict";
document.querySelector(".btn_menu").addEventListener("click", alternarMenu);

function alternarMenu() {
    document.querySelector(".navigation").classList.toggle("show");
}