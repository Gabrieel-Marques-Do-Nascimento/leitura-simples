import { loadText_Cache_json } from "./global.js";
import { getConfig } from "./env-config.js";

const url = getConfig().env.URL_API;
     console.log("Carregando...");          
     const user = loadText_Cache_json(getConfig().env.TOKEN, null);
          const id = loadText_Cache_json(getConfig().env.USERID, null);


          if (user == null || id == null) {
               window.location.href = "login.html";
          } else {
               const username = document.getElementById("name");
               // username.innerHTML = user.name;
               const email = document.getElementById("email");
               const genero = document.getElementById("genero");
               const idioma = document.getElementById("idioma");
               const plano = document.getElementById("plano");

               // Fazer a requisição GET com um corpo JSON
               fetch(`${url}/modulo2/info`, {
                    method: "GET",
                    headers: {
                         "Content-Type": "application/json",
                         Authorization: `Bearer ${user}`,
                         uid: id,
                    },
               })
                    .then((response) => {
                         if (!response.ok) {
                              throw new Error(
                                   "Network response was not ok " +
                                        response.statusText
                              );
                         }
                         return response.json();
                    })
                    .then((data) => {
                         // console.log(data);
                         username.innerHTML = data.name;
                         email.innerHTML = data.email;
                         genero.innerHTML = data.genero;
                         idioma.innerHTML = data.idioma;
                         plano.innerHTML = data.permision;
                         plano.classList.add("link");
                         plano.addEventListener("click", function () {
                              window.location.href = "plano.html";
                         });
                    })
                    .catch((error) => {
                         console.error(
                              "There has been a problem with your fetch operation:",
                              error
                         );
                        window.location.href = "login.html";
                    });
          }
     
