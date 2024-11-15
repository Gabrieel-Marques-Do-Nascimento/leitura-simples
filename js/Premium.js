let logo = document.createElement("div");
logo.innerText = "Premium";
logo.translate = false;
// --------- teste bet ------------
const teste = document.getElementById("bookmark");
teste.classList.add("premiumitem");

//-----------------------------------
const menuSettings = document.getElementById("conteiner");
const Premium = document.querySelectorAll(".premiumitem");

conteiner.appendChild(logo)
for (let i = 0; i < Premium.length; i++) {
    let cloneLogo = logo.cloneNode(true);

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
