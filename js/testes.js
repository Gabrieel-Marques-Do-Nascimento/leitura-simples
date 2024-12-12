export const texto_teste = `Welcome to this course on generative AI with
large language models. Large language models or LLMs are a very exciting technology. But despite all
the buzz and hype, one of the thing that is
still underestimated by many people is their
power as a developer too. Specifically, there are many machine learning and AI applications that
used to take me many months to build
that you can now build in days or maybe even
small numbers of weeks. This course will take a
deep dive with you into how LLM technology actually works including going through many
of the technical details, like model training, instruction
tuning, fine-tuning, the generative AI project
life cycle framework to help you plan and execute
your projects and so on. Generative AI and LLMs specifically are a general
purpose technology. That means that similar to other general
purpose technologies like deep learning
and electricity, is useful not just for
a single application, but for a lot of different applications that span many corners of the economy. Similar to the rise
of deep learning that started maybe 15
years ago or so, there's a lot of important
where it lies ahead of us that needs to be done over many
years by many people, I hope including you, to identify use cases and
build specific applications. Because a lot of with
this technology is so new and so few people really
know how to use them, many companies are also right now scrambling to
try to find and hire people that actually know how to build
applications with LLMs. I hope that this course
will also help you, if you wish, better position yourself to get
one of those jobs. I'm thrilled to bring you
this course along with a group of fantastic
instructors from the AWS team, Antje Barth, Mike Chambers, Shelbee Eigenbrode who are`



export function add_value(elemente, value){
  elemente.value = value
}

/**
 * utilizado pra testar multiplos elementos ou valores se existem
 */
export function log_list(lista){
  for (let i = 0; i < lista.length; i++){
    console.log(lista[i])
  }
}















// navigator.serviceWorker.controller.postMessage({
//     type: 'PAGE_URL',
//     url: window.location.href
// });
//
//

function getBaseURL() {
  // Obtém o protocolo (http:// ou https://)
  const protocol = window.location.protocol;

  // Obtém o hostname (domínio do site)
  const hostname = window.location.hostname;

  // Obtém a porta, se existir (opcional)
  const port = window.location.port ? `:${window.location.port}` : "";

  // Combina os elementos para formar a URL base
  const baseURL = `${protocol}//${hostname}${port}`;

  return baseURL;
}
