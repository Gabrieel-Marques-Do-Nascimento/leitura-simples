import {
     loadText_Cache_json,
     $screen_text,
     $button_low,
     $button_up,
     $PlayButton,
     $PauseButton,
} from "./script.js";

const winHeight = window.innerHeight;

/**
 * Exemplo para ocultar botões
*  ScreenButtons('none', 'none', 'block', 'none', 'display');

*  Exemplo para desabilitar botões
*  ScreenButtons(true, false, true, false, 'disabled');

 * @param {*} ButtonLow 
 * @param {*} ButtonUp 
 * @param {*} PlayButton 
 * @param {*} PauseButton 
 * @param {*} type 
 */
export function ScreenButtons(
     ButtonLow,
     ButtonUp,
     PlayButton,
     PauseButton,
     type
) {
     if (type === "display") {
          $button_low.style.display = ButtonLow;
          $button_up.style.display = ButtonUp;
          $PlayButton.style.display = PlayButton;
          $PauseButton.style.display = PauseButton;
     } else if (type === "disabled") {
          $button_low.disabled = ButtonLow;
          $button_up.disabled = ButtonUp;
          $PlayButton.disabled = PlayButton;
          $PauseButton.disabled = PauseButton;
     } else {
          console.error("Invalid type passed to ScreenButtons: " + type);
     }
}

/**
 * obs: use somente querySelectorAll se for usado getElementsByClassName ocasionara um erro
 */
export function buttonstatic(buttons, estado) {
     // loop
     buttons.forEach((button) => {
          button.style.display = estado;
     });
}

export function scrollarline(pixel) {
     highlight.scrollTo({
          top: pixel,
          behavior: "smooth",
     });
}

/**
 * recarregar a pagina
 */
export function recarregarPagina() {
     location.reload();
}

export function change_top(
     lineheight = 0,
     Transition = true,
     element_move,
     father,
     addtop = false
) {
     const father_style = window.getComputedStyle(father);
     const father_rect = father.getBoundingClientRect(); // Posição e tamanho do pai
     const element_rect = element_move.getBoundingClientRect(); // Posição e tamanho do elemento a ser movido

     // Altura total do pai
     let father_height = parseInt(father_style.height.replace("px", ""), 10);

     if (Transition) {
          element_move.style.transition = "top 0.1s ease";
     }

     // Calcula o novo top relativo ao pai
     let novoTop = element_rect.top + lineheight;

     // Limita o `novoTop` aos limites do pai
     if (novoTop < parseInt(father_rect.top)) {
          novoTop = parseInt(father_rect.top); // Não ultrapassa o topo
     }
     if (novoTop > father_height) {
          novoTop = father_height + father_rect.top - lineheight; // Não ultrapassa o limite inferior
     }
     if (addtop) {
          element_move.style.top = `${novoTop}px`;
     }

     return `${novoTop}px`;
}

export function skip_line(line, element_move) {
     // Pegue o valor do line-height
     var linha = line
          ? Number(paragrafo_style.lineHeight.replace("px", ""))
          : -Number(paragrafo_style.lineHeight.replace("px", ""));

     change_top(
          Number(highlight_estilo.top.replace("px", "")) + linha,
          8,
          linha
     );
     element_move.style.transition = "top 0.1s ease";
}

export function save_text_in_cache(data, name) {
     try {
          // Pega o texto da área de texto
          const text = data;
          // Salva no LocalStorage
          localStorage.setItem(name, text);
     } catch (error) {
          return false;
     }
     return true;
}

export function load_text_from_cache(name) {
     // Carrega o texto salvo do LocalStorage, se existir
     const savedText = localStorage.getItem(name);
     if (savedText) {
          return savedText;
     }
     return null;
}

// function style_temp(timeout,classCss,element)
// {
//   element.classList.add(classCss)
//   setTimeout(function (){
//     element.classList.remove(class)
//     }, 1500)
//   }

/*
 * define obtamanho de um elemento com base no tamanho davtela do dispositivo
 */
export function screen_size_height(
     { font_size, height, logs = true },
     ...args
) {
     let tot = 0;
     for (let i = 0; i < args.length; i++) {
          if (logs) {
               console.log(`argumentos: ${i + 1}:${args[i]}`);
          }

          tot + tot + args[i];
     }
     const screenHeight = height - parseInt(args);
     const fontSize = parseInt(font_size);
     const line_height = fontSize + fontSize / 2;

     const screen_size = parseInt(screenHeight / line_height);
     const screen = parseInt(screen_size * line_height);
     if (logs) {
          console.log(
               `tela disponivel: ${["screen", screen, "line", line_height]}`
          );
     }
     return [screen, line_height, screen_size];
}

export function console_log(text, view = false) {
     if (view) {
          console.log(text);
     }
}

/**
 * funcao que define o tema do site
 * @param {*} hora tema automático ou tema escolhido manualmente ex: 12: dia, 0: noite
 * @param {*} fixed false se for tema automático ou true se o tema for manual
 */
export function theme_by_hour_or_auto(hora = 0, fixed = false) {
     let style = document.createElement("style");
     style.type = "text/css";
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

        background-color: rgba(255,255,255,.80);}
`;
     }
     if (hora < 6 || hora > 18) {
          // tema noite
          style.innerText = `
 body {
       background-color:  #000;
   cursor: url('./img/cursor-black.svg'), auto; /* Substitua 'seu-cursor.png' pelo caminho da sua imagem */ 
 }
#pai {
        background-color: rgba(255, 255, 255, 0.71);}    
        #paragraph { border: 1px solid #ccc;
        border: 1px solid #000;}

  
`;
     }
     document.body.appendChild(style);
}

export function ReadScreen(texto) {
     if (SettingData["screentype"] == "text") {
          $screen_text.innerText = texto;
     }
     if (SettingData["screentype"] == "markdow") {
          $screen_text.style.margin = "0 10px";
          $screen_text.innerHTML = marked.parse(texto);
     }
}

export async function delay(ms) {
     return new Promise((resolve) => setTimeout(resolve, ms));
}

// --------------------------------------------------------  auto scroll -------------------------------------------------------
let SettingData = loadText_Cache_json("settings_data");

export function loadScroll(element = null) {
     // Restaurar posição do scroll
     const scrollPosition = localStorage.getItem("$autoScroll");
     console_log("scrollPosition: " + scrollPosition, true);
     if (scrollPosition && element) {
          element.scrollTo({
               top: scrollPosition,
               behavior: "smooth",
          });
     }
     return scrollPosition ? scrollPosition : 0;
}
window.addEventListener("beforeunload", function () {
     // Você pode salvar outras informações, como posição do scroll
     localStorage.setItem("$autoScroll", $screen_text.scrollTop);
});
window.onload = function () {
     if (SettingData["$autoScroll"]) {
          let l = loadScroll($screen_text);
     }
};
