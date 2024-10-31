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
  $delayelement,
  highlight_top_erd,
} from "./script.js";
import { loger, console_log } from "./utils.js";
import { delay } from "./module.js";
import { _lineheight_ } from "./module.js";

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
  console_log("alterarTop function: " + novoTop + "" + styleheight, true);
  console_log("erro:" + error, true);
  console_log("line:" + line, true);
  console_log("-------------------------------------------------", true);
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
  }, 500); //, ((tela[0] / tela[1]) * data["delay"]) + 500);
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

async function aut_line(line_func_paramt, line_size) {

  // return true;
}

async function play(
  line_heght,

  elementhtml,
  scroll_heigh,
  dow_line_func,
  line_func_paramt,
  page_func,
  loger,
  ndelay
) {
  // autura da rolagem do paragrafo?
  /**
   * quantidade de linhas visíveis na tela
   */
  let line_size = parseInt(tela[0] / line_heght);

  console_log("line_size: " + line_size, true);

  async function runner() {
    let end = false;

    while (true) {
      await delay(2000);
      // Verifica se aut_line() retorna true
      let delay_al = $delayelement.value;
      let marcador_top = line_func_paramt[0];
     
      console_log(parseInt((  tela[0] - Number(highlight_estilo.top.replace('px','') ) )/ line_heght), true)
      for (let i = 0; i < line_size; i++) {
        if ( window.pause) {
          break
        }
        await delay(delay_al);
        await alterarTop_local(
          marcador_top,
          line_func_paramt[1],
          line_func_paramt[2],
          false
        );
        console_log("marcador_top: "+ marcador_top, true);
        console.log(line_func_paramt[1]);
        console.log(line_func_paramt[2]);
        
        marcador_top += line_func_paramt[2];
      }

      if (window.pause) {
        // if responcavel por pausar o loop
        //highlight.style.top = highlight_top_erd;
        break;
      }
      // retorna true se for o fim da pagina
      marcador_top = 10;
      end = await aut_page();
      //pausebt.click();
      //await delay(500);
      //playbt.click();
      
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
