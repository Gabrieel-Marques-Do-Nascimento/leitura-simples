let logo = document.createElement("div");
logo.innerText = "Premium"
// --------- teste bet ------------
const teste = document.getElementById("marcador");
teste.classList.add("premiumitem");

//-----------------------------------
const Premium = document.querySelectorAll(".premiumitem");

for (let i = 0; i < Premium.length; i++) {
    let cloneLogo = logo.cloneNode(true);

    let style = window.getComputedStyle(Premium[i]);
    for (let propety of style) {
        cloneLogo.style[propety] = style.getPropertyValue(propety);
    }
    console.log(style);
    document.body.appendChild(cloneLogo);
    Premium[i].style.opacity = 0;
    Premium[i].style.display = "none";
}
