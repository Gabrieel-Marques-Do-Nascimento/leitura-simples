
export function paragraph_height(
  {log=false,font_Size=null,
  height=null},
  ...args)
{
  let tot = 0
  for (let i = 0; i < args.length; i ++)
  {
    if (log){
          console.log(`argumento: ${i + 1}:`,args[i])
    }

    tot = tot + args[i];
    
  }

  
 const tela_heith = height - parseInt(tot)
// Obtém o tamanho da fonte do elemento "hello"
const fontSize = parseInt(font_Size);

// Calcula a altura da linha com base no tamanho da fonte
const lineHeight = fontSize + (fontSize / 2);

// Calcula a altura aproximada do elemento "hello" em relação à altura da janela
 let tela = parseInt((tela_heith / lineHeight) ) * lineHeight;


  if (log){
      console.log("tela disponivel:",[tela, lineHeight])
}
  return [tela, lineHeight]
}


export function _lineheight_(font_size)
{
  return Number(font_size) + (Number(font_size) / 2);
}






export function play() {
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
}

