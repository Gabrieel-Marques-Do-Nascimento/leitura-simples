import {
     $SettingButton,
     $SettingsMenu,
     $CloseMenuSettings,
     $settingsFontSize,
     save_json_to_cache,
     loadText_Cache_json,
     Cache_json_name,
     $SettingText_type,
     SettingData,
     $SettingBookMarkColor,
     $SettingDelay,
     $SettingAutoScroll,
     $settingTheme,
    
     $screen_text,
     $SettingPageLang
} from "./script.js";

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
     console.log(font_size);
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
        "screentype": $settscree
      };
});
