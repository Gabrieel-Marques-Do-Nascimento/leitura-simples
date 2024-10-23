// Criar o elemento de destaque
const highlight = document.createElement("div");
highlight.className = "highlight";

// Função para alterar o valor de 'top'
function alterarTop(novoTop) {
  highlight.style.top = novoTop + "px";
}

// // Alterar o top após 2 segundos
// setTimeout(() => {
//     alterarTop(100); // Novo valor para 'top'
// }, 2000); // Atraso de 2 segundos


 
// highlight.style.width = 52 + '%';
// highlight.style.margin = 'auto'
// Adicionar ao corpo
document.body.appendChild(highlight);

// let sima = document.getElementById('setas');
// let baixo = document.getElementById('setab');
function recarregarPagina() {
  location.reload();
}

function move_marcador()
{
  
}

let cont = 1
function highlight_status()
{

  if (marcador.value == 'mouse')
  {
    cont = 0
     document.addEventListener("mousemove", function (event) {
    const y = event.clientY;
    alterarTop(y);
  });

    console.log(marcador.value)
  }
  if (marcador.value == 'button') {
    console.log(marcador.value)
    if (cont < 1){
      cont ++
      recarregarPagina()
    }
  }
}
