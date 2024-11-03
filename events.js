import {
  _scroll_height,
  playbt,
  paragrafo_style,
  highlight_top,
  pausebt,
  pai_styleTo,
  paragrafo,
  alterarTop,
  highlight,
  highlight_estilo,
  data,
  scrollarParagrafo,
  tela,
  setapb,
  setaps,
  page,
  $delayelement,
  highlight_top_erd,
  mousemove,
  pixels,
} from "./script.js";
import { console_log } from "./utils.js";

export function new_page() {
  // posicao em pixels do scroll
  const scrolltop = paragrafo.scrollTop;
  // pega a posição de pixels do scroll mais a altura da janela
  let heightp = Number(paragrafo_style.height.replace("px", ""));
  let pixels = heightp + scrolltop;
  console_log("pixels " + pixels + "height " + heightp);
  // chama a funcao que altera a posição
  scrollarParagrafo(pixels);
  // desabilita o botão page por 1,5 segundos
  page.disabled = true;
  setTimeout(function () {
    page.disabled = false;
  }, 1500);
}



