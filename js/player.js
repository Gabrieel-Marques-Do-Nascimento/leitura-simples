import {$PlayButton, $screen_text, SettingData, $bookmark} from "./script.js";
import {change_top} from "./utils.js";


$PlayButton.addEventListener("click", function (){
  let lineheight = parseInt(SettingData["font-size"]) / 2 +
               parseInt(SettingData["font-size"]);
    let cont = 20;
    for (let i = 1; i < 10; i++){
      setTimeout(function (){
        cont = cont + lineheight
        $bookmark.style.top = cont + "px";
      
    }, i *1000)
    }
})


