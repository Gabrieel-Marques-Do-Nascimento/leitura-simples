import {
     $SettingButton,
     $SettingsMenu,
     $CloseMenuSettings,
     $settingsFontSize,
     save_json_to_cache,
     Cache_json_name,
     loadText_Cache_json,
     $SettingText_type,
     $SettingBookMarkColor,
     $SettingDelay,
     $SettingAutoScroll,
     $settingTheme,
     inputClass,
     $screen_text,
     $SettingPageLang,
     $input,
     $inputMarkdow,
     $bookmark,
     $SettingText_marker_move,
} from "./script.js";
import { log_list } from "./testes.js";
import { recarregarPagina, theme_by_hour_or_auto } from "./utils.js";
// ------------------------------- Configuração Inicial e tipo de tela -------------------------------

let SettingData = loadText_Cache_json(Cache_json_name);

document.documentElement.lang = lang.value;
$bookmark.style.backgroundColor = SettingData["color"];

if (SettingData["screentype"] === "text") {
     $input.style.display = "block";
     $input.classList.add(inputClass);
     $inputMarkdow.classList.remove(inputClass);
     $inputMarkdow.style.display = "none";
}
if (SettingData["screentype"] === "markdow") {
     $input.style.display = "none";
     $input.classList.remove(inputClass);
     $inputMarkdow.style.display = "block";
     $inputMarkdow.classList.add(inputClass);
}

document.addEventListener("DOMContentLoaded", function () {
     // function onload
});

// ------------------------------- Variáveis de Controle e Estado -------------------------------
export const $inpuClear = document.getElementsByClassName(inputClass);
// ------------------------------- Configuração Inicial e Eventos de Interface -------------------------------

// abre o menu de configurações
$SettingButton.addEventListener("click", () => {
     $SettingButton.style.display = "none";
     $SettingsMenu.style.display = "block";
     // carrega os dados salvos nas configurações
     $settingsFontSize.value = SettingData["font-size"];
     $SettingPageLang.value = SettingData["lang"];
     $SettingBookMarkColor.value = SettingData["color"];
     $SettingDelay.value = SettingData["delay"];
     $SettingAutoScroll.checked = SettingData["$autoScroll"];
     $SettingText_type.value = SettingData["screentype"];
     $settingTheme.value = SettingData["theme"];
     $SettingText_marker_move.value = SettingData["markmove"];
});

// fecha o menu de configurações e atualiza as config
$CloseMenuSettings.addEventListener("click", () => {
     $SettingsMenu.style.display = "none";
     $SettingButton.style.display = "block";
     let font_size =
          Number($settingsFontSize.value) > 12 ? $settingsFontSize.value : 12;
     console.log("font_size", font_size);
     $screen_text.style.fontSize = font_size + "px";
     // salva os dados de configurações
     const confger = {
          lang: $SettingPageLang.value,
          delay: Number($SettingDelay.value),
          markmove: $SettingText_marker_move.value,
          "font-size":
               Number($settingsFontSize.value) > 12
                    ? $settingsFontSize.value
                    : "12",
          //background_type: backgroundType,
          theme: $settingTheme.value,
          $autoScroll: $SettingAutoScroll.checked,
          color: $SettingBookMarkColor.value,
          screentype: $SettingText_type.value,
     };
     save_json_to_cache(confger, Cache_json_name);
     recarregarPagina();
});

// ------------------------------------------------------------------                      temas ------------------------------------------------------------------
if (SettingData["theme"] == "black") {
     theme_by_hour_or_auto(0, true);
}
if (SettingData["theme"] == "white") {
     theme_by_hour_or_auto(12, true);
}
if (SettingData["theme"] == "auto") {
     theme_by_hour_or_auto();
}
// ------------------------------- area de testes -------------------------------
