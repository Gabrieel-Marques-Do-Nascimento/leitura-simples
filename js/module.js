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
    const port = window.location.port ? `:${window.location.port}` : '';
    
    // Combina os elementos para formar a URL base
    const baseURL = `${protocol}//${hostname}${port}`;
    
    return baseURL;
}

