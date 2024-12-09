import {save_text_in_cache,  buttonstatic
} from 'utils.js' 

export const fileInput = document.getElementById("fileInput");
export const dropZone = document.getElementById("dropZone");

function readFile(file) {
     if (file && file.type === "text/plain") {
          const reader = new FileReader();
          reader.onload = function (e) {
               // aqui o elemento mostrar recebe o texto do arquivo como texto dele mesmo
               return e.target.result;
          };
          reader.onerror = function () {
               dropZone.style.color = "red";
               dropZone.textContent = "Erro ao ler o arquivo.";
          };
          reader.readAsText(file, "UTF-8");
     } else {
          dropZone.style.color = "red";
          dropZone.textContent =
               "Por favor, escolha um arquivo de texto (.txt) válido.";
     }
}



// Eventos para clicar e selecionar o arquivo
dropZone.addEventListener("click", () => fileInput.click());
fileInput.addEventListener("change", (e) => {

    save_text_in_cache(readFile(e.target.files[0]))
    buttonstatic(document.querySelectorAll(".disabled"), "none");
    buttonstatic(document.querySelectorAll(" .activated"), "block");
    
}
  
);

// Previne o comportamento padrão de arrastar e soltar
["dragenter", "dragover", "dragleave", "drop"].forEach((eventType) => {
  dropZone.addEventListener(eventType, (e) => e.preventDefault());
});

// Evento para ler o arquivo ao soltar
dropZone.addEventListener("drop", (e) => {
  const file = e.dataTransfer.files[0];
   save_text_in_cache(readFile(file))
   buttonstatic(document.querySelectorAll(".disabled"), "none");
   buttonstatic(document.querySelectorAll(" .activated"), "block");
});













// Adiciona/remova classe 'hover' ao arrastar o arquivo sobre a zona de soltar
["dragenter", "dragover"].forEach((eventType) => {
     dropZone.addEventListener(eventType, () =>
          dropZone.classList.add("hover")
     );
});

["dragleave", "drop"].forEach((eventType) => {
     dropZone.addEventListener(eventType, () =>
          dropZone.classList.remove("hover")
     );
});
