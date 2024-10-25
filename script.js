// barra que recebe o texto que o usuario quer ler
const input = document.getElementById("ler");
// botonhes para mostrar e esconder o texto
const startBTN = document.getElementById("start");
const resetBTN = document.getElementById("reset");
// elemento que mostra o texto
const paragrafo = document.getElementById("paragraph");
// botao responcavel por scroll's o equivalente a uma pagina
const page = document.getElementById("page");
// velocidade de scroll
const scrollspeed = 1;
// largura da janela
const width = window.innerWidth;
// altura da janela
const height = window.innerHeight;
// botonhes responcaveis por mover o marcador para cima ou para baixo
let setaps = document.getElementById("setas");
let setapb = document.getElementById("setab");

// Criar o elemento de destaque o marcador de texto
const highlight = document.createElement("div");
// add uma classe com os estilos para o marcador
highlight.className = "highlight";
// mostra os estilos utilizados no marcador
const highlight_estilo = window.getComputedStyle(highlight);
// add o marcador ao elemento pai body
document.body.appendChild(highlight);
// armazeana a posicao top do elemento para usos futuros
let highlight_top_erd = highlight_estilo.top;

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
  heightp = Number(paragrafo_style.height.replace("px", ""));
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
function alterarTop(novoTop) {
  let styleheight = Number(paragrafo_style.height.replace("px", ""));
  console.log(novoTop, styleheight);
  if (novoTop < highlight_top) {
    novoTop = highlight_top;
  }
  if (novoTop > styleheight - 25) {
    novoTop = styleheight - 10;
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

function move_marcador(line) {
  // Pegue o valor do line-height
  var linha = line
    ? Number(paragrafo_style.lineHeight.replace("px", ""))
    : -Number(paragrafo_style.lineHeight.replace("px", ""));

  alterarTop(Number(highlight_estilo.top.replace("px", "")) + linha);
  highlight.style.transition = "top 0.1s ease";
}

let cont = 1;
function highlight_status() {
  if (marcador.value == "mouse") {
    cont = 0;
    setapb.disabled = true;
    document.addEventListener("mousemove", function (event) {
      const y = event.clientY;
      alterarTop(y);
    });

    console.log(marcador.value);
  }
  if (marcador.value == "button") {
    console.log(marcador.value);
    if (cont < 1) {
      cont++;
      recarregarPagina();
    }
  }
}

setapb.addEventListener("click", () => {
  console.log("seta para baixo");
  //move_marcador(true)
  scrollNumberline(true,true,paragrafo, data["font-size"]);
});

setaps.addEventListener("click", () => {
  console.log("seta para baixo");
  //move_marcador(false);
  scrollNumberline(true,false,paragrafo, data["font-size"])
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

function scrollNumberline(active=true,type=true, element, font_size) {
  const teste = document.createElement("div");
  teste.className = "highlight";

  const computedStyle = window.getComputedStyle(element);
  line = Number(font_size) + (font_size /2)
  // Calcula a altura da linha
  const lineHeightInPixels =
    parseFloat(computedStyle.height) /line;

  console.log(`quantidade de linha: ${lineHeightInPixels}px`);
  console.log(`font_size: ${font_size}px`);
  console.log(`computedStyle.height: ${computedStyle.height}px`);
  console.log('line', line)

  teste.style.height = line + "px";
  document.body.appendChild(teste);

if (active){
var linha = type
? Number(line)
: -Number(line);

alterarTop(Number(highlight_estilo.top.replace("px", "")) + linha);
teste.style.transition = "top 0.1s ease";}
}

function play(){
  // a funcao pular uma linha
  // ate chegar no finall
  // if (
//antes_scll_hght == dpois_scll_hght
// )
// { pular a pagina}
}