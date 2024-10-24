let setaps = document.getElementById("setas");
let setapb = document.getElementById("setab");

// Criar o elemento de destaque
const highlight = document.createElement("div");
highlight.className = "highlight";
const height_estilo = window.getComputedStyle(highlight);
const highlight_estilo = window.getComputedStyle(highlight);
paragrafo.appendChild(highlight);

// Função para alterar o valor de 'top'
let highlight_top = Number(highlight_estilo.top.replace("px", ""));
function alterarTop(novoTop) {
  let styleheight = Number(paragrafo_style.height.replace("px", ""));
  console.log(novoTop, styleheight)
  if (novoTop < highlight_top) {
    novoTop = highlight_top;
  }
  if (novoTop > styleheight) {
    novoTop = styleheight
  }
  //console.log(novoTop)
  highlight.style.top = novoTop + "px";
}

// // Alterar o top após 2 segundos
// setTimeout(() => {
//     alterarTop(100); // Novo valor para 'top'
// }, 2000); // Atraso de 2 segundos

// highlight.style.width = 52 + '%';
// highlight.style.margin = 'auto'
// Adicionar ao corpo

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

  alterarTop(Number(height_estilo.top.replace("px", "")) + linha);
  //console.log("limha", linha);
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
  move_marcador(true);
});

setaps.addEventListener("click", () => {
  console.log("seta para baixo");
  move_marcador(false);
});
