// ------------------------------- Importações de Módulos -------------------------------
import { texto_teste, add_value } from "./testes.js";

import { save_text_in_cache, load_text_from_cache } from "./utils.js";
import {
     loadText_Cache_json,
     
} from "./global.js";
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
export const $ButtonMenuAnburger = document.getElementById("ButtonMenuAnburger");
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
export const pai_screen_style = window.getComputedStyle($pai_das_telas);
export const $screen_text_style = window.getComputedStyle($screen_text);
export const marker_style = window.getComputedStyle($SettingText_marker_move);
export const bookmark_style = window.getComputedStyle($bookmark);
// ------------------------------- Variáveis de Controle e Estado -------------------------------
export const Cache_json_name = "settings_data";
export const Cache_screen_name = "Cache_screen_nameV2";
export const SettingData = loadText_Cache_json(Cache_json_name);
export const inputClass = "inputClass";
export const winHeight = window.innerHeight;
// Obtém a URL completa
export const urlAtual = window.location.href;

// ------------------------------ LOGS---------------------------------------------------------
// console.log("SettingData", SettingData);
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


//===========================================
//===================================================

// ------------------------------- Funções de Estilização e Atualização da Interface -------------------------------

// ------------------------------- Funções de Scroll e Movimento -------------------------------

// ------------------------------- Configuração Inicial  -------------------------------

// ---------------------------------    Eventos de Interface         -----------------------------

document.addEventListener("DOMContentLoaded", function () {
     // Seu código aqui
     // ------------------------------- area de testes S---------------------------------------------------------
     //inputMarkdow.value = texto_teste;
     //inputActived[0].value = texto_teste;
     // console.log("inputClass",$inputMarkdow.value);
});
// console.log(urlAtual); // Exibe a URL no console

// DOMContentLoaded
$clearButtonFromInput.addEventListener("click", function () {
     // console.log(inputActived)
     inputActived[0].value = "";
});


// ------------------------------------------------------ menu de iteração ------------------------------------------------------
const $menuburger = document.getElementById('menuAnburger')
$ButtonMenuAnburger.addEventListener("click", () => {
    if ($menuburger.classList.contains('active')) {
     $menuburger.classList.remove('active');
    }
    else {
     $menuburger.classList.add('active');
    }
});

