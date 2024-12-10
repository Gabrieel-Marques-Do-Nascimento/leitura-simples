// ------------------------------- Importações de Módulos -------------------------------
import {texto_teste, add_value} from "./testes.js";

import { save_text_in_cache,
 load_text_from_cache} from "./utils.js"
// ------------------------------- Elementos do DOM -------------------------------
export const inputActived = document.getElementsByClassName("inputClass");
export const $CloseMenuSettings = document.getElementById("CloseMenuSettings");
export const $SettingBookMarkColor = document.getElementById("bookmark");
export const $SettingPageLang = document.getElementById("lang");
export const $SettingDelay = document.getElementById("delay");
export const $SettingAutoScroll = document.getElementById("autoScroll");
export const $SettingButton = document.getElementById("settingbutton");
export const $SettingsMenu = document.getElementById("setingsmenu");
export const $settingTheme = document.getElementById("theme");
export const $SettingText_marker_move = document.getElementById("marcador");
export const $settingsFontSize = document.getElementById("settings-font-size");
export const $SettingText_type = document.getElementById("text_type");
// principal screen
export const $clearButtonFromInput = document.getElementById("clearBtn");
export const $inputMarkdow = document.getElementById("inputMarkdow");
export const $input = document.getElementById("ler");
export const $screen_text = document.getElementById("paragraph");
export const $pai_das_telas = document.getElementById("pai");
// principal screen  buttons
export const $ButtonScrollPage = document.getElementById("page");
export const $button_low = document.getElementById("button_low");
export const $button_up = document.getElementById("button_up");
export const $startButton = document.getElementById("start");
export const $resetButtonn = document.getElementById("reset");
export const $PlayButton = document.getElementById("play");
export const $PauseButton = document.getElementById("pause");
// retorna uma lista de elementos
export const $buttons = document.querySelectorAll(".scrollbt");
// ------------------------------- Elementos Dinâmicos -------------------------------
export const $bookmark = document.createElement("div");



// ------------------------------- Estilos Computados -------------------------------
export const pai_screen_style = window.getComputedStyle($pai_das_telas)
// ------------------------------- Variáveis de Controle e Estado -------------------------------
export const Cache_json_name = "settings_data";
export const Cache_screen_name = "Cache_screen_nameV2";
export const SettingData = loadText_Cache_json(Cache_json_name);
export const inputClass = "inputClass";
export const winHeight = window.innerHeight;
// Obtém a URL completa
const urlAtual = window.location.href;



// ------------------------------ LOGS---------------------------------------------------------
console.log("SettingData",SettingData);
// ------------------------------- Funções para Manuseio de Texto -------------------------------
//================================================
/**
 * Salva uma string no LocalStorage.
 *
 * @param {string} data - O texto que será salvo no LocalStorage.
 * @param {string} name - A chave usada para armazenar o texto no LocalStorage.
 */


//============================================
/**
 * Carrega uma string salva no LocalStorage e aplica estilos se existir.
 *
 * @param {string} name - A chave usada para recuperar o texto do LocalStorage.
 * @returns {string|undefined} O texto recuperado do LocalStorage ou `undefined` se não existir.
 */


//===========================================
/**
 * Salva um objeto JSON no LocalStorage como uma string.
 *
 * @param {Object} data - O objeto que será salvo no formato JSON.
 * @param {string} name - A chave usada para armazenar o objeto no LocalStorage.
 */
export function save_json_to_cache(data, name) {
     // Converte o objeto para uma string JSON
     const text = JSON.stringify(data);
     // Salva no LocalStorage
     localStorage.setItem(name, text);
}

//===========================================
/**
 * Carrega um objeto JSON armazenado no LocalStorage.
 * Se o item não existir, retorna um objeto padrão.
 *
 * @param {string} name - A chave usada para recuperar o objeto do LocalStorage.
 * @returns {Object} O objeto JSON recuperado ou um objeto padrão caso não exista.
 */
export function loadText_Cache_json(name) {
     // Pega o texto do LocalStorage
     const padrao = {
          lang: "en",
          delay: 2000,
          markmove: "button",
          "font-size": 18,
          //background_type: "white",
          theme: "auto",
          $autoScroll: false,
          color: "#00f000",
          screentype: "text",
     };
     const text = localStorage.getItem(name);
     // Verifica se o item existe e converte de volta para um objeto
     return text ? JSON.parse(text) : padrao;
}
//===================================================

// ------------------------------- Funções de Estilização e Atualização da Interface -------------------------------

// ------------------------------- Funções de Scroll e Movimento -------------------------------

// ------------------------------- Configuração Inicial  -------------------------------




// ---------------------------------    Eventos de Interface         -----------------------------

document.addEventListener("DOMContentLoaded", function() {
    
    // Seu código aqui
   // ------------------------------- area de testes S---------------------------------------------------------

  //inputMarkdow.value = texto_teste;
 //inputActived[0].value = texto_teste; 
// console.log("inputClass",$inputMarkdow.value);
});
console.log(urlAtual); // Exibe a URL no console


// DOMContentLoaded
$clearButtonFromInput.addEventListener("click", function () {
  // console.log(inputActived)
  inputActived[0].value = ""
});





