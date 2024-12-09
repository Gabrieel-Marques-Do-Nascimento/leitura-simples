import {
     $startButton,
     $resetButtonn,
     Cache_screen_name,
     inputActived,
     $screen_text,
     winHeight,
     $pai_das_telas,
     pai_screen_style,
     SettingData,
     $bookmark,
     $button_low,
     $button_up,
} from "./script.js";
import { save_text_in_cache, load_text_from_cache } from "./utils.js";
import {
     buttonstatic,
     screen_size_height,
     skip_line,
     change_top,
     ReadScreen
} from "./utils.js";

// ---------------------------------- definicoes globais da tela----------------------------------
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
$startButton.addEventListener("click", () => {
     buttonstatic(document.querySelectorAll(".disabled"), "none");
     buttonstatic(document.querySelectorAll(" .activated"), "block");
     
     let value = inputActived[0].value;
     if (value) {
          console.log("started");

          save_text_in_cache(value, Cache_screen_name);
          let texto = value;
          $screen_text.innerHTML = texto;
     }
     
     if (!value) {
          value = load_text_from_cache(Cache_screen_name);
     }

     // salva o texto e inicia a tela
     console.log("click startbutton");
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
// ---------------------------------marcador devtexto configuracoes ---------------------------------
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
