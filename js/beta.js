import { loadText_Cache_json, save_json_to_cache } from "./global.js";

if( loadText_Cache_json("beta", false) == null) {
    const beta = document.createElement("div");
    beta.classList.add("beta");
    const info = document.createElement("div");
    info.classList.add("info");
    const title = document.createElement("h1");
    title.innerText = " Bem Vindo a beta do litbookmark web site";
    const button = document.createElement("button");
    button.innerText = "Fechar";
    button.addEventListener("click", () => {
        beta.style.display = "none";
    });
    const text = document.createElement("p");
    text.innerHTML = `
    "Este site foi criado especialmente para ajudá-lo a superar qualquer dificuldade com a leitura. Espero que você goste, meu querido <strong>Usuário</strong>! 😊"
    `;
    let style = document.createElement("style");
    beta.appendChild(info);
    info.appendChild(title);
    info.appendChild(text);
    info.appendChild(button);

    style.innerHTML = `
    .beta
    {
            position: fixed;
            top: 0;
            left:
            0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 9999;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            font-size: 24px;
}
            .info{
            display: flex;
            flex-direction: column;
            align-items: center;
           
            height: 200px;
            width: 600px;
            background-color: #fff;
            border-radius: 10px;
            padding: 20px;
            position: relative;
            }
            .info h1{
            font-size: 24px;
            margin-bottom: 10px;
            }
            .info p{
            font-size: 16px;
            color: #333;
            margin-bottom: 20px;
            }
        .info button{
      
            background-color: #007bff;
            color: #fff;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            transform: translateX(-50%);
            }
            .info button:hover{
            background-color: #0069d9;
            }
            `;
            document.body.appendChild(style);
            document.body.appendChild(beta);
    save_json_to_cache({
        "beta": false,
    }, "beta");
}
