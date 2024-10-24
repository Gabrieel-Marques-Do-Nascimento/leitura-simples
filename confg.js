// menu de comfiguracoes
let setings = document.getElementById("setings");
let texto = document.getElementById("paragraph");
let setingbtn = document.getElementById("setting");
let close = document.getElementById("close");
let marcador = document.getElementById("marcador");

let font_size = document.getElementById("font-size");
let background_type = document.getElementById("background-type");
// Obtenha o estilo computado do elemento
var estilo = window.getComputedStyle(texto);
// Pegue o valor do line-height
var lineHeight = estilo.lineHeight;

console.log('linha',lineHeight)

close.addEventListener("click", () => {
  highlight_status();  
  let fonts = Number(font_size.value) > 12 ? font_size.value : 12;
  console.log(fonts);
  texto.style.fontSize = fonts + "px";

  highlight.style.height = lineHeight + "px";
  recarregarPagina()


/* 
let setings = document.getElementById("setings");
let texto = document.getElementById("paragraph");
let setingbtn = document.getElementById("setting");
let close = document.getElementById("close");

// Obtenha o estilo computado do elemento
var estilo = window.getComputedStyle(texto);
// Pegue o valor do line-height e converta para número
var lineHeight = parseFloat(estilo.lineHeight);  // Converte para número
console.log('linha', lineHeight);

close.addEventListener("click", () => {
  highlight_status();  
  let fonts = Number(font_size.value) > 12 ? font_size.value : 12;
  console.log(fonts);
  texto.style.fontSize = fonts + "px";

  // Ajusta a altura de 'highlight' de acordo com o line-height
  highlight.style.height = lineHeight + "px";  // Usa o valor numérico aqui
});

*/








  // Pegando o estado do checkbox (se está marcado ou não)
  const backgroundType = document.getElementById("background-type").checked
    ? "white"
    : "black";
  const confger = {
    marcador: marcador.value,
    "font-size": Number(font_size.value) > 12 ? font_size.value : "12",
    background_type: background_type.value,
  };

  saveText(confger, "comfger");
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
  let data = loadText("comfger");
  // Atribuir os valores carregados

  if (data) {
    marcador.value = data["marcador"];
    font_size.value = data["font-size"];
    background_type.value = data["background_type"];

    let font = Number(font_size.value);
    texto.style.fontSize = font_size.value + "px";
    highlight.style.height = font + (font / 4) + "px";
  }
}

function saveText(data, name) {
  // Converte o objeto para uma string JSON
  const text = JSON.stringify(data);
  // Salva no LocalStorage
  localStorage.setItem(name, text);
}
function loadText(name) {
  // Pega o texto do LocalStorage
  const text = localStorage.getItem(name);

  // Verifica se o item existe e converte de volta para um objeto
  return text ? JSON.parse(text) : null;
}

console.log(loadText("comfger"));

window.onload = function () {
  activatedate();
  highlight_status();
  let line = true;
  var estilo = window.getComputedStyle(texto);
  // Pegue o valor do line-height
  var linha = line ? Number(estilo.lineHeight.replace('px','')) : - Number(estilo.lineHeight.replace('px',''));
  console.log('linha',linha)
};
