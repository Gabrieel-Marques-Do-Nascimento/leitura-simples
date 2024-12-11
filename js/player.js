import {
     $screen_text,
     $PlayButton,
     $screen_text_style,
     $PauseButton,
     pai_screen_style,
     $bookmark,
     marker_style,
     SettingData,
     $button_low,
     $button_up,
     $ButtonScrollPage,
     $SettingDelay,
     bookmark_style,
} from "./script.js";
import { console_log, delay } from "./utils.js";
import {} from "./module.js";
import { v } from "./screen.js";
export let highlight_top = Number(marker_style.top.replace("px", ""));
const _scroll_height = $screen_text.scrollHeight;

const bookmark_rect = $bookmark.getBoundingClientRect(); // Posição e tamanho do elemento a ser movido

export let highlight_top_erd = pai_screen_style.marginTop; //highlight_estilo.top;
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
     let styleheight = Number($screen_text_style.height.replace("px", ""));
     console_log("-------------------------------------------------");
     console_log("alterarTop function: " + novoTop + "" + styleheight);
     console_log("erro:" + error);
     console_log("line:" + line);
     console_log("-------------------------------------------------");
     let end_line = v[1];
     if (on) {
          // define a transição da altura do elementos caso seja add um algum valor muito alto
          $bookmark.style.transition = "top 0.1s ease";
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

     $bookmark.style.top = novoTop + "px";
}

/**
 * atura da linha da pagina
 */
let line = _lineheight_(SettingData["font-size"]);

window.pause = false;
$PlayButton.addEventListener("click", function () {
     buttons_state(
          [$button_low, $button_up, $ButtonScrollPage],
          [true, true, true]
     );

     $PauseButton.style.animation = "girar 2s linear infinite";
     window.pause = false;
     $PlayButton.style.display = "none";
     $PauseButton.style.display = "block";
     play(
          line,

          $screen_text,
          Number(_scroll_height),
          alterarTop,
          [Number(bookmark_style.top.replace("px", "")) + line, 8, line],
          scrollarParagrafo,

          2000
     );
});

$PauseButton.addEventListener("click", function () {
     buttons_state(
          [$button_low, $button_up, $ButtonScrollPage, $PlayButton],
          [false, false, false, true]
     );
     window.pause = true;
     $PlayButton.style.display = "block";
     $PauseButton.style.display = "none";

     setTimeout(function () {
          $PlayButton.disabled = false;
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
     const scrollHeight = $screen_text.scrollHeight;
     console_log("scrollHeight " + scrollHeight,true);
     // Altura da janela visível
     const clientHeight = $screen_text.clientHeight;
     console_log("clientHeight " + clientHeight);
     // Distância rolada pelo usuário
     let scrollTop = $screen_text.scrollTop;
     let scrollbotton = scrollTop + clientHeight;
     console_log("scrollbotton " + scrollbotton);
     console_log("scrollTop " + scrollTop);
     // Verifica se a rolagem chegou ao final
     if (scrollbotton + 1 >= scrollHeight) {
          console_log("Chegou ao final da página!");

          the_end = true;
     }

     scrollarParagrafo(v[0] + scrollTop, false);
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

     ndelay
) {
     // autura da rolagem do paragrafo?
     /**
      * quantidade de linhas visíveis na tela
      */

     console_log("line_size: " + parseInt(v[0] / line_heght));

     async function runner() {
          let end = false;
          let marcador_top = lineScrollParams[0];
          while (!end) {
               await delay(2000);
               // Verifica se aut_line() retorna true
               let delay_al = SettingData["delay"];
               let highlighttop = parseInt(bookmark_style.top.replace("px", ""));
               console.log(parseInt((v[0] - highlighttop) / line_heght));
               let line_size = parseInt(v[0] / line_heght);
               if (
                    highlighttop >
                    Number(highlight_top_erd.replace("px", "")) + line
               ) {
                    line_size =
                         parseInt((v[0] - highlighttop) / line_heght) + 1;
               }
               console.log("line_size: " + line_size);
               console.log("highlighttop: " + highlighttop);
               console.log("highlight_top_erd: " + highlight_top_erd);
               for (let i = 0; i < line_size; i++) {
                    // Verifica o estado de pausa antes de cada iteração
                    if (window.pause) {
                        break;
                    }
                    
                    // Aguarda o atraso, mas permite interrupção durante a espera
                    await Promise.race([
                        delay(delay_al),
                        new Promise((_, reject) => {
                            const checkPause = setInterval(() => {
                                if (window.pause) {
                                    clearInterval(checkPause);
                                    reject(new Error("Pausado"));
                                }
                            }, 10); // Verifica a pausa a cada 10ms
                        })
                    ]).catch((err) => {
                        console_log(err.message); // Opcional: log de depuração
                    //     break;
                    });
                    
                    // Verifica novamente após o atraso
                    if (window.pause) {
                        break;
                    }
                
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
               marcador_top =
                    Number(highlight_top_erd.replace("px", "")) + line;

               // Verifica se é hora de encerrar o loop
               if (end) {
                    // retorna o botão ao estado original
                    $PauseButton.click();
                    break; // Interrompe o loop
               }
          }
     }
     await runner();
}
export function _lineheight_(font_size) {
     return Number(font_size) + Number(font_size) / 2;
}

export function alterarTop(novoTop, error = 0, line = 0, on = true) {
     let styleheight = Number($screen_text_style.height.replace("px", ""));
     console_log("-------------------------------------------------");
     console_log("alterarTop function: " + novoTop + "" + styleheight, true);
     console_log("erro:" + error, true);
     console_log("line:" + line, true);
     console_log("-------------------------------------------------", true);
     console_log("    ", true);
     let end_line = v[1];
     if (on) {
          $bookmark.style.transition = "top 0.1s ease";
     }
     let largura = window.innerWidth;

     if (largura <= 750) {
          if (novoTop < highlight_top) {
               novoTop = highlight_top;
          }
          if (novoTop > styleheight) {
               novoTop = styleheight - 10;
          }
     }
     if (largura > 750) {
          if (novoTop < highlight_top) {
               novoTop = highlight_top;
          }
          if (novoTop > styleheight) {
               novoTop = styleheight - (line - error);
          }
     }
     // if (novoTop < highlight_top) {
     //   novoTop = highlight_top;
     // }
     // if (novoTop > styleheight) {
     //   novoTop = styleheight - (line - error);
     // }
     $bookmark.style.top = novoTop + "px";
}

/**
 * funcao responcavel por scrollar ate a distancia em pixels especificada
 * @param {*} pixels os s que elemento deve mover em relação ao scroll
 * @param {*} so se deve ser aplicado os efeitos
 */
export function scrollarParagrafo(pixels, so = true) {
     if (so) {
          // com uma animação de 2 segundos
          $bookmark.style.transition = "top 2s ease";
          setTimeout(() => {
               $bookmark.style.transition = "top 0.2s ease";
          }, 1000);
     }
     $bookmark.style.top = highlight_top_erd;
     $screen_text.scrollTo({
          top: pixels,
          behavior: "smooth",
     });
}
