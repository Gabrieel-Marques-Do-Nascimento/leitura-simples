export function buttonstatic(buttons, estado) {
  // loop
  buttons.forEach((button) => {
    button.style.display = estado;
  });
}

export function scrollarline(pixel) {
  highlight.scrollTo({
    top: pixel,
    behavior: "smooth",
  });
}

/**
 * recarregar a pagina
 */
export function recarregarPagina() {
  location.reload();
}

export function move_marcador(line) {
  // Pegue o valor do line-height
  var linha = line
    ? Number(paragrafo_style.lineHeight.replace("px", ""))
    : -Number(paragrafo_style.lineHeight.replace("px", ""));

  alterarTop(Number(highlight_estilo.top.replace("px", "")) + linha, 8, linha);
  highlight.style.transition = "top 0.1s ease";
}

// pequena pagina que mostra alguns logs
const $console_user = document.getElementById("console");
const $console_text = document.getElementById("console-text");
$console_user.addEventListener("click", function () {
  $console_text.style.display = "block";
  $console_user.style = `top: 100px;
                        left: 10%;
                        height:50%;
                        width: 80%;`;
});
$console_user.addEventListener("dblclick", function () {
  $console_user.style = `        top: 0px;           
                                height: 18px;
                                width: 40px;`;
  $console_text.style.display = "none";
});

export function loger(text) {
  $console_text.innerHTML += text + "</br>";
}

export function console_log(text, view = false) {
  if (view) {
    console.log(text);
  }
}


export async function traduzirTexto(texto, idiomaAlvo) {
    const url = "https://libretranslate.com/translate";

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            q: texto,
            source: "auto", // Detecta automaticamente o idioma de entrada
            target: idiomaAlvo
        }),
    });

    const data = await response.json();
    if (data.error) {
        console.error("Erro na tradução:", data.error);
        return null;
    }
    
    return data.translatedText;
}

// Exemplo de uso
// traduzirTexto("Olá, como vai?", "en")
//    .then(traducao => console.log(traducao))
//    .catch(error => console.error("Erro:", error));