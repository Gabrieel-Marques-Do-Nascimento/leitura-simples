


      const input = document.getElementById("ler");
      const startBTN = document.getElementById("start");
      const resetBTN = document.getElementById("reset");
      const paragrafo = document.getElementById("paragraph");
      const page = document.getElementById("page");

      const scrollspeed = 1;
      const width = window.innerWidth; // largura da janela
      const height = window.innerHeight; // altura da janela

      function scrollarParagrafo(pixels) {
        paragrafo.scrollTo({
          top: pixels - 55,
          behavior: "smooth",
        });
      }

      function style_sec(rstdis, pdis, stdis, inpdis, texto) {
        resetBTN.style.display = rstdis;
        paragrafo.style.display = pdis; // Faz o parágrafo aparecer
        startBTN.style.display = stdis;
        input.style.display = inpdis;
        paragrafo.innerHTML = texto;
      }


     
      let buttons = document.querySelectorAll(".scrollbt");
      // funcso que define se os bottons devem aparecer ou ficar escondido
      function buttonstatic(estado)
      {
        for (let i = 0; i < buttons.length; i++)
        {
          buttons[i].style.display = estado
        }
      }
      
      
      input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
          // Aqui você pode colocar a ação que deseja realizar ao pressionar Enter
          saveText(input.value,"savedText");
          buttonstatic("block")
          style_sec("block", "block", "none", "none", input.value);
        }
      });

      startBTN.addEventListener("click", () => {
        saveText(input.value,"savedText");
        style_sec("block", "block", "none", "none", input.value);
        buttonstatic("block")

      });
      resetBTN.addEventListener("click", () => {
        buttonstatic("none")
        style_sec("none", "none", "block", "block", "");
      
      });
      let pixels = 0;

      page.addEventListener("click", () => {
        const scrolltop = paragrafo.scrollTop;
        pixels = height + scrolltop;
        console.log("pixels", pixels, "height", height);
        scrollarParagrafo(pixels);
      });



      function saveText(data, name) {
        // Pega o texto da área de texto
        const text = data;
        // Salva no LocalStorage
        localStorage.setItem(name, text);
      }

      function loadText(name) {
        // Carrega o texto salvo do LocalStorage, se existir
        const savedText = localStorage.getItem(name);
        if (savedText) {
          style_sec("block", "block", "none", "none", savedText);
          input.value = savedText;
          return savedText
        }
      }

      // Chama a função para carregar o texto ao abrir a página
      window.onload = loadText("savedText");