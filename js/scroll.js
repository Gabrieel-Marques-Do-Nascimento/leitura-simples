import { $screen_text, winHeight } from "./script.js";
// import { console_log } from "./utils.js";

export let $scroll_top = document.createElement("div");

// Selecionar o elemento (por exemplo, pela classe)

// Obter o tamanho da janela (viewport)
var larguraJanela = window.innerWidth;
var alturaJanela = winHeight;

let style = document.createElement("style");
style.type = "text/css";
style.innerText = `
        .scroll_top {
            background-color: green;
            position: fixed;
            width: 0%;
            height: 10px;
            bottom: 0px;
            left: 0;
            z-index: 2;
        }
    @media (max-width: 768px) {
        .scroll_top {
            top: 0px;
            left: 0;
        }
        }
`;
document.body.appendChild(style);

$scroll_top.classList.add("scroll_top");

$screen_text.addEventListener("scroll", () => {
     let vertical =
          ($screen_text.scrollTop /
               ($screen_text.scrollHeight - $screen_text.clientHeight)) *
          100;
     let horizontal = (vertical / 100) * window.innerWidth;
     $scroll_top.style.width = horizontal + 2 + "px";
});

document.body.appendChild($scroll_top);
