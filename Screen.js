//ate  50% do height da tela move o marcador para cima
// de 50% ate 100 do height move o marcador para baixo
import { tela, data} from "./script.js";

let telaHeight = tela[0];
// tela / 2= result
// top  < result = para cima
// top > result = para baixo

document.addEventListener("mousemove", function (event) {
  // body...
  const y = event.clientY;
})
