let style = document.createElement('style');
style.type = 'text/css';
style.innerText = `
        .scroll_top {
            background-color: green;
            position: fixed;
            width: 0%;
            height: 10px;
            bottom: 0px;
            left: 0;
        }
`;
document.body.appendChild(style);


let scroll_top = document.createElement('div');
scroll_top.classList.add('scroll_top');
document.body.appendChild(scroll_top);



paragrafo.addEventListener('scroll', () => {
    let vertical = (paragrafo.scrollTop / (paragrafo.scrollHeight - paragrafo.clientHeight)) * 100;
    let horizontal = (vertical / 100) * window.innerWidth;
    scroll_top.style.width = horizontal + 1 + 'px';
});


let is_scroll = document.getElementsByClassName('scroll')




// Selecionar o elemento (por exemplo, pela classe)
var elemento = document.getElementById('paragraph');
// Obter o tamanho da janela (viewport)
var larguraJanela = window.innerWidth;
var alturaJanela = window.innerHeight;

// Comparar os tamanhos
console.log("Largura da janela: " + larguraJanela + "px");
console.log("Altura da janela: " + alturaJanela + "px");

