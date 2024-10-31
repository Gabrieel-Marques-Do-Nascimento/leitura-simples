import {
  _scroll_height,
  playbt,
  pausebt,
  paragrafo,
  alterarTop,
  highlight,
  highlight_estilo,
  data,
  scrollarParagrafo,
  tela,
  $delayelement,
  highlight_top_erd,
} from "./script.js";
import { loger, console_log } from "./utils.js";
import { delay } from "./module.js";
import { _lineheight_ } from "./module.js";

let line = _lineheight_(data["font-size"]);

window.pause = false;
playbt.addEventListener("click", function () {
  window.pause = false;
  playbt.style.display = "none";
  pausebt.style.display = "block";
  play(
    line,

    paragrafo,
    Number(_scroll_height),
    alterarTop,
    [Number(highlight_estilo.top.replace("px", "")) + line, 8, line],
    scrollarParagrafo,
    loger,
    2000
  );
});

pausebt.addEventListener("click", function () {
  window.pause = true;
  playbt.style.display = "block";
  pausebt.style.display = "none";
  playbt.disabled = true;
  setTimeout(function () {
    playbt.disabled = false;
  }, (tela[0] / tela[1]) * (data["delay"] + 500));
});

// player function
// ----------------------------------
function play(
  line_heght,

  elementhtml,
  scroll_heigh,
  dow_line_func,
  line_func_paramt,
  page_func,
  loger,
  ndelay
) {
  // autura da rolagem do paragrafo

  const line_size = parseInt(tela[0] / line_heght);

  loger("line_size: " + line_size);

  function aut_page() {
    let the_end = false;

    // Altura total do documento
    const scrollHeight = paragrafo.scrollHeight;
    console_log("scrollHeight " + scrollHeight);
    // Altura da janela visível
    const clientHeight = paragrafo.clientHeight;
    console_log("clientHeight " + clientHeight);
    // Distância rolada pelo usuário
    let scrollTop = paragrafo.scrollTop;
    let scrollbotton = scrollTop + clientHeight;
    console_log("scrollbotton " + scrollbotton);
    console_log("scrollTop " + scrollTop);
    // Verifica se a rolagem chegou ao final
    if (scrollbotton + 1 >= scrollHeight) {
      console_log("Chegou ao final da página!");

      the_end = true;
    }

    scrollarParagrafo(tela[0] + scrollTop);
    console_log("the_end " + the_end);
    return the_end;
  }

  async function aut_line() {
    let delay_al = $delayelement.value;
    let marcador_top = line_func_paramt[0];

    for (let i = 0; i < line_size; i++) {
      await delay(delay_al);
      alterarTop(marcador_top, line_func_paramt[1], line_func_paramt[2]);

      marcador_top += line_func_paramt[2];
    }
    // return true;
  }

  async function runner() {
    let end = false;

    while (true) {
      await delay(2000);
      // Verifica se aut_line() retorna true
      let vr = await aut_line(); // aut_line() precisa retornar um booleano

      if (window.pause) {
        // elemento responcavel por pausar a reproducao
        highlight.style.top = highlight_top_erd;
        break;
      }
      end = aut_page();
      if (vr) {
        // Se aut_line for true, atualiza engrenagem com posição de scroll atual
        // As variáveis scrollTop e tela precisam estar definidas anteriormente
      }

      // Verifica se é hora de encerrar o loop
      if (end) {
        break; // Interrompe o loop
      }
    }
  }
  runner();
}
