import { loadText_Cache_json } from "./global.js";

const user = loadText_Cache_json("TOKEN", null);
const id= loadText_Cache_json("LITBOOKMARKID", null);
console.log(id);
console.log(user);
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
     fetch(`http://127.0.0.1:5000/modulo2/info`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user}`,
            uid: id
          }
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
          }
          return response.json();
        })
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.error('There has been a problem with your fetch operation:', error);
        });
        


        
}
