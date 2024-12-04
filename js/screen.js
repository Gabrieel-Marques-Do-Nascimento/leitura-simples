import {
     $startButton,
     save_text_in_cache,
     load_text_from_cache,
     Cache_screen_name,
     inputActived,
     $screen_text,
} from "./script.js";

const value = inputActived[0].value ? inputActived[0].value : ""; // valor do arquivo select
// salva o texto e inicia a tela
$startButton.addEventListener("click", () => {
     if (value) {
          save_text_in_cache(value, Cache_screen_name);
          let texto = load_text_from_cache(Cache_screen_name);
          $screen_text.innerHTML = texto;
     }
});
