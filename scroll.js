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
    scroll_top.style.width = horizontal + 5 + 'px';
});


 