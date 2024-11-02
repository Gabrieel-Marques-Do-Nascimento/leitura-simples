import { paragrafo, paragrafo_style } from "./script.js";

window.addEventListener("beforeunload", function () {
  // Você pode salvar outras informações, como posição do scroll
  localStorage.setItem("scrollPosition", paragrafo.scrollTop + "px");
});

export function loadScroll(element) {
  // Restaurar posição do scroll
  const scrollPosition = localStorage.getItem("scrollPosition");
  console.log("scrollPosition: ", scrollPosition);
  if (scrollPosition) {
    element.scrollTo({
      top: `${900}px`,
      behavior: "smooth",
    });
    console.log(800);
  }
}
