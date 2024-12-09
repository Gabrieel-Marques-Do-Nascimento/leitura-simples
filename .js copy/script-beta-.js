// ------------------------------- Importações de Módulos -------------------------------
import { buttonstatic, loger, console_log, recarregarPagina } from "./utils.js";
import { fileInput, dropZone } from "./files.js";
import { loadScroll, autoThemeTime } from "./confg.js";
import { new_page } from "./events.js";

// ------------------------------- Elementos do DOM -------------------------------
export const $bookmarkColor = document.getElementById("bookmark");
export const $autoScroll = document.getElementById("autoScroll");
export const paragrafo = document.getElementById("paragraph");
export const $input = document.getElementById("ler");
export const $clearBtn = document.getElementById("clearBtn");
export const $pai = document.getElementById("pai");
export const page = document.getElementById("page");
export const lang = document.getElementById("lang");
const startBTN = document.getElementById("start");
const resetBTN = document.getElementById("reset");
let setingbtn = document.getElementById("setting");
let close = document.getElementById("close");
let marcador = document.getElementById("marcador");
let font_size = document.getElementById("font-size");
export let setaps = document.getElementById("setas");
export let playbt = document.getElementById("play");
export let pausebt = document.getElementById("pause");
export let setapb = document.getElementById("setab");

// ------------------------------- Elementos Dinâmicos -------------------------------
// Criar o elemento de destaque (marcador de texto)
export const highlight = document.createElement("div");
highlight.className = "highlight"; // adiciona estilo para o marcador
document.body.appendChild(highlight);

// ------------------------------- Estilos Computados -------------------------------
export let _scroll_height = paragrafo.scrollHeight;
export var paragrafo_style = window.getComputedStyle(paragrafo);
export var pai_styleTo = window.getComputedStyle($pai);
export const highlight_estilo = window.getComputedStyle(highlight);

// ------------------------------- Variáveis de Controle e Estado -------------------------------
export let data = loadText_json("comfger");
export let highlight_top_erd = pai_styleTo.marginTop; // Armazena a posição "top" inicial do marcador
export let highlight_top = Number(highlight_estilo.top.replace("px", ""));
export let pixels = 0; // Controle de pixels para scroll
export let mousemove = true; // Controle de movimento do mouse
let cont = 1; // Contador auxiliar
let actionExecuted = false; // Controle para ação de keydown

// ------------------------------- Funções para Manuseio de Texto -------------------------------
function saveText(data, name) {
  const text = data;
  localStorage.setItem(name, text);
}

function loadText(name) {
  const savedText = localStorage.getItem(name);
  if (savedText) {
    style_sec("block", "block", "none", "none", savedText);
    $input.value = savedText;
    return savedText;
  }
}

function saveText_json(data, name) {
  const text = JSON.stringify(data);
  localStorage.setItem(name, text);
}

function loadText_json(name) {
  const padrao = {
    lang: "en",
    delay: 2000,
    marcador: "button",
    "font-size": 18,
    theme: "auto",
    $autoScroll: false,
    color: "#00f000",
  };
  const text = localStorage.getItem(name);
  return text ? JSON.parse(text) : padrao;
}

// ------------------------------- Funções de Estilização e Atualização da Interface -------------------------------
function style_sec(rstdis, pdis, stdis, inpdis, texto) {
  resetBTN.style.display = rstdis;
  paragrafo.style.display = pdis;
  $pai.style.display = pdis;
  startBTN.style.display = stdis;
  $clearBtn.style.display = stdis;
  highlight.style.display = rstdis;

  $input.style.display = inpdis;
  paragrafo.innerHTML = texto;
  document.getElementById("fileConteiner").style.display = inpdis;
}

// ------------------------------- Funções de Scroll e Movimento -------------------------------
export function scrollarParagrafo(pixels, so = true) {
  if (so) {
    highlight.style.transition = "top 2s ease";
    setTimeout(() => {
      highlight.style.transition = "top 0.2s ease";
    }, 1000);
  }
  highlight.style.top = highlight_top_erd;
  paragrafo.scrollTo({
    top: pixels,
    behavior: "smooth",
  });
}

export function alterarTop(novoTop, error = 0, line = 0, on = true) {
  let styleheight = Number(paragrafo_style.height.replace("px", ""));
  if (on) {
    highlight.style.transition = "top 0.1s ease";
  }

  let largura = window.innerWidth;
  if (largura <= 750) {
    if (novoTop < highlight_top) {
      novoTop = highlight_top;
    }
    if (novoTop > styleheight) {
      novoTop = styleheight - 10;
    }
  }
  if (largura > 750) {
    if (novoTop < highlight_top) {
      novoTop = highlight_top;
    }
    if (novoTop > styleheight) {
      novoTop = styleheight - (line - error);
    }
  }
  highlight.style.top = novoTop + "px";
}

function scrollNumberline(active = true, type = true, font_size, button = null, delaybt = 500) {
  const computedStyle = window.getComputedStyle(paragrafo);
  let line = Number(font_size) + Number(font_size) / 2;
  const lineHeightInPixels = parseFloat(computedStyle.height) / line;

  if (active) {
    var linha = type ? Number(line) : -Number(line);
    alterarTop(
      Number(highlight_estilo.top.replace("px", "")) + linha,
      8,
      linha
    );

    highlight.style.transition = "top 0.1s ease";
    if (button) {
      button.disabled = true;
      setTimeout(function () {
        button.disabled = false;
      }, delaybt);
    }
  }
}

// ------------------------------- Configuração Inicial e Eventos de Interface -------------------------------
// Função para carregar configurações e iniciar a página
function activatedate() {
  let data = loadText_json("comfger");
  if (data) {
    $delayelement.value = data["delay"];
    marcador.value = data["marcador"];
    font_size.value = data["font-size"];
    theme.value = data["theme"] ? data["theme"] : "auto";
    $autoScroll.checked = data["$autoScroll"];
    texto.style.fontSize = font_size.value + "px";
  }
}

window.onload = function () {
  let data = loadText_json("comfger");
  $autoScroll.checked = data["$autoScroll"];
  lang.value = data["lang"] ? data["lang"] : "en";
  $bookmarkColor.value = data["color"];
  scrollNumberline(false, true, data["font-size"]);
  activatedate();
  highlight_status();
  $delayelement.value = data["delay"] ? data["delay"] : 2000;
  let line = true;

  var linha = line
    ? Number(estilo.lineHeight.replace("px", ""))
    : -Number(paragrafo_style.lineHeight.replace("px", ""));
  let fh = Number(data["font-size"]);
  highlight.style.height = fh + fh / 2 - 2 + "px"; 
  highlight.style.background = data["color"];
  if ($autoScroll.checked) {
    loadScroll(paragrafo);
  }

  if (data["theme"] == "auto") {
    autoThemeTime();
  }
  if (data["theme"] == "white") {
    //autoThemeTime(12, true);
  }
  if (data["theme"] == "black") {
    autoThemeTime(0, true);
  }
};

document.addEventListener("DOMContentLoaded", function () {
  window._scroll_height = paragrafo.scrollHeight;
  _scroll_height = paragrafo.scrollHeight;

  let line = _lineheight_(data["font-size"]);
});