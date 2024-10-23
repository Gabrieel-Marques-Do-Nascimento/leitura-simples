// menu de comfiguracoes
let setings = document.getElementById("setings");
let texto = document.getElementById('paragraph');
let setingbtn = document.getElementById("setting");
let close = document.getElementById("close");

close.addEventListener("click", () =>
{

let fonts = (Number(font_size.value) > 12 ) ? font_size.value : 12 ; 
console.log(fonts)
texto.style.fontSize = fonts + 'px'; 
highlight.style.height = fonts +  'px';

  // Pegando o estado do checkbox (se está marcado ou não)
const backgroundType = document.getElementById('background-type').checked ? 'white' : 'black';
const confger = {
  'marcador':  marcador.value,
  'font-size': (Number(font_size.value) > 12 ) ? font_size.value : '12' ,
  'background_type':background_type.value

 
};

   saveText(confger,'comfger') 
  //console.log("none");
  setingbtn.style.display = "block"
  setings.style.display = "none";

});

setingbtn.addEventListener("click", () =>
{
  //console.log("fixed");
  setingbtn.style.display = "none"
  setings.style.display = "block";
});
// ----------------------------------
// comfiguracoes gerais do Site

let marcador = document.getElementById('marcador');

let font_size = document.getElementById('font-size');
let background_type = document.getElementById('background-type');


function activatedate() {
  



  let data = loadText('comfger')
      // Atribuir os valores carregados
  
  if (data) {

      marcador.value = data[ 'marcador']
      font_size.value = data[ 'font-size']
      background_type.value = data[ 'background_type']  

    let font = Number(font_size.value )      
      texto.style.fontSize = font_size.value + 'px';
      highlight.style.height = font + (font / 4) + 'px';
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

console.log(loadText('comfger'))



window.onload = function () {

activatedate()
};