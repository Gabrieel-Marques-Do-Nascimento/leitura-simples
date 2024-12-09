const winHeight = window.innerHeight;

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

export function change_top(
     lineheight = 0,
     Transition = true,
     element_move,
     father
) {
     const father_style = window.getComputedStyle(father);
     const father_rect = father.getBoundingClientRect(); // Posição e tamanho do pai
     const element_rect = element_move.getBoundingClientRect(); // Posição e tamanho do elemento a ser movido

     // Altura total do pai
     let father_height = parseInt(father_style.height.replace("px", ""), 10);

     if (Transition) {
          element_move.style.transition = "top 0.1s ease";
     }

     // Calcula o novo top relativo ao pai
     let novoTop = element_rect.top + lineheight;

     // Limita o `novoTop` aos limites do pai
     if (novoTop < parseInt(father_rect.top)) {
          novoTop = parseInt(father_rect.top); // Não ultrapassa o topo
     }
     if (novoTop > father_height) {
          novoTop = father_height  + father_rect.top - lineheight; // Não ultrapassa o limite inferior
     }
     return `${novoTop}px`;
}

export function skip_line(line, element_move) {
     // Pegue o valor do line-height
     var linha = line
          ? Number(paragrafo_style.lineHeight.replace("px", ""))
          : -Number(paragrafo_style.lineHeight.replace("px", ""));

     alterarTop(
          Number(highlight_estilo.top.replace("px", "")) + linha,
          8,
          linha
     );
     element_move.style.transition = "top 0.1s ease";
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
     return null;
}

// function style_temp(timeout,classCss,element)
// {
//   element.classList.add(classCss)
//   setTimeout(function (){
//     element.classList.remove(class)
//     }, 1500)
//   }

/*
 * define obtamanho de um elemento com base no tamanho davtela do dispositivo
 */
export function screen_size_height(
     { font_size, height, logs = true },
     ...args
) {
     let tot = 0;
     for (let i = 0; i < args.length; i++) {
          if (logs) {
               console.log(`argumentos: ${i + 1}:${args[i]}`);
          }

          tot + tot + args[i];
     }
     const screenHeight = height - parseInt(args);
     const fontSize = parseInt(font_size);
     const line_height = fontSize + fontSize / 2;

     const screen_size = parseInt(screenHeight / line_height);
     const screen = parseInt(screen_size * line_height);
     if (logs) {
          console.log(
               `tela disponivel: ${["screen", screen, "line", line_height]}`
          );
     }
     return [screen, line_height, screen_size];
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
               Accept: "application/json",
          },
          body: JSON.stringify({
               q: texto,
               source: "auto", // Detecta automaticamente o idioma de entrada
               target: idiomaAlvo,
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



/**
 * funcao que define o tema do site
 * @param {*} hora tema automático ou tema escolhido manualmente ex: 12: dia, 0: noite
 * @param {*} fixed false se for tema automático ou true se o tema for manual
 */
export function theme_by_hour_or_auto(hora=0, fixed=false) {

  let style = document.createElement("style");
style.type = "text/css";
  let data = new Date();
if (!fixed) {
    hora = data.getHours();
}


  if (hora >= 6 && hora <= 18) {
    // tema dia
    style.innerText = `
 body {
       background-color: #ffff;}
#pai {

        background-color: rgba(255,255,255,.80);}
`;
  }
  if (hora < 6 || hora > 18) {
    // tema noite
    style.innerText = `
 body {
       background-color:  #000;
   cursor: url('./img/cursor-black.svg'), auto; /* Substitua 'seu-cursor.png' pelo caminho da sua imagem */ 
 }
#pai {
        background-color: rgba(255, 255, 255, 0.71);}    
        #paragraph { border: 1px solid #ccc;
        border: 1px solid #000;}

  
`;
  }
document.body.appendChild(style);  
}


