let delayelement = document.getElementById("delay");
let data = loadText_json("comfger");
console.log("line 1 (script.js)", data ? data : "nao existe");
const fileConteiner = document.getElementById("fileConteiner");

// barra que recebe o texto que o usuario quer ler
const input = document.getElementById("ler");
// botonhes para mostrar e esconder o texto
const startBTN = document.getElementById("start");
const resetBTN = document.getElementById("reset");
// elemento que mostra o texto
const paragrafo = document.getElementById("paragraph");
const pai = document.getElementById("pai");
var pai_styleTo = window.getComputedStyle(document.getElementById("pai"));
// botao responcavel por scroll's o equivalente a uma pagina

const height = window.innerHeight;
const paiheight = Number(pai_styleTo.height.replace("px", ""));
console.log("pai height", paiheight, "page height", height);

const console_user = document.getElementById("console");
const page = document.getElementById("page");
// linguagem da pagina
const lang = document.getElementById("lang");
// botonhes responcaveis por mover o marcador para cima ou para baixo
let setaps = document.getElementById("setas");
let playbt = document.getElementById("play");
let pausebt = document.getElementById("pause");
let setapb = document.getElementById("setab");

// Criar o elemento de destaque o marcador de texto
const highlight = document.createElement("div");
// add uma classe com os estilos para o marcador
highlight.className = "highlight";
// mostra os estilos utilizados no marcador
highlight.style.width = pai_styleTo.width;
highlight.style.width = pai_styleTo.width;
console.log("pai", pai_styleTo.width);

const highlight_estilo = window.getComputedStyle(highlight);
// add o marcador ao elemento pai body
document.body.appendChild(highlight);
// armazeana a posicao top do elemento para usos futuros
let highlight_top_erd = pai_styleTo.marginTop; //highlight_estilo.top;
// --------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------
// menu de comfiguracoes
let setings = document.getElementById("setings");
let texto = document.getElementById("paragraph");
let setingbtn = document.getElementById("setting");
let close = document.getElementById("close");

let marcador = document.getElementById("marcador");
var paragrafo_style = window.getComputedStyle(texto);
let font_size = document.getElementById("font-size");

// elemento removido e substituido por 'theme'
// let background_type = document.getElementById("background-type");
const theme = document.getElementById("theme");

// Obtenha o estilo computado do elemento
var estilo = window.getComputedStyle(texto);
// Pegue o valor do line-height
var lineHeight = estilo.lineHeight;
// ---------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------

// funcao responcavel por scrollar ate a distancia em pixels especificada
function scrollarParagrafo(pixels) {
  // paragrafo.scrollTo({
  //   top: pixels - 55,
  //   behavior: "smooth",
  // });

  paragrafo.scrollTo({
    top: pixels,
    behavior: "smooth",
  });
  highlight.style.top = highlight_top_erd;
  // com uma animação de 2 segundos
  highlight.style.transition = "top 2s ease";
  setTimeout(() => {
    highlight.style.transition = "top 0.2s ease";
  }, 1000);
}

// define o comportamento de alguns elementos como
// deve aparecer ou desaparecer da tela
function style_sec(rstdis, pdis, stdis, inpdis, texto) {
  resetBTN.style.display = rstdis;
  paragrafo.style.display = pdis; // Faz o parágrafo aparecer
  pai.style.display = pdis;
  startBTN.style.display = stdis;
  highlight.style.display = rstdis;

  input.style.display = inpdis;
  paragrafo.innerHTML = texto;
  fileConteiner.style.display = inpdis;
}

// retorna uma lista de elementos
let buttons = document.querySelectorAll(".scrollbt");
// funcso que define se os bottons devem aparecer ou ficar escondido
function buttonstatic(estado) {
  // loop
  buttons.forEach((button) => {
    button.style.display = estado;
  });
}

// apos add o texto ao input penas com um enter ele mostra o texto
input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    // Aqui você pode colocar a ação que deseja realizar ao pressionar Enter
    saveText(input.value, "savedText");
    buttonstatic("block");
    style_sec("block", "block", "none", "none", input.value);
  }
});
// apos add o texto ao input penas com um click no 'start' ele mostra o texto
startBTN.addEventListener("click", () => {
  saveText(input.value, "savedText");
  style_sec("block", "block", "none", "none", input.value);
  buttonstatic("block");
});
// apos add o texto ao input penas com um 'reset' ele esconde  o texto
// para add um novo texto
resetBTN.addEventListener("click", () => {
  buttonstatic("none");
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
  console.log("pixels", pixels, "height", heightp);
  // chama a funcao que altera a posição
  scrollarParagrafo(pixels);
  // desabilita o botão page por 1,5 segundos
  page.disabled = true;
  setTimeout(function () {
    page.disabled = false;
  }, 1500);

  let teste = highlight_top_erd;
  console.log("paragrafo_style", teste);
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
    input.value = savedText;
    return savedText;
  }
}

// Chama a função para carregar o texto ao abrir a página
window.onload = loadText("savedText");

//----------------------------------------------------------------------------------------------------------------------
//                   marcador de texto
// Função para alterar o valor de 'top'
let highlight_top = Number(highlight_estilo.top.replace("px", ""));
let highlight_height = Number(highlight_estilo.height);
function alterarTop(novoTop, error = 0, line = 0) {
  let styleheight = Number(paragrafo_style.height.replace("px", ""));
  console.log("-------------------------------------------------");
  console.log("alterarTop function: ", novoTop, styleheight);
  console.log("erro:", error);
  console.log("line:", line);
  console.log("-------------------------------------------------");
  let end_line = tela[1];
  highlight.style.transition = "top 0.1s ease";
  if (novoTop < highlight_top) {
    novoTop = highlight_top;
  }
  if (novoTop > styleheight) {
    novoTop = styleheight - (line - error);
  }

  highlight.style.top = novoTop + "px";
}

function recarregarPagina() {
  location.reload();
}

function scrollarline(pixel) {
  highlight.scrollTo({
    top: pixel,
    behavior: "smooth",
  });
}

// function move_marcador(line) {
//   // Pegue o valor do line-height
//   var linha = line
//     ? Number(paragrafo_style.lineHeight.replace("px", ""))
//     : -Number(paragrafo_style.lineHeight.replace("px", ""));

//   alterarTop(Number(highlight_estilo.top.replace("px", "")) + linha, 8, linha);
//   highlight.style.transition = "top 0.1s ease";
// }

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

    console.log(marcador.value);
  }
  // se o marcador for igual a button
  if (marcador.value == "button") {
    console.log(marcador.value);
    // contador menor que 1
    if (cont < 1) {
      // cont = 1
      cont++;
      // recarrega a page
      recarregarPagina();
    }
  }
}

setapb.addEventListener("click", () => {
  console.log("seta para baixo");
  //move_marcador(true)
  scrollNumberline(true, true, data["font-size"], setapb);
});

setaps.addEventListener("click", () => {
  console.log("seta para baixo");
  //move_marcador(false);
  scrollNumberline(true, false, data["font-size"], setaps);
});

// ----------------------------------------------------------------------------------------------------------------------
// barra de scroll
let scroll_top = document.createElement("div");
let is_scroll = document.getElementsByClassName("scroll");

// Selecionar o elemento (por exemplo, pela classe)
var elemento = document.getElementById("paragraph");
// Obter o tamanho da janela (viewport)
var larguraJanela = window.innerWidth;
var alturaJanela = window.innerHeight;

let style = document.createElement("style");
style.type = "text/css";
style.innerText = `
        .scroll_top {
            background-color: green;
            position: fixed;
            width: 0%;
            height: 10px;
            bottom: 0px;
            left: 0;
            z-index: -1;
        }
    @media (max-width: 768px) {
        .scroll_top {
            top: 0px;
            left: 0;
        }
        }
`;
document.body.appendChild(style);

scroll_top.classList.add("scroll_top");
document.body.appendChild(scroll_top);

paragrafo.addEventListener("scroll", () => {
  let vertical =
    (paragrafo.scrollTop / (paragrafo.scrollHeight - paragrafo.clientHeight)) *
    100;
  let horizontal = (vertical / 100) * window.innerWidth;
  scroll_top.style.width = horizontal + 1 + "px";
});

// Comparar os tamanhos
console.log("Largura da janela: " + larguraJanela + "px");
console.log("Altura da janela: " + alturaJanela + "px");

//----------------------------------------------------------------------------------------------------------------------
// funcao para substituir a função de saltar pagina

function scrollNumberline(
  active = true,
  type = true,
  font_size,
  button = null
) {
  const computedStyle = window.getComputedStyle(paragrafo);
  let line = Number(font_size) + Number(font_size) / 2;
  // Calcula a altura da linha
  const lineHeightInPixels = parseFloat(computedStyle.height) / line;

  console.log("--------------------------------");
  console.log(`quantidade de linha: ${lineHeightInPixels} lines`);
  console.log(`font_size: ${font_size}px`);
  console.log(`computedStyle.height: ${computedStyle.height}px`);
  console.log("line", line);
  console.log("----------------------------------");

  if (active) {
    var linha = type ? Number(line) : -Number(line);
    // a margem de erro e 8 porque o elemento pai tem 10px de margen
    alterarTop(
      Number(highlight_estilo.top.replace("px", "")) + linha,
      8,
      linha
    );

    highlight.style.transition = "top 0.1s ease";
    button.disabled = true;
    setTimeout(function () {
      button.disabled = false;
    }, 500);
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

//console.log('paragrafo_style: ',border)
//console.log('paragrafo_style: ',border)
// função que determina o tamanho da tela com base nos parâmetros
// parâmetros nomeados
const tela = paragraph_height(
  { log: true, font_Size: data["font-size"], height: paiheight - 4 },
  margin,
  border,
  padding,
  10
);
paragrafo.style.height = tela[0] + "px";
//----------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------

console.log("linha", lineHeight);

close.addEventListener("click", () => {
  highlight_status();
  let fonts = Number(font_size.value) > 12 ? font_size.value : 12;
  console.log(fonts);
  texto.style.fontSize = fonts + "px";

  highlight.style.height = lineHeight + "px";
  recarregarPagina();

  // Pegando o estado do checkbox (se está marcado ou não)
  // const backgroundType = document.getElementById("background-type").checked
  //   ? "black"
  //   : "white";
  const confger = {
    lang: lang.value,
    delay: Number(delayelement.value),
    marcador: marcador.value,
    "font-size": Number(font_size.value) > 12 ? font_size.value : "12",
    //background_type: backgroundType,
    theme: theme.value,
  };

  saveText_json(confger, "comfger");
  //console.log("none");
  setingbtn.style.display = "block";
  setings.style.display = "none";
});

setingbtn.addEventListener("click", () => {
  //console.log("fixed");
  setingbtn.style.display = "none";
  setings.style.display = "block";
});
// ----------------------------------
// comfiguracoes gerais do Site

function activatedate() {
  let data = loadText_json("comfger");
  // Atribuir os valores carregados

  if (data) {
    delayelement.value = data["delay"];
    marcador.value = data["marcador"];
    font_size.value = data["font-size"];
    // background_type.checked = data["background_type"] == "black" ? true : false;
    theme.value = data["theme"] ? data["theme"] : "auto";

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
  };
  const text = localStorage.getItem(name);

  // Verifica se o item existe e converte de volta para um objeto
  return text ? JSON.parse(text) : padrao;
}
data = loadText_json("comfger");
console.log(data);
document.documentElement.lang = lang.value;
window.onload = function () {
  let data = loadText_json("comfger");

  lang.value = data["lang"] ? data["lang"] : "en";

  scrollNumberline(false, true, data["font-size"]);
  activatedate();
  highlight_status();
  delayelement.value = data["delay"] ? data["delay"] : 2000;
  let line = true;

  // Pegue o valor do line-height
  var linha = line
    ? Number(estilo.lineHeight.replace("px", ""))
    : -Number(paragrafo_style.lineHeight.replace("px", ""));
  console.log("linha", linha, data["font-size"]);
  let fh = Number(data["font-size"]);
  highlight.style.height = fh + fh / 2 + fh * 0.1 + "px";
};

document.addEventListener("DOMContentLoaded", function () {
  // autura da rolagem do paragrafo
  window.scroll_height = paragrafo.scrollHeight;
  console.log("scroll_height:  ", window.scroll_height);

  let line = _lineheight_(data["font-size"]);
  console.log("line 478");
  console.log("line 478", tela[0]);

  window.pause = false;
  playbt.addEventListener("click", function () {
    window.pause = false;
    playbt.style.display = "none";
    pausebt.style.display = "block";
    play(
      line,

      paragrafo,
      Number(window.scroll_height),
      alterarTop,
      [Number(highlight_top_erd.replace("px", "")) + line, 8, line],
      scrollarParagrafo,
      loger,
      2000
    );
  });
});
pausebt.addEventListener("click", function () {
  window.pause = true;
  playbt.style.display = "block";
  pausebt.style.display = "none";
  playbt.disabled = true;
  setTimeout(function () {
    playbt.disabled = false;
  }, (tela[0] / tela[1]) * (data["delay"] + 500));
});
const console_text = document.getElementById("console-text");
console_user.addEventListener("click", function () {
  console_text.style.display = "block";
  console_user.style = `top: 100px;
                        left: 10%;
                        height:50%;
                        width: 80%;`;
});
console_user.addEventListener("dblclick", function () {
  console_user.style = `        top: 0px;           
                                height: 18px;
                                width: 40px;`;
  console_text.style.display = "none";
});

function loger(text) {
  console_text.innerHTML += text + "</br>";
}

// player function
// ----------------------------------
export function play(
  line_heght,

  elementhtml,
  scroll_heigh,
  dow_line_func,
  line_func_paramt,
  page_func,
  loger,
  ndelay
) {
  // autura da rolagem do paragrafo

  const line_size = parseInt(tela[0] / line_heght);

  loger("line_size: " + line_size);

  function aut_page() {
    let the_end = false;

    // Altura total do documento
    const scrollHeight = paragrafo.scrollHeight;
    console.log("scrollHeight", scrollHeight);
    // Altura da janela visível
    const clientHeight = paragrafo.clientHeight;
    console.log("clientHeight", clientHeight);
    // Distância rolada pelo usuário
    let scrollTop = paragrafo.scrollTop;
    let scrollbotton = scrollTop + clientHeight;
    console.log("scrollbotton", scrollbotton);
    console.log("scrollTop", scrollTop);
    // Verifica se a rolagem chegou ao final
    if (scrollbotton + 1 >= scrollHeight) {
      console.log("Chegou ao final da página!");

      the_end = true;
    }

    scrollarParagrafo(tela[0] + scrollTop);
    console.log("the_end", the_end);
    return the_end;
  }

  async function aut_line() {
    let delay_al = delayelement.value;
    let marcador_top = line_func_paramt[0];

    for (let i = 0; i < line_size; i++) {
      await delay(delay_al);
      alterarTop(marcador_top, line_func_paramt[1], line_func_paramt[2]);
      
      marcador_top += line_func_paramt[2];
    }
    // return true;
  }

  async function runner() {
    let end = false;

    while (true) {
      await delay(2000);
      // Verifica se aut_line() retorna true
      let vr = await aut_line(); // aut_line() precisa retornar um booleano

      if (window.pause) {
        // elemento responcavel por pausar a reproducao
        highlight.style.top = highlight_top_erd;
        break;
      }
      end = aut_page();
      if (vr) {
        // Se aut_line for true, atualiza engrenagem com posição de scroll atual
        // As variáveis scrollTop e tela precisam estar definidas anteriormente
      }

      // Verifica se é hora de encerrar o loop
      if (end) {
        break; // Interrompe o loop
      }
    }
  }
  runner();
}

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
import { fileInput, dropZone } from "./files.js";

function readFile(file) {
  if (file && file.type === "text/plain") {
    const reader = new FileReader();
    reader.onload = function (e) {
      // aqui o elemento mostrar recebe o texto do arquivo como texto dele mesmo
      input.value = e.target.result;
    };
    reader.onerror = function () {
      dropZone.style.color = "red";
      dropZone.textContent = "Erro ao ler o arquivo.";
    };
    reader.readAsText(file, "UTF-8");
  } else {
    dropZone.style.color = "red";
    dropZone.textContent =
      "Por favor, escolha um arquivo de texto (.txt) válido.";
  }
}

// Adiciona/remova classe 'hover' ao arrastar o arquivo sobre a zona de soltar
["dragenter", "dragover"].forEach((eventType) => {
  dropZone.addEventListener(eventType, () => dropZone.classList.add("hover"));
});

["dragleave", "drop"].forEach((eventType) => {
  dropZone.addEventListener(eventType, () =>
    dropZone.classList.remove("hover")
  );
});

// Eventos para clicar e selecionar o arquivo
dropZone.addEventListener("click", () => fileInput.click());
fileInput.addEventListener("change", (e) => readFile(e.target.files[0], input));

// Previne o comportamento padrão de arrastar e soltar
["dragenter", "dragover", "dragleave", "drop"].forEach((eventType) => {
  dropZone.addEventListener(eventType, (e) => e.preventDefault());
});

// Evento para ler o arquivo ao soltar
dropZone.addEventListener("drop", (e) => {
  const file = e.dataTransfer.files[0];
  input.value = readFile(file);
});


// ----------------------------------------------------------------------------------------------------------------------
// ctrl + tecla : reload page

//----------------------------------------------------------------------------------------------------------------------
// save posicao atual da pagina auto