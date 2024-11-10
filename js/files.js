import { $input } from "./script.js";

export const fileInput = document.getElementById("fileInput");
export const dropZone = document.getElementById("dropZone");
// export const mostrar = document.getElementById("fileContent");

// Função para ler o conteúdo do arquivo

function readFile(file) {
  if (file && file.type === "text/plain") {
    const reader = new FileReader();
    reader.onload = function (e) {
      // aqui o elemento mostrar recebe o texto do arquivo como texto dele mesmo
      $input.value = e.target.result;
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

// Adiciona/remova classe 'hover' ao arrastar o arquivo sobre a zona de soltar
["dragenter", "dragover"].forEach((eventType) => {
  dropZone.addEventListener(eventType, () => dropZone.classList.add("hover"));
});

["dragleave", "drop"].forEach((eventType) => {
  dropZone.addEventListener(eventType, () =>
    dropZone.classList.remove("hover")
  );
});

// Eventos para clicar e selecionar o arquivo
dropZone.addEventListener("click", () => fileInput.click());
fileInput.addEventListener("change", (e) =>
  readFile(e.target.files[0], $input)
);

// Previne o comportamento padrão de arrastar e soltar
["dragenter", "dragover", "dragleave", "drop"].forEach((eventType) => {
  dropZone.addEventListener(eventType, (e) => e.preventDefault());
});

// Evento para ler o arquivo ao soltar
dropZone.addEventListener("drop", (e) => {
  const file = e.dataTransfer.files[0];
  $input.value = readFile(file);
});
