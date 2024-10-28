export function paragraph_height(
  { log = false, font_Size = null, height = null },
  ...args
) {
  let tot = 0;
  for (let i = 0; i < args.length; i++) {
    if (log) {
      console.log(`argumento: ${i + 1}:`, args[i]);
    }

    tot = tot + args[i];
  }

  const tela_heith = height - parseInt(tot);
  // Obtém o tamanho da fonte do elemento "hello"
  const fontSize = parseInt(font_Size);

  // Calcula a altura da linha com base no tamanho da fonte
  const lineHeight = fontSize + fontSize / 2;

  // Calcula a altura aproximada do elemento "hello" em relação à altura da janela
  let tela = parseInt(tela_heith / lineHeight) * lineHeight;

  if (log) {
    console.log("tela disponivel:", [tela, lineHeight]);
  }
  return [tela, lineHeight];
}

export function _lineheight_(font_size) {
  return Number(font_size) + Number(font_size) / 2;
}

export async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function play(
  line_heght,
  tela,
  elementhtml,
  scroll_heigh,
  dow_line_func,
  line_func_paramt,
  page_func,
  loger,
  ndelay
) {
  // a funcao pular uma linha
  // ate chegar no finall
  // if (
  //antes_scll_hght == dpois_scll_hght
  // )
  // { pular a pagina}
  /* run {
  calcula a quntidade de linhas
  for item in linhas 
      tame 2s {
          top = top + line_heth
      }
  }

  */

  // autura da rolagem do paragrafo

  let ante_loop_inf = 21658 / tela;
  const line_size = parseInt(tela / line_heght);
  loger("line_size: " + line_size);

  async function loopComAtraso() {
    let cont = 0;
    let engrenagem = 0;
    let the_end = false;

    while (true) {
      await delay(1000); // Aguarda 2 segundos antes da próxima iteração
      cont += 1;
      engrenagem += tela;

      elementhtml.addEventListener("scroll", function () {
        // Altura total do documento
        const scrollHeight = elementhtml.scrollHeight;

        // Altura da janela visível
        const clientHeight = elementhtml.clientHeight;

        // Distância rolada pelo usuário
        const scrollTop = elementhtml.scrollTop;

        // Verifica se a rolagem chegou ao final
        if (scrollTop + clientHeight >= scrollHeight) {
          console.log("Chegou ao final da página!");

          the_end = true;
        }
      });

      if (the_end) {
        console.log("the end: true");
        loger("the end: true");
        break;
      }

      console.log(`volta: ${cont}, ${engrenagem}px`);
      page_func(engrenagem);

      // if (cont > 43) {
      //   console.log('43: true')
      //   break;
      // }
    }
  }

async function aut_page() {

  let the_end = false
  elementhtml.addEventListener("scroll", function () {
    // Altura total do documento
    const scrollHeight = elementhtml.scrollHeight;

    // Altura da janela visível
    const clientHeight = elementhtml.clientHeight;

    // Distância rolada pelo usuário
    const scrollTop = elementhtml.scrollTop;

    // Verifica se a rolagem chegou ao final
    if (scrollTop + clientHeight >= scrollHeight) {
      console.log("Chegou ao final da página!");

      the_end = true;
    }
    if (the_end == false)
    {page_func(tela + scrollTop)}

  });
  return the_end
}



  async function aut_line() {
    let marcador_top = line_func_paramt[0];

    for (let i = 0; i < line_size; i++) {
      await delay(2000);
      dow_line_func(marcador_top, line_func_paramt[1], line_func_paramt[2]);

      marcador_top += line_func_paramt[2];
    }
    return true
  }

  
async function runner() {
  while (true) {
    let end = false;
    let vr = aut_line()
    if (vr) {
      end = aut_page()
    }
    
    if (end) {
      break
    }
   
  }
}
 runner()
}
