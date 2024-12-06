import {
 $startButton,
 $resetButtonn,
 Cache_screen_name,
 inputActived,
 $screen_text,
 winHeight,
 $pai_das_telas,
 pai_screen_style,
 
} from "./script.js";
import {
 save_text_in_cache,
 load_text_from_cache,
 
} from "./utils.js";
import { buttonstatic,
screen_size_height} from "./utils.js";

// ---------------------------------- definicoes globais da tela----------------------------------
inputActived[0].classList.add(
 "disabled"
);

const save_text =
 load_text_from_cache(
  Cache_screen_name
 );

if (save_text) {
 buttonstatic(
  document.querySelectorAll(
   ".disabled"
  ),
  "none"
 );
 buttonstatic(
  document.querySelectorAll(
   " .activated"
  ),
  "block"
 );
 inputActived[0].value =
  save_text;
 $screen_text.innerHTML =
  save_text;
} else {
 buttonstatic(
  document.querySelectorAll(
   ".disabled"
  ),
  "block"
 );
 buttonstatic(
  document.querySelectorAll(
   " .activated"
  ),
  "none"
 );
}

// ---------------------------------- eventos relacionados a tela -----------------------------------
console.log(
 document.querySelectorAll(
  ".disabled"
 )
);
$startButton.addEventListener(
 "click",
 () => {
  buttonstatic(
   document.querySelectorAll(
    ".disabled"
   ),
   "none"
  );
  buttonstatic(
   document.querySelectorAll(
    " .activated"
   ),
   "block"
  );
  let value =
   inputActived[0]
    .value;
  if (!value) {
   value =
    load_text_from_cache(
     Cache_screen_name
    );
  }

  // salva o texto e inicia a tela
  console.log(
   "click startbutton"
  );
  // console.log(
  //    "value: ",
  //    [value]
  //   );
  if (value) {
   console.log(
    "started"
   );

   save_text_in_cache(
    value,
    Cache_screen_name
   );
   let texto =
    value;
   $screen_text.innerHTML =
    texto;
  }
 }
);

$resetButtonn.addEventListener(
 "click",
 () => {
  buttonstatic(
   document.querySelectorAll(
    ".disabled"
   ),
   "block"
  );
  buttonstatic(
   document.querySelectorAll(
    " .activated"
   ),
   "none"
  );
 }
);




//----------------------------------           area de testes ----------------------------------
console.log("winHeight", winHeight);
  let margin = parseInt( pai_screen_style.marginBottom.substring(0, pai_screen_style.marginBottom.indexOf("px"))) +
    parseInt( pai_screen_style.marginTop.substring(0, pai_screen_style.marginTop.indexOf("px")))
   ;
//    let border = Number(
//      paragrafo_style.border.substring(0, paragrafo_style.border.indexOf("px"))
//    );
//    let padding = Number(
//      paragrafo_style.padding.substring(0, paragrafo_style.padding.indexOf("px"))
//    );


let v = screen_size_height(  {font_size:18,
  height:winHeight,
  logs: true},100,margin )

console.log('margin',margin)
console.log(pai_screen_style)
$screen_text.style.height = v[0] + "px"; 
$screen_text.style.fontSize = v[2] + "px";
$pai_das_telas.style.height = v[0] + "px";
$pai_das_telas.style.lineHeight = v[1] + "px";
$pai_das_telas.style.fontSize = v[2] + "px";
console.log(v)