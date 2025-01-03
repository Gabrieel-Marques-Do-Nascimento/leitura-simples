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
} from "./script.js";
import { loger, console_log } from "./utils.js";
import { delay } from "./module.js";
import { _lineheight_ } from "./module.js";

function buttons_state(buttons, state) {
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = state[i];
  }
}

/**
 * função que altera a posição do elemento highlight
 * @param {*} novoTop nova posição do elemento
 * @param {*} error margem de erro da posição
 * @param {*} line altura da linha
 * @param {*} on se deve ou nao as opções segundarias
 */
async function alterarTop_local(novoTop, error = 0, line = 0, on = true) {
  /**
   *  autura da pagina em pixels
   */
  let styleheight = Number(paragrafo_style.height.replace("px", ""));
  console_log("-------------------------------------------------");
  console_log("alterarTop function: " + novoTop + "" + styleheight);
  console_log("erro:" + error);
  console_log("line:" + line);
  console_log("-------------------------------------------------");
  let end_line = tela[1];
  if (on) {
    // define a transição da altura do elementos caso seja add um algum valor muito alto
    highlight.style.transition = "top 0.1s ease";
  }

  /**
   * evitar que o elemento saia do limite de altura esperada
   */
  if (novoTop < highlight_top) {
    // novo top recebe o top atual do highlight_
    novoTop = highlight_top;
  }
  // evitar que o elemento saia do limite de altura esperada
  if (novoTop > styleheight) {
    novoTop = styleheight - (line - error);
  }

  highlight.style.top = novoTop + "px";
}

/**
 * atura da linha da pagina
 */
let line = _lineheight_(data["font-size"]);

window.pause = false;
playbt.addEventListener("click", function () {
  buttons_state([setapb, setaps, page], [true, true, true]);

  pausebt.style.animation = "girar 2s linear infinite";
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
  buttons_state([setapb, setaps, page, playbt], [false, false, false, true]);
  window.pause = true;
  playbt.style.display = "block";
  pausebt.style.display = "none";

  setTimeout(function () {
    playbt.disabled = false;
  }, 600); //, ((tela[0] / tela[1]) * data["delay"]) + 500);
});

// player function
// ----------------------------------

/**
 *
 * @returns false e true se a pagina chegou ao final
 */
async function aut_page() {
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

  scrollarParagrafo(tela[0] + scrollTop, false);
  console_log("the_end " + the_end);
  return the_end;
}

async function aut_line(lineScrollParams, line_size) {
  // return true;
}

async function play(
  line_heght,

  elementhtml,
  scroll_heigh,
  dow_line_func,
  lineScrollParams,
  page_func,
  loger,
  ndelay
) {
  // autura da rolagem do paragrafo?
  /**
   * quantidade de linhas visíveis na tela
   */
  
  console_log("line_size: " + parseInt(tela[0] / line_heght));

  async function runner() {
    let end = false;
    let marcador_top = lineScrollParams[0];
    while (!end) {
      await delay(2000);
      // Verifica se aut_line() retorna true
      let delay_al = $delayelement.value;
      let highlighttop = Number(highlight_estilo.top.replace("px", ""));
      console_log(parseInt((tela[0] - highlighttop) / line_heght));
      let line_size = parseInt(tela[0] / line_heght);
      if (highlighttop > Number(highlight_top_erd.replace("px", "")) + line) {
        line_size = parseInt((tela[0] - highlighttop) / line_heght) + 1;
      }
      for (let i = 0; i < line_size; i++) {
        if (window.pause) {
          break;
        }
        await delay(delay_al);
        await alterarTop_local(
          marcador_top,
          lineScrollParams[1],
          lineScrollParams[2],
          false
        );
        console_log("marcador_top: " + marcador_top, true);
        console_log(lineScrollParams[1]);
        console_log(lineScrollParams[2]);

        marcador_top += lineScrollParams[2];
      }

      if (window.pause) {
        // if responcavel por pausar o loop
        break;
      }
      // retorna true se for o fim da pagina

      end = await aut_page();
      // altera o valor inicial da variável para o valor da segunda linha  no caso
      marcador_top = Number(highlight_top_erd.replace("px", "")) + line;

      // Verifica se é hora de encerrar o loop
      if (end) {
        // retorna o botão ao estado original
        pausebt.click();
        break; // Interrompe o loop
      }
    }
  }
  await runner();
}
