// ------------------------------- Importações de Módulos -------------------------------
import { buttonstatic, loger, console_log, recarregarPagina } from "./utils.js";
import { fileInput, dropZone } from "./files.js";
import { loadScroll, autoThemeTime } from "./confg.js";
import { new_page } from "./events.js";
import { _lineheight_, paragraph_height, delay } from "./module.js";
// ------------------------------- Elementos do DOM -------------------------------
export const $bookmarkColor = document.getElementById("bookmark");
export const $autoScroll = document.getElementById("autoScroll");
export const paragrafo = document.getElementById("paragraph");
export const $input = document.getElementById("ler");
export const $clearBtn = document.getElementById("clearBtn");
export let setaps = document.getElementById("setas");
export let playbt = document.getElementById("play");
export let pausebt = document.getElementById("pause");
const startBTN = document.getElementById("start");
const resetBTN = document.getElementById("reset");
export let setapb = document.getElementById("setab");
export let $delayelement = document.getElementById("delay");
export const page = document.getElementById("page");
const lang = document.getElementById("lang");
let texto = document.getElementById("paragraph");
let setingbtn = document.getElementById("setting");
let close = document.getElementById("close");
let marcador = document.getElementById("marcador");
let font_size = document.getElementById("font-size");
export const $pai = document.getElementById("pai");
const theme = document.getElementById("theme");
// retorna uma lista de elementos
let $buttons = document.querySelectorAll(".scrollbt");
// ------------------------------- Elementos Dinâmicos -------------------------------
export const highlight = document.createElement("div");
// add uma classe com os estilos para o marcador
highlight.className = "highlight";
// add o marcador ao elemento pai body
document.body.appendChild(highlight);
// ------------------------------- Estilos Computados -------------------------------
export let _scroll_height = paragrafo.scrollHeight;
export var pai_styleTo = window.getComputedStyle(
  document.getElementById("pai")
);
export const highlight_estilo = window.getComputedStyle(highlight);
export var paragrafo_style = window.getComputedStyle(texto);
var estilo = window.getComputedStyle(texto);
// ------------------------------- Variáveis de Controle e Estado -------------------------------
let actionExecuted = false; // Variável de controle

let margin = Number(
  paragrafo_style.margin.substring(0, paragrafo_style.margin.indexOf("px"))
);
let border = Number(
  paragrafo_style.border.substring(0, paragrafo_style.border.indexOf("px"))
);
let padding = Number(
  paragrafo_style.padding.substring(0, paragrafo_style.padding.indexOf("px"))
);
export const height = window.innerHeight;
const window_width = window.innerWidth;
export let data = loadText_json("comfger");
export let highlight_top_erd = pai_styleTo.marginTop; //highlight_estilo.top;
export let pixels = 0;
data = loadText_json("comfger");
document.documentElement.lang = lang.value;
const paiheight = Number(pai_styleTo.height.replace("px", ""));
highlight.style.width = window_width < 768 ? "98vw" : pai_styleTo.width;
var lineHeight = estilo.lineHeight;
let fh = Number(data["font-size"]);
highlight.style.height = fh + fh / 2 - 2 + "px";
highlight.style.background = data["color"];
/**
 *  função que determina o tamanho da tela com base nos parâmetros
 parâmetros nomeados
 */
export const tela = paragraph_height(
  { log: true, font_Size: data["font-size"], height: paiheight - 4 },
  margin,
  border,
  padding,
  10
);
paragrafo.style.height = tela[0] + "px";
/**
 * posição na vertical  do elemento highlight
 */
export let highlight_top = Number(highlight_estilo.top.replace("px", ""));
let cont = 1;
export let mousemove = true;
// ------------------------------ LOGS---------------------------------------------------------
console_log("line 1 (script.js): " + data ? data : "nao existe");
console_log("pai height" + paiheight + "page height" + height);
console_log("pai" + pai_styleTo.width);
console_log(data, true);
console_log("linha " + lineHeight);
console.log(Number(paragrafo_style.width.replace("px", "")));
// ------------------------------- Funções para Manuseio de Texto -------------------------------
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
    $autoScroll: false,
    color: "#00f000",
  };
  const text = localStorage.getItem(name);
  // Verifica se o item existe e converte de volta para um objeto
  return text ? JSON.parse(text) : padrao;
}
// ------------------------------- Funções de Estilização e Atualização da Interface -------------------------------
/**
 *define o comportamento de alguns elementos como
 * deve aparecer ou desaparecer da tela
 * @param {*} rstdis
 * @param {*} pdis
 * @param {*} stdis
 * @param {*} inpdis
 * @param {*} texto
 */
function style_sec(rstdis, pdis, stdis, inpdis, texto) {
  resetBTN.style.display = rstdis;
  paragrafo.style.display = pdis; // Faz o parágrafo aparecer
  $pai.style.display = pdis;
  startBTN.style.display = stdis;
  $clearBtn.style.display = stdis;
  highlight.style.display = rstdis;

  $input.style.display = inpdis;
  paragrafo.innerHTML = texto;
  document.getElementById("fileConteiner").style.display = inpdis;
}
// ------------------------------- Funções de Scroll e Movimento -------------------------------
/**
 * funcao responcavel por scrollar ate a distancia em pixels especificada
 * @param {*} pixels os s que elemento deve mover em relação ao scroll
 * @param {*} so se deve ser aplicado os efeitos
 */
export function scrollarParagrafo(pixels, so = true) {
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
  let largura = window_width;

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
  // if (novoTop < highlight_top) {
  //   novoTop = highlight_top;
  // }
  // if (novoTop > styleheight) {
  //   novoTop = styleheight - (line - error);
  // }
  highlight.style.top = novoTop + "px";
}
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
// ------------------------------- Configuração Inicial e Eventos de Interface -------------------------------
/**
 *  Função para carregar configurações e iniciar a página
 */
function activatedate() {
  let data = loadText_json("comfger");
  // Atribuir os valores carregados

  if (data) {
    $delayelement.value = data["delay"];
    marcador.value = data["marcador"];
    font_size.value = data["font-size"];
    // background_type.checked = data["background_type"] == "black" ? true : false;
    theme.value = data["theme"] ? data["theme"] : "auto";
    $autoScroll.checked = data["$autoScroll"];
    let font = Number(font_size.value);
    texto.style.fontSize = font_size.value + "px";
    // highlight.style.height = font + (font / 2) + "px";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // autura da rolagem do paragrafo
  window._scroll_height = paragrafo.scrollHeight;
  _scroll_height = paragrafo.scrollHeight;
  console_log("scroll_height:  " + window.scroll_height);
  let line = _lineheight_(data["font-size"]);
  console_log("line 478");
  console_log("line 478:  " + tela[0]);
});
/**
 *  apos add o texto ao $input penas com um enter ele mostra o texto
 */
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
page.addEventListener("click", () => {
  mousemove = false;
  new_page();

  let teste = highlight_top_erd;
  console_log("paragrafo_style " + teste);
  // se o marcador usado for pelos botoes seta
  if (marcador.value == "button") {
    // retorna o marcador para a posição inicial
  }
});
document.addEventListener("keydown", function (e) {
  if (e.key === "q") {
    new_page();
  }
});
setingbtn.addEventListener("click", () => {
  setingbtn.style.display = "none";
  setings.style.display = "block";
});

setapb.addEventListener("click", () => {
  console_log("seta para baixo");
  //move_marcador(true)
  scrollNumberline(true, true, data["font-size"], setapb);
});
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
// Chama a função para carregar o texto ao abrir a página
window.onload = loadText("savedText");
/**
 *  font responsável por verificar e modificar atualizar a page
 */
function highlight_status() {
  let line = _lineheight_(data["font-size"]);
  // se o marcador for igual a mouse
  if (marcador.value == "mouse") {
    cont = 0;
    // desativa os botoes
    setapb.disabled = true;
    setaps.disabled = true;
    playbt.disabled = true;
    document.addEventListener("mousemove", function (event) {
      // add um evento para posicionar o marcador onde estiver o mouse
      // obtem a posicao atual do mouse
      const y = event.clientY;
      // altera  a position_top do marcador para onde estiver o mouse
      alterarTop(y, 8, line); // dentro limites do elemento paragraph
    });

    console_log("marcador.value: " + marcador.value);
  }
  if (marcador.value == "button") {
    // se o marcador for igual a button
    console_log(marcador.value);

    if (cont < 1) {
      // contador menor que 1
      cont++; // cont = 1
      recarregarPagina(); // recarrega a page
    }
  }

  if (marcador.value == "screen" && mousemove) {
    setab.disabled = true;
    setaps.disabled = true;
    playbt.disabled = true;
    let telaHeight = tela[0];
    document.addEventListener("mousemove", function (event) {
      // body...
      const y = event.clientY;
      if (y < telaHeight / 2) {
        scrollNumberline(true, false, data["font-size"]);
      }
      if (y > telaHeight / 2) {
        scrollNumberline(true, true, data["font-size"]);
      }
    });
  }
}
close.addEventListener("click", () => {
  let setings = document.getElementById("setings");
  highlight_status();
  let fonts = Number(font_size.value) > 12 ? font_size.value : 12;
  console_log(fonts);
  texto.style.fontSize = fonts + "px";
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
    $autoScroll: $autoScroll.checked,
    color: $bookmarkColor.value,
  };
  saveText_json(confger, "comfger");
  //console_log("none");
  setingbtn.style.display = "block";
  setings.style.display = "none";
});

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
  // Pegue o valor do line-height
  var linha = line
    ? Number(estilo.lineHeight.replace("px", ""))
    : -Number(paragrafo_style.lineHeight.replace("px", ""));
  console_log("linha " + linha + "" + data["font-size"]);
  let fh = Number(data["font-size"]);
  highlight.style.height = fh + fh / 2 - 2 + "px"; //fh + (fh / 2) + fh * 0.1 + "px";
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
  // caso o paragrafo for display none desabilita os bottons
  if (paragrafo_style.display == "none") {
    console.log("paragraph: ", paragrafo_style.display);
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