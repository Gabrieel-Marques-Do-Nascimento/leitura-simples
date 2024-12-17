import { loadText_Cache_json } from "./global.js";


let user = loadText_Cache_json("TOKEN");
if ( user == null) {
     window.location.href = "login.html";
}
else {
     document.getElementById("user").innerHTML = user.name;
}