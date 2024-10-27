let data = loadText_json("comfger");
const fileConteiner = document.getElementById("fileConteiner");

// barra que recebe o texto que o usuario quer ler
const input = document.getElementById("ler");
// botonhes para mostrar e esconder o texto
const startBTN = document.getElementById("start");
const resetBTN = document.getElementById("reset");
// elemento que mostra o texto
const paragrafo = document.getElementById("paragraph");
var pai_styleTo = window.getComputedStyle(document.getElementById("pai"));
// botao responcavel por scroll's o equivalente a uma pagina

const height = window.innerHeight;
const paiheight = Number(pai_styleTo.height.replace('px',''));
console.log('pai height',paiheight, 'page height', height)


const page = document.getElementById("page");
// velocidade de scroll
const scrollspeed = 1;
// largura da janela
const width = window.innerWidth;
// altura da janela

// botonhes responcaveis por mover o marcador para cima ou para baixo
let setaps = document.getElementById("setas");
let playbt = document.getElementById("play");
let setapb = document.getElementById("setab");

// Criar o elemento de destaque o marcador de texto
const highlight = document.createElement("div");
// add uma classe com os estilos para o marcador
highlight.className = "highlight";
// mostra os estilos utilizados no marcador
highlight.style.width = pai_styleTo.width;
highlight.style.width = pai_styleTo.width;
console.log("psi", pai_styleTo.width);

const highlight_estilo = window.getComputedStyle(highlight);
// add o marcador ao elemento pai body
document.body.appendChild(highlight);
// armazeana a posicao top do elemento para usos futuros
let highlight_top_erd = highlight_estilo.top;
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
let background_type = document.getElementById("background-type");

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
}

// define o comportamento de alguns elementos como
// deve aparecer ou desaparecer da tela
function style_sec(rstdis, pdis, stdis, inpdis, texto) {
  resetBTN.style.display = rstdis;
  paragrafo.style.display = pdis; // Faz o parágrafo aparecer
  startBTN.style.display = stdis;
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
    highlight.style.top = highlight_top_erd;
    // com uma animação de 2 segundos
    highlight.style.transition = "top 2s ease";
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

// Obtém o caminho completo da URL atual
const currentUrl = window.location.href;

// Obtém apenas o diretório removendo o nome do arquivo (caso exista)
const directoryPath = currentUrl.substring(0, currentUrl.lastIndexOf("/") + 1);

import { _lineheight_, paragraph_height, play } from "./module.js";

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
let tela = paragraph_height(
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
  const backgroundType = document.getElementById("background-type").checked
    ? "black"
    : "white";
  const confger = {
    marcador: marcador.value,
    "font-size": Number(font_size.value) > 12 ? font_size.value : "12",
    background_type: backgroundType,
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
    marcador.value = data["marcador"];
    font_size.value = data["font-size"];
    background_type.checked = data["background_type"] == "black" ? true : false;

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
  const text = localStorage.getItem(name);

  // Verifica se o item existe e converte de volta para um objeto
  return text ? JSON.parse(text) : null;
}
data = loadText_json("comfger")
console.log(data);

window.onload = function () {
  let data = loadText_json("comfger");
  scrollNumberline(false, true, data["font-size"]);
  activatedate();
  highlight_status();

  let line = true;

  // Pegue o valor do line-height
  var linha = line
    ? Number(estilo.lineHeight.replace("px", ""))
    : -Number(paragrafo_style.lineHeight.replace("px", ""));
  console.log("linha", linha, data["font-size"]);
  let fh = Number(data["font-size"]);
  highlight.style.height = fh + fh / 2 + fh * 0.1 + "px";
};
