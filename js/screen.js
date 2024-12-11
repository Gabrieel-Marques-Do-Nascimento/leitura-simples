import {
     $ButtonScrollPage,
     $startButton,
     $resetButtonn,
     Cache_screen_name,
     inputActived,
     $screen_text,
     $PauseButton,
     $PlayButton,
     winHeight,
     $pai_das_telas,
     pai_screen_style,
     $bookmark,
     $button_low,
     $button_up,
     loadText_Cache_json,
     Cache_json_name,
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
const SettingData = loadText_Cache_json(Cache_json_name);
export let v = screen_size_height(
     { font_size: SettingData["font-size"], height: winHeight, logs: true },
     70,
     margin
);
$screen_text.style.height = v[0] + "px";
$screen_text.style.fontSize = SettingData["font-size"] + "px";



inputActived[0].classList.add("disabled");

const save_text = load_text_from_cache(Cache_screen_name);

if (save_text) {
     buttonstatic(document.querySelectorAll(".disabled"), "none");
     buttonstatic(document.querySelectorAll(" .activated"), "block");
     inputActived[0].value = save_text;
     $PauseButton.style.display = "none";
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
let actionExecuted = false; // Variável de controle
document.addEventListener("keyup", (e) => {
     if (e.key === "w" || e.key === "s") {
          actionExecuted = false; // Libera a ação ao soltar a tecla
     }
});
document.addEventListener("keydown", (e) => {
     if (!actionExecuted) {
          // Executa apenas se a ação ainda não foi realizada
          actionExecuted = true; // Define como true para impedir execuções adicionais enquanto a tecla está pressionada
          if (e.key === "w") {
               $bookmark.style.top = change_top(
                    -(
                         parseInt(SettingData["font-size"]) / 2 +
                         parseInt(SettingData["font-size"])
                    ),
                    true,
                    $bookmark,
                    $screen_text
               );
          }
          if (e.key === "s") {
               $bookmark.style.top = change_top(
                    parseInt(SettingData["font-size"]) / 2 +
                         parseInt(SettingData["font-size"]),
                    true,
                    $bookmark,
                    $screen_text
               );
          }
     }
});
// --------------------------------------------- mark move ---------------------------------------------

// se o marcador for igual a mouse
if (SettingData['markmove'] === "mouse") {
     // Usa requestAnimationFrame para atualizações de tela mais suaves
     let rafId = null;
  
     document.addEventListener("mousemove", function (event) {
       // Cancela a animação anterior se existir
       if (rafId) {
         cancelAnimationFrame(rafId);
       }
  
       // Agenda uma nova atualização no próximo quadro de renderização
       rafId = requestAnimationFrame(() => {
         const mouseY = event.clientY;
         $bookmark.style.top = `${mouseY}px`;
       });
     });
  }


// se o marcador for igual a button
if (SettingData["markmove"] == "button") {
}

if (SettingData["markmove"] == "screen") {
     let telaHeight = v[0];
     // tela / 2= result
     // top  < result = para cima
     // top > result = para baixo

     document.addEventListener("mousemove", function (event) {
          // body...
          const y = event.clientY;
          if (y < telaHeight / 2) {
               $bookmark.style.top = change_top(
                    -(
                         parseInt(SettingData["font-size"]) / 2 +
                         parseInt(SettingData["font-size"])
                    ),
                    true,
                    $bookmark,
                    $screen_text
               );
          }
          if (y > telaHeight / 2) {
               $bookmark.style.top = change_top(
                    (
                         parseInt(SettingData["font-size"]) / 2 +
                         parseInt(SettingData["font-size"])
                    ),
                    true,
                    $bookmark,
                    $screen_text
               );
          }
     });
}

//------------------------------------- pular de pagina do book ---------------------------------
// ---------------------------------scroll da tela ---------------------------------
$ButtonScrollPage.addEventListener("click", () => {
     let inic = false;
     let fim = false;
     let scrolltop = $screen_text.scrollTop;
     console.log(scrolltop);
     const scrollHeight = $screen_text.scrollHeight;
     const clientHeight = $screen_text.clientHeight;
     let scrollbotton = scrolltop + clientHeight;
     let heightp = parseInt($screen_text.style.height.replace("px", ""));
     if (scrollbotton + 1 >= scrollHeight) {
          console.log("Chegou ao final da página!");
          fim = true;
          inic = false;
     }
     if (scrolltop <= 0) {
          console.log("Chegou ao topo da página!");
          inic = true;
          fim = false;
     }
     let pixels = 0 // heightp + scrolltop;
     if (inic) {
          pixels = heightp + scrolltop;
     }
     if (fim) {
          if (scrolltop < heightp){
               console.log("maior");
               let maior = heightp - scrolltop;
               pixels = heightp -  maior;

          }
          else{
               pixels = scrolltop - heightp;
          }
     }
     
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



