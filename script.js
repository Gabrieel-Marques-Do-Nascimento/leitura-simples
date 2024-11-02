import { buttonstatic, loger, console_log, recarregarPagina } from "./utils.js";
import { fileInput, dropZone } from "./files.js";
import { loadScroll } from "./confg.js";
export const autoScroll = document.getElementById("autoScroll");
export const paragrafo = document.getElementById("paragraph");
export const height = window.innerHeight;
const window_width = window.innerWidth;
export const $input = document.getElementById("ler");
export const $clearBtn = document.getElementById("clearBtn");
export let _scroll_height = paragrafo.scrollHeight;
export let setaps = document.getElementById("setas");
export let playbt = document.getElementById("play");
export let pausebt = document.getElementById("pause");
export let setapb = document.getElementById("setab");
// Criar o elemento de destaque o marcador de texto
export const highlight = document.createElement("div");
export let data = loadText_json("comfger");
// add uma classe com os estilos para o marcador
highlight.className = "highlight";
export const $pai = document.getElementById("pai");
export var pai_styleTo = window.getComputedStyle(
  document.getElementById("pai")
);
// add o marcador ao elemento pai body
document.body.appendChild(highlight);
export const highlight_estilo = window.getComputedStyle(highlight);
// mostra os estilos utilizados no marcador

// armazeana a posicao top do elemento para usos futuros
export let highlight_top_erd = pai_styleTo.marginTop; //highlight_estilo.top;

console_log("pai" + pai_styleTo.width);



export let $delayelement = document.getElementById("delay");

console_log("line 1 (script.js): " + data ? data : "nao existe");
const $fileConteiner = document.getElementById("fileConteiner");

// barra que recebe o texto que o usuario quer ler

// botonhes para mostrar e esconder o texto
const startBTN = document.getElementById("start");
const resetBTN = document.getElementById("reset");
// elemento que mostra o texto

// botao responcavel por scroll's o equivalente a uma pagina

const paiheight = Number(pai_styleTo.height.replace("px", ""));
console_log("pai height" + paiheight + "page height" + height);

export const page = document.getElementById("page");
// linguagem da pagina
const lang = document.getElementById("lang");
// botonhes responcaveis por mover o marcador para cima ou para baixo

// --------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------
// menu de comfiguracoes
let setings = document.getElementById("setings");
let texto = document.getElementById("paragraph");
let setingbtn = document.getElementById("setting");
let close = document.getElementById("close");

let marcador = document.getElementById("marcador");
export var paragrafo_style = window.getComputedStyle(texto);
let font_size = document.getElementById("font-size");

highlight.style.width = pai_styleTo.width;
//highlight.style.width = window_width < 768? paragrafo_style.width : pai_styleTo.width;
// elemento removido e substituido por 'theme'
// let background_type = document.getElementById("background-type");
const theme = document.getElementById("theme");

// Obtenha o estilo computado do elemento
var estilo = window.getComputedStyle(texto);
// Pegue o valor do line-height
var lineHeight = estilo.lineHeight;
// ---------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------

/**
 * funcao responcavel por scrollar ate a distancia em pixels especificada
 * @param {*} pixels os pixels que elemento deve mover em relação ao scroll
 * @param {*} so se deve ser aplicado os efeitos
 */
export function scrollarParagrafo(pixels, so = true) {
  // paragrafo.scrollTo({
  //   top: pixels - 55,
  //   behavior: "smooth",
  // });

  if (so) {
    // com uma animação de 2 segundos
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

// define o comportamento de alguns elementos como
// deve aparecer ou desaparecer da tela
function style_sec(rstdis, pdis, stdis, inpdis, texto) {
  resetBTN.style.display = rstdis;
  paragrafo.style.display = pdis; // Faz o parágrafo aparecer
  $pai.style.display = pdis;
  startBTN.style.display = stdis;
  $clearBtn.style.display = stdis;
  highlight.style.display = rstdis;

  $input.style.display = inpdis;
  paragrafo.innerHTML = texto;
  $fileConteiner.style.display = inpdis;
}

// retorna uma lista de elementos
let $buttons = document.querySelectorAll(".scrollbt");
// funcso que define se os bottons devem aparecer ou ficar escondido

// apos add o texto ao $input penas com um enter ele mostra o texto
$input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    // Aqui você pode colocar a ação que deseja realizar ao pressionar Enter
    saveText($input.value, "savedText");
    buttonstatic($buttons, "block");
    style_sec("block", "block", "none", "none", $input.value);
  }
});
$clearBtn.addEventListener("click", function () {
  console_log("clear");
  $input.value = "";
});
// apos add o texto ao $input penas com um click no 'start' ele mostra o texto
startBTN.addEventListener("click", () => {
  saveText($input.value, "savedText");
  style_sec("block", "block", "none", "none", $input.value);
  buttonstatic($buttons, "block");
});
// apos add o texto ao $input penas com um 'reset' ele esconde  o texto
// para add um novo texto
resetBTN.addEventListener("click", () => {
  buttonstatic($buttons, "none");
  style_sec("none", "none", "block", "block", "");
  window.pause = true;
});

// apos clicar em um botão com formato de livro
// salta o equivalente a uma pagina
let pixels = 0;

page.addEventListener("click", () => {
  // posicao em pixels do scroll
  const scrolltop = paragrafo.scrollTop;
  // pega a posição de pixels do scroll mais a altura da janela
  let heightp = Number(paragrafo_style.height.replace("px", ""));
  pixels = heightp + scrolltop;
  console_log("pixels " + pixels + "height " + heightp);
  // chama a funcao que altera a posição
  scrollarParagrafo(pixels);
  // desabilita o botão page por 1,5 segundos
  page.disabled = true;
  setTimeout(function () {
    page.disabled = false;
  }, 1500);

  let teste = highlight_top_erd;
  console_log("paragrafo_style " + teste);
  // se o marcador usado for pelos botoes seta
  if (marcador.value == "button") {
    // retorna o marcador para a posição inicial
  }
});

// # ----------------------------------------------------------------------------------------------------------------------
//                gernciamento de texto
function saveText(data, name) {
  // Pega o texto da área de texto
  const text = data;
  // Salva no LocalStorage
  localStorage.setItem(name, text);
}

function loadText(name) {
  // Carrega o texto salvo do LocalStorage, se existir
  const savedText = localStorage.getItem(name);
  if (savedText) {
    style_sec("block", "block", "none", "none", savedText);
    $input.value = savedText;
    return savedText;
  }
}

// Chama a função para carregar o texto ao abrir a página
window.onload = loadText("savedText");

//----------------------------------------------------------------------------------------------------------------------
//                   marcador de texto
// Função para alterar o valor de 'top'

/**
 * posição na vertical  do elemento highlight
 */
export let highlight_top = Number(highlight_estilo.top.replace("px", ""));
let highlight_height = Number(highlight_estilo.height);

export function alterarTop(novoTop, error = 0, line = 0, on = true) {
  let styleheight = Number(paragrafo_style.height.replace("px", ""));
  console_log("-------------------------------------------------");
  console_log("alterarTop function: " + novoTop + "" + styleheight, true);
  console_log("erro:" + error, true);
  console_log("line:" + line, true);
  console_log("-------------------------------------------------", true);
  console_log("    ", true);
  let end_line = tela[1];
  if (on) {
    highlight.style.transition = "top 0.1s ease";
  }
  if (novoTop < highlight_top) {
    novoTop = highlight_top;
  }
  if (novoTop > styleheight) {
    novoTop = styleheight - (line - error);
  }

  highlight.style.top = novoTop + "px";
}

let cont = 1;
function highlight_status() {
  // font responsável por verificar e modificar atualizar a page
  let line = _lineheight_(data["font-size"]);
  // se o marcador for igual a mouse
  if (marcador.value == "mouse") {
    cont = 0;
    // desativa os botoes
    setapb.disabled = true;
    setaps.disabled = true;
    playbt.disabled = true;
    // add um evento para posicionar o marcador onde estiver o mouse
    document.addEventListener("mousemove", function (event) {
      // obtem a posicao atual do mouse
      const y = event.clientY;
      // altera  a position_top do marcador para onde estiver o mouse
      // dentro limites do elemento paragraph
      alterarTop(y, 8, line);
    });

    console_log("marcador.value: " + marcador.value);
  }
  // se o marcador for igual a button
  if (marcador.value == "button") {
    console_log(marcador.value);
    // contador menor que 1
    if (cont < 1) {
      // cont = 1
      cont++;
      // recarrega a page
      recarregarPagina();
    }
  }
  
  if (marcador.value == "screen"){
    let telaHeight = tela[0];
// tela / 2= result
// top  < result = para cima
// top > result = para baixo

document.addEventListener("mousemove", function (event) {
  // body...
  const y = event.clientY;
  if (y < (telaHeight / 2)){
    scrollNumberline(true, false, data["font-size"], setaps);
  }
  if (y > (telaHeight / 2)){
    scrollNumberline(true, true, data["font-size"], setapb);
  }
  
  
});
  }
}

setapb.addEventListener("click", () => {
  console_log("seta para baixo");
  //move_marcador(true)
  scrollNumberline(true, true, data["font-size"], setapb);
});

let actionExecuted = false; // Variável de controle
document.addEventListener("keyup", (e) => {
  if (e.key === "w" || e.key === "s") {
    console_log(e.key);
    actionExecuted = false; // Libera a ação ao soltar a tecla
  }
});
document.addEventListener("keydown", (e) => {
  if (!actionExecuted) {
    // Executa apenas se a ação ainda não foi realizada
    actionExecuted = true; // Define como true para impedir execuções adicionais enquanto a tecla está pressionada

    if (e.key === "w") {
      console_log(e.key);
      scrollNumberline(true, false, data["font-size"], setaps);
    }

    console_log(e.key, actionExecuted);
    if (e.key === "s") {
      scrollNumberline(true, true, data["font-size"], setapb);
    }
  }
});

setaps.addEventListener("click", () => {
  console_log("seta para baixo");
  //move_marcador(false);
  scrollNumberline(true, false, data["font-size"], setaps);
});

// ----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
// funcao para substituir a função de saltar pagina

function scrollNumberline(
  active = true,
  type = true,
  font_size,
  button = null,
  delaybt = 500
) {
  const computedStyle = window.getComputedStyle(paragrafo);
  let line = Number(font_size) + Number(font_size) / 2;
  // Calcula a altura da linha
  const lineHeightInPixels = parseFloat(computedStyle.height) / line;

  console_log("--------------------------------");
  console_log(`quantidade de linha: ${lineHeightInPixels} lines`);
  console_log(`font_size: ${font_size}px`);
  console_log(`computedStyle.height: ${computedStyle.height}px`);
  console_log("line " + line);
  console_log("----------------------------------");

  if (active) {
    var linha = type ? Number(line) : -Number(line);
    // a margem de erro e 8 porque o elemento pai tem 10px de margen
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

import { _lineheight_, paragraph_height, delay } from "./module.js";

let margin = Number(
  paragrafo_style.margin.substring(0, paragrafo_style.margin.indexOf("px"))
);
let border = Number(
  paragrafo_style.border.substring(0, paragrafo_style.border.indexOf("px"))
);
let padding = Number(
  paragrafo_style.padding.substring(0, paragrafo_style.padding.indexOf("px"))
);

//console_log('paragrafo_style: ',border)
//console_log('paragrafo_style: ',border)
// função que determina o tamanho da tela com base nos parâmetros
// parâmetros nomeados
export const tela = paragraph_height(
  { log: true, font_Size: data["font-size"], height: paiheight - 4 },
  margin,
  border,
  padding,
  10
);
paragrafo.style.height = tela[0] + "px";
//----------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------

console_log("linha " + lineHeight);

close.addEventListener("click", () => {
  highlight_status();
  let fonts = Number(font_size.value) > 12 ? font_size.value : 12;
  console_log(fonts);
  texto.style.fontSize = fonts + "px";

  highlight.style.height = lineHeight + "px";
  recarregarPagina();

  // Pegando o estado do checkbox (se está marcado ou não)
  // const backgroundType = document.getElementById("background-type").checked
  //   ? "black"
  //   : "white";
  const confger = {
    lang: lang.value,
    delay: Number($delayelement.value),
    marcador: marcador.value,
    "font-size": Number(font_size.value) > 12 ? font_size.value : "12",
    //background_type: backgroundType,
    theme: theme.value,
    autoScroll: autoScroll.checked,
  };

  saveText_json(confger, "comfger");
  //console_log("none");
  setingbtn.style.display = "block";
  setings.style.display = "none";
});

setingbtn.addEventListener("click", () => {
  //console_log("fixed");
  setingbtn.style.display = "none";
  setings.style.display = "block";
});
// ----------------------------------
// comfiguracoes gerais do Site

function activatedate() {
  let data = loadText_json("comfger");
  // Atribuir os valores carregados

  if (data) {
    $delayelement.value = data["delay"];
    marcador.value = data["marcador"];
    font_size.value = data["font-size"];
    // background_type.checked = data["background_type"] == "black" ? true : false;
    theme.value = data["theme"] ? data["theme"] : "auto";
    autoScroll.checked = data["autoScroll"];
    let font = Number(font_size.value);
    texto.style.fontSize = font_size.value + "px";
    // highlight.style.height = font + (font / 2) + "px";
  }
}

function saveText_json(data, name) {
  // Converte o objeto para uma string JSON
  const text = JSON.stringify(data);
  // Salva no LocalStorage
  localStorage.setItem(name, text);
}
function loadText_json(name) {
  // Pega o texto do LocalStorage
  const padrao = {
    lang: "en",
    delay: 2000,
    marcador: "button",
    "font-size": 18,
    //background_type: "white",
    theme: "auto",
    autoScroll: false,
  };
  const text = localStorage.getItem(name);

  // Verifica se o item existe e converte de volta para um objeto
  return text ? JSON.parse(text) : padrao;
}
data = loadText_json("comfger");
console_log(data);
document.documentElement.lang = lang.value;
window.onload = function () {
  let data = loadText_json("comfger");

  lang.value = data["lang"] ? data["lang"] : "en";

  scrollNumberline(false, true, data["font-size"]);
  activatedate();
  highlight_status();
  $delayelement.value = data["delay"] ? data["delay"] : 2000;
  let line = true;

  // Pegue o valor do line-height
  var linha = line
    ? Number(estilo.lineHeight.replace("px", ""))
    : -Number(paragrafo_style.lineHeight.replace("px", ""));
  console_log("linha " + linha + "" + data["font-size"]);
  let fh = Number(data["font-size"]);
  highlight.style.height = fh + fh / 2 + fh * 0.1 + "px";
  if (autoScroll.checked) {
    loadScroll(paragrafo);
  }
};

document.addEventListener("DOMContentLoaded", function () {
  // autura da rolagem do paragrafo
  window._scroll_height = paragrafo.scrollHeight;
  _scroll_height = paragrafo.scrollHeight;
  console_log("scroll_height:  " + window.scroll_height);

  let line = _lineheight_(data["font-size"]);
  console_log("line 478");
  console_log("line 478:  " + tela[0]);
});

// paragrafo.scrolltop = loadScroll();
// ----------------------------------------------------------------------
//-------------------------------------------------------------------------
//          background color select model
//---------------------------------------------------------------
//--------------------------------------------------------------------------

function select_backdround() {
  // opcoes: auto, black, white
  // auto: dia = white e noite = black
}

// ----------------------------------------------------------------------
//-------------------------------------------------------------------------
//         file load
//---------------------------------------------------------------
//--------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------------------------------------
// ctrl + tecla : reload page

//----------------------------------------------------------------------------------------------------------------------
// save posicao atual da pagina auto
