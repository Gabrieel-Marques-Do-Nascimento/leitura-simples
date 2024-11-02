// e ativado assim que vc sair da pagina
window.addEventListener("beforeunload", function() {
    // Exemplo: Salvando valores de um formulário com id "meuFormulario"
    const form = document.getElementById("meuFormulario");
    const formData = new FormData(form);
    formData.forEach((value, key) => {
        localStorage.setItem(key, value);
    });
    // Você pode salvar outras informações, como posição do scroll
    localStorage.setItem("scrollPosition", window.scrollY);
});

// assim que a pagina for aberta
window.addEventListener("load", function() {
    const form = document.getElementById("meuFormulario");
    Array.from(form.elements).forEach((element) => {
        const value = localStorage.getItem(element.name);
        if (value) element.value = value;
    });
    // Restaurar posição do scroll
    const scrollPosition = localStorage.getItem("scrollPosition");
    if (scrollPosition) window.scrollTo(0, scrollPosition);
});

localStorage.clear(); // limpa todo o localStorage