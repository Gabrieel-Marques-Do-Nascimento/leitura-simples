import {
     $ButtonScrollPage,
     $startButton,
     $resetButtonn,
     Cache_screen_name,
     inputActived,
     $screen_text,
     winHeight,
     $pai_das_telas,
     pai_screen_style,
     $bookmark,
     $button_low,
     $button_up,
     loadText_Cache_json,
     Cache_json_name
} from "./script.js";
import {
     save_text_in_cache,
     load_text_from_cache,
     loadScroll,
} from "./utils.js";
import {
     buttonstatic,
     screen_size_height,
     skip_line,
     change_top,
     ReadScreen,
} from "./utils.js";

// ---------------------------------- definições globais da tela----------------------------------
const SettingData = loadText_Cache_json(Cache_json_name);   
inputActived[0].classList.add("disabled");

const save_text = load_text_from_cache(Cache_screen_name);

if (save_text) {
     buttonstatic(document.querySelectorAll(".disabled"), "none");
     buttonstatic(document.querySelectorAll(" .activated"), "block");
     inputActived[0].value = save_text;
     ReadScreen(save_text);
} else {
     buttonstatic(document.querySelectorAll(".disabled"), "block");
     buttonstatic(document.querySelectorAll(" .activated"), "none");
}

// ---------------------------------- eventos relacionados a tela -----------------------------------
console.log(document.querySelectorAll(".disabled"));

// apos add o texto ao $input penas com um enter ele mostra o texto
inputActived[0].addEventListener("keydown", function (event) {
     if (event.key === "Enter") {
          // Aqui você pode colocar a ação que deseja realizar ao pressionar Enter
          buttonstatic(document.querySelectorAll(".disabled"), "none");
          buttonstatic(document.querySelectorAll(" .activated"), "block");
          let value = inputActived[0].value;
          if (value) {
               save_text_in_cache(value, Cache_screen_name);
               let texto = value;
               $screen_text.innerHTML = texto;
          }
          if (!value) {
               value = load_text_from_cache(Cache_screen_name);
          }
     }
});

$startButton.addEventListener("click", () => {
     buttonstatic(document.querySelectorAll(".disabled"), "none");
     buttonstatic(document.querySelectorAll(" .activated"), "block");

     let value = inputActived[0].value;
     if (value) {
          save_text_in_cache(value, Cache_screen_name);
          let texto = value;
          $screen_text.innerHTML = texto;
     }
     if (!value) {
          value = load_text_from_cache(Cache_screen_name);
     }
     // salva o texto e inicia a tela
});

$resetButtonn.addEventListener("click", () => {
     buttonstatic(document.querySelectorAll(".disabled"), "block");
     buttonstatic(document.querySelectorAll(" .activated"), "none");
});

$button_low.addEventListener("click", () => {
     $bookmark.style.top = change_top(
          parseInt(SettingData["font-size"]) / 2 +
               parseInt(SettingData["font-size"]),
          true,
          $bookmark,
          $screen_text
     );
});
$button_up.addEventListener("click", () => {
     $bookmark.style.top = change_top(
          -(
               parseInt(SettingData["font-size"]) / 2 +
               parseInt(SettingData["font-size"])
          ),
          true,
          $bookmark,
          $screen_text
     );
});

// --------------------------------------------- mark move ---------------------------------------------





export function alterarTop(novoTop, error = 0, line = 0, on = true) {
     let styleheight = Number(paragrafo_style.height.replace("px", ""));
     console_log("-------------------------------------------------");
     console_log("alterarTop function: " + novoTop + "" + styleheight, true);
     console_log("erro:" + error, true);
     console_log("line:" + line, true);
     console_log("-------------------------------------------------", true);
     console_log("    ", true);
     let end_line = tela[1];
     if (on) {
       highlight.style.transition = "top 0.1s ease";
     }
     let largura = window_width;
   
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
     highlight.style.top = novoTop + "px";
   }







  // se o marcador for igual a mouse
  if (SettingData['markmove'] == "mouse") {
     console.log("mouse");
     let cont = 0;
     // desativa os botoes

     // add um evento para posicionar o marcador onde estiver o mouse
     document.addEventListener("mousemove", function (event) {
       // obtem a posicao atual do mouse
       const y = event.clientY;
       // altera  a position_top do marcador para onde estiver o mouse
       // dentro limites do elemento paragraph
       console.log(y);
       setInterval(() => {
          // $bookmark.style.top  = 
          change_top(y, true, $bookmark, $screen_text, true);   
       }, 500);
       
     });
 
   }
   // se o marcador for igual a button
   if ($bookmark.value == "button") {
   
     // contador menor que 1
     if (cont < 1) {
       // cont = 1
       cont++;
       // recarrega a page
       recarregarPagina();
     }
   }
 
   if (SettingData["screen"]) {

     let telaHeight = tela[0];
     // tela / 2= result
     // top  < result = para cima
     // top > result = para baixo
 
     document.addEventListener("mousemove", function (event) {
       // body...
       const y = event.clientY;
       if (y < telaHeight / 2) {
         scrollNumberline(true, false, data["font-size"]);
       }
       if (y > telaHeight / 2) {
         scrollNumberline(true, true, data["font-size"]);
       }
     });
   }
 
//------------------------------------- pular de pagina do book ---------------------------------
// ---------------------------------scroll da tela ---------------------------------
$ButtonScrollPage.addEventListener("click", () => {
     let scrolltop = $screen_text.scrollTop;
     let heightp = parseInt($screen_text.style.height.replace("px", ""));
     let pixels = heightp + scrolltop;
     $screen_text.scrollTop = pixels;
     $ButtonScrollPage.disabled = true;
     setTimeout(function () {
          $ButtonScrollPage.disabled = false;
     }, 1500);
});
document.addEventListener("keydown", function (e) {
     if (e.key === "q") {
          let scrolltop = $screen_text.scrollTop;
          let heightp = parseInt($screen_text.style.height.replace("px", ""));
          let pixels = heightp + scrolltop;
          $screen_text.scrollTop = pixels;
          $ButtonScrollPage.disabled = true;
          setTimeout(function () {
               $ButtonScrollPage.disabled = false;
          }, 1500);
     }
});
// ---------------------------------marcador de texto configurações ---------------------------------
$bookmark.classList.add("highlight");
$bookmark.style.height =
     parseInt(SettingData["font-size"]) / 2 +
     parseInt(SettingData["font-size"]) +
     "px";

document.body.appendChild($bookmark);
console.log(
     "height",
     parseInt(SettingData["font-size"]) / 2 +
          parseInt(SettingData["font-size"]) +
          "px"
);
//----------------------------------           area de testes ----------------------------------
console.log("winHeight", winHeight);
let margin =
     parseInt(
          pai_screen_style.marginBottom.substring(
               0,
               pai_screen_style.marginBottom.indexOf("px")
          )
     ) +
     parseInt(
          pai_screen_style.marginTop.substring(
               0,
               pai_screen_style.marginTop.indexOf("px")
          )
     );
//    let border = Number(
//      paragrafo_style.border.substring(0, paragrafo_style.border.indexOf("px"))
//    );
//    let padding = Number(
//      paragrafo_style.padding.substring(0, paragrafo_style.padding.indexOf("px"))
//    );

let v = screen_size_height(
     { font_size: SettingData["font-size"], height: winHeight, logs: true },
     70,
     margin
);
$screen_text.style.height = v[0] + "px";
$screen_text.style.fontSize = SettingData["font-size"] + "px";
