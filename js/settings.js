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
     
} from "./script.js";
import {log_list} from "./testes.js";
import {recarregarPagina} from "./utils.js";
// ------------------------------- Configuração Inicial e tipo de tela -------------------------------
let SettingData = loadText_Cache_json(Cache_json_name)
if (SettingData["screentype"] === "text"){
   
   $input.style.display = "block";
   $input.classList.add(inputClass);
   $inputMarkdow.classList.remove(inputClass);
   $inputMarkdow.style.display = "none";
   
 }
if ( SettingData["screentype"] === "markdow"){
  
  $input.style.display = "none";
  $input.classList.remove(inputClass)
   $inputMarkdow.style.display = "block";
   $inputMarkdow.classList.add(inputClass)
}

document.addEventListener("DOMContentLoaded", function () {
  
// function onload
});

// ------------------------------- Variáveis de Controle e Estado -------------------------------
export const $inpuClear = document.getElementsByClassName(inputClass)
// ------------------------------- Configuração Inicial e Eventos de Interface -------------------------------

// abre o menu de configurações
$SettingButton.addEventListener("click", () => {
     $SettingButton.style.display = "none";
     $SettingsMenu.style.display = "block";
     // carrega os dados salvos nas configurações
     $settingsFontSize.value = SettingData["font-size"]
     $SettingPageLang.value = SettingData["lang"]
     $SettingBookMarkColor.value = SettingData["color"]
     $SettingDelay.value = SettingData["delay"]
     $SettingAutoScroll.checked = SettingData["$autoScroll"]
     $SettingText_type.value = SettingData["screentype"]
     $settingTheme.value = SettingData["theme"]

});

// fecha o menu de configurações e atualiza as config
$CloseMenuSettings.addEventListener("click", () => {
     $SettingsMenu.style.display = "none";
     $SettingButton.style.display = "block";
     let font_size =
          Number($settingsFontSize.value) > 12 ? $settingsFontSize.value : 12;
     console.log("font_size",font_size);
     $screen_text.style.fontSize = font_size + "px";
    // salva os dados de configurações
    const confger = {
        lang: $SettingPageLang.value,
        delay: Number($SettingDelay.value),
        marcador: $SettingBookMarkColor.value,
        "font-size": Number($settingsFontSize.value) > 12 ? $settingsFontSize.value : "12",
        //background_type: backgroundType,
        theme: $settingTheme.value,
        $autoScroll: $SettingAutoScroll.checked,
        color: $SettingBookMarkColor.value,
        "screentype": $SettingText_type.value
      };
      save_json_to_cache(confger, Cache_json_name)
      recarregarPagina()
});






// ------------------------------- area de testes -------------------------------