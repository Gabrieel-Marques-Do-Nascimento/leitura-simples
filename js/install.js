let deferredprompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
    deferredprompt = e;
    document.getElementById('install').style.display = 'block';
});

document.getElementById('install').addEventListener('click', () => {
 if (deferredprompt) {
  deferredprompt.prompt();
  deferredprompt.userChoice.then((choice) => {
    if (choice.outcome === 'accepted') {
      console.log("PWA Instalado!");
    } 
    deferredprompt = null;
  });
}
 });