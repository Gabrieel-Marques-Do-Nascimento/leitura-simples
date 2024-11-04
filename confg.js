import { paragrafo, paragrafo_style } from "./script.js";
import { console_log } from "./utils.js";

window.addEventListener("beforeunload", function () {
  // Você pode salvar outras informações, como posição do scroll
  localStorage.setItem("scrollPosition", paragrafo.scrollTop);
});

export function loadScroll(element = null) {
  // Restaurar posição do scroll
  const scrollPosition = localStorage.getItem("scrollPosition");
  console_log("scrollPosition: ", scrollPosition);
  if (scrollPosition && element) {
    element.scrollTo({
      top: scrollPosition,
      behavior: "smooth",
    });
  }
  return scrollPosition ? scrollPosition : 0;
}

let style = document.createElement("style");
style.type = "text/css";


/**
 * funcao que define o tema do site
 * @param {*} hora tema automático ou tema escolhido manualmente ex: 12: dia, 0: noite
 * @param {*} fixed false se for tema automático ou true se o tema for manual
 */
export function autoThemeTime(hora=0, fixed=false) {
  let data = new Date();
if (!fixed) {
    hora = data.getHours();
}


  if (hora >= 6 && hora <= 18) {
    // tema dia
    style.innerText = `
 body {
       background-color: #ffff;}
#pai {
        background-color: #ffff;}
`;
  }
  if (hora < 6 || hora > 18) {
    // tema noite
    style.innerText = `
 body {
       background-color:  #000;}
#pai {
        background-color: rgba(255, 255, 255, 0.71);}    
        #paragraph { border: 1px solid #ccc;
        border: 1px solid #000;}
        
`;
  }
}

document.body.appendChild(style);
