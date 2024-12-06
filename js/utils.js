/**
 * obs: use somente querySelectorAll se for usado getElementsByClassName ocasionara um erro
 */
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

export function save_text_in_cache(data, name) {
     // Pega o texto da área de texto
     const text = data;
     // Salva no LocalStorage
     localStorage.setItem(name, text);
}

export function load_text_from_cache(name) {
     // Carrega o texto salvo do LocalStorage, se existir
     const savedText = localStorage.getItem(name);
     if (savedText) {
          return savedText;
     }
     return null
}

export function screen_size_height(
  {font_size,
  height,
  logs= true},
  ...args
  ){
    let tot = 0;
    for (let i = 0; i < args.length; i++){
      if (logs){
        console.log(`argumentos: ${i+1}:${args[i]}`);
      }
      
      tot + tot + args[i];
    }
    const screenHeight = height - parseInt(args);
    const fontSize = parseInt(font_size)
    const line_height = fontSize + (fontSize / 2)
    
    const screen_size = screenHeight / line_height;
    const screen = parseInt((screenHeight / line_height) * line_height)
   if (logs){
     console.log(`tela disponivel: ${["screen",screen, "line",line_height]}`)
   }
    return [screen, line_height, screen_size]
    
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