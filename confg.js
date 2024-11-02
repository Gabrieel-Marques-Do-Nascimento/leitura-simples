import { paragrafo, paragrafo_style } from "./script.js";

window.addEventListener("beforeunload", function () {
  // Você pode salvar outras informações, como posição do scroll
  localStorage.setItem("scrollPosition", paragrafo.scrollTop);
});

export function loadScroll(element=null) {
  // Restaurar posição do scroll
  const scrollPosition = localStorage.getItem("scrollPosition");
  console.log("scrollPosition: ", scrollPosition);
  if (scrollPosition && element) {
    element.scrollTo({
      top: scrollPosition,
      behavior: "smooth",
    });
   
  }
  return scrollPosition? scrollPosition : 0
}


