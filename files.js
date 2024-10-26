const fileInput = document.getElementById("fileInput");
const dropZone = document.getElementById("dropZone");
const mostrar = document.getElementById("fileContent");


// Função para ler o conteúdo do arquivo
function readFile(file) {
    if (file && file.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = function(e) {
        // aqui o elemento mostrar recebe o texto do arquivo como texto dele mesmo
        mostrar.textContent = e.target.result;
      };
      reader.onerror = function() {
        fileContent.textContent = "Erro ao ler o arquivo.";
      };
      reader.readAsText(file, "UTF-8");
    } else {
      fileContent.textContent = "Por favor, escolha um arquivo de texto (.txt) válido.";
    }
  }
