let logo = document.createElement("div");
logo.classList.add('premiumLogo');
let link = document.createElement("a");
link.href = "templates/register.html"
link.innerText = "Premium"
logo.appendChild(link)
logo.translate = false;
// --------- teste bet ------------
const teste = document.getElementById("bookmark");
teste.classList.add("premiumitem");

//-----------------------------------
const menuSettings = document.getElementById("conteiner");
const Premium = document.querySelectorAll(".premiumitem");

conteiner.appendChild(logo)
for (let i = 0; i < Premium.length; i++) {
    // let cloneLogo = logo.cloneNode(true);
// add o estilo de um elemento a outro
    // let style = window.getComputedStyle(Premium[i]);
//     for (let propety of style) {
//         cloneLogo.style[propety] = style.getPropertyValue(propety);
//     }
//     console.log(style);
//     menuSettings.appendChild(cloneLogo);
    
    Premium[i].disabled = true;
    const label = document.querySelector(`label[for="${Premium[i].id}"]`);
    label.classList.add("disabled-label")
}
