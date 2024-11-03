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


export function autoThemeTime(){

}