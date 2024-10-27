
export function paragraph_height(
  font_Size,
  height,
  ...args)
{
  let tot = 0
  for (let i = 0; i < args.length; i ++)
  {
    //console.log(`argumento: ${i + 1}:`,args[i])
    tot = tot + args[i];
    
  }

  
 const tela_heith = height - parseInt(tot)
// Obtém o tamanho da fonte do elemento "hello"
const fontSize = parseInt(font_Size);

// Calcula a altura da linha com base no tamanho da fonte
const lineHeight = fontSize + (fontSize / 2);

// Calcula a altura aproximada do elemento "hello" em relação à altura da janela
 let tela = parseInt((tela_heith / lineHeight) ) * lineHeight;

  console.log("tela disponivel:",tela)
  return tela
}

//paragraph_height(18,700,3,6,8,9)