import { $input, inputActived, $screen_text, Cache_screen_name } from "./script.js";
import { buttonstatic, save_text_in_cache, ReadScreen, delay } from "./utils.js";

export const fileInput = document.getElementById("fileInput");
export const dropZone = document.getElementById("dropZone");
// export const mostrar = document.getElementById("fileContent");

// Função para ler o conteúdo do arquivo
function readFile(file) {
     return new Promise((resolve, reject) => {
          if (file && file.type === "text/plain") {
               const reader = new FileReader();
               reader.onload = function (e) {
                    // Resolve the promise with the file content
                    resolve(e.target.result);
               };
               reader.onerror = function () {
                    dropZone.style.color = "red";
                    dropZone.textContent = "Erro ao ler o arquivo.";
                    // Reject the promise if there's an error
                    reject("Erro ao ler o arquivo");
               };
               reader.readAsText(file, "UTF-8");
          } else {
               dropZone.style.color = "red";
               dropZone.textContent =
                    "Por favor, escolha um arquivo de texto (.txt) válido.";
               // Reject the promise if file is invalid
               reject("Arquivo inválido");
          }
     });
}

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

// Eventos para clicar e selecionar o arquivo
dropZone.addEventListener("click", () => fileInput.click());
fileInput.addEventListener("change", async (e) => {
     try {
       let value = await readFile(e.target.files[0]);
       ReadScreen(value)
       save_text_in_cache(value, Cache_screen_name)
       delay(1000)
          buttonstatic(document.querySelectorAll(".disabled"), "none");
          buttonstatic(document.querySelectorAll(" .activated"), "block");
          inputActived[0].value = value
     } catch (error) {
          console.error(error);
     }
});

// Previne o comportamento padrão de arrastar e soltar
["dragenter", "dragover", "dragleave", "drop"].forEach((eventType) => {
     dropZone.addEventListener(eventType, (e) => e.preventDefault());
});

// Evento para ler o arquivo ao soltar
dropZone.addEventListener("drop", async (e) => {
     try {
          const file = e.dataTransfer.files[0];
          let value = await readFile(file);
         inputActived[0].value = value;
          let vr = save_text_in_cache(value, Cache_screen_name);
          ReadScreen(value)
          if (vr) {
  
               buttonstatic(document.querySelectorAll(".disabled"), "none");
               buttonstatic(document.querySelectorAll(" .activated"), "block");
          }
     } catch (error) {
          console.error(error);
     }
});
