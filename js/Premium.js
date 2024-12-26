// let logo = document.createElement("div");
// logo.classList.add("premiumLogo");
// let link = document.createElement("a");
// link.href = "templates/register.html";
// link.innerText = "Premium";
// logo.appendChild(link);
// logo.translate = false;
// // --------- teste bet ------------
// const teste = document.getElementById("bookmark");
// teste.classList.add("premiumitem");

// //-----------------------------------
// const menuSettings = document.getElementById("conteiner");
// const Premium = document.querySelectorAll(".premiumitem");

// // menu de opção de comprar premium
// // =============================================================
// const itemlist = [
//    'traducao automatica',
//    'personalizar o tema',
// ]

// const $buy_premium = document.createElement("div");
// $buy_premium.classList.add("buy_premium");
// const $title = document.createElement("h1");
// $title.innerText = "Premium";
// $title.translate = false;
// $title.style.textTransform = "uppercase";
// $buy_premium.appendChild($title);
// const $buy_premium_text = document.createElement("h4");
// $buy_premium_text.innerText =
//      "Compre o premium para desbloquear todos os recursos";
// $buy_premium.appendChild($buy_premium_text);
// const $buy_premium_list = document.createElement("ul");
// $buy_premium.appendChild($buy_premium_list);
// for (let i = 0; i < itemlist.length; i++) {
//     const $buy_premium_list_item = document.createElement("li");
//     $buy_premium_list_item.innerText = itemlist[i];
//     $buy_premium_list.appendChild($buy_premium_list_item);
// }

// const $buy_premium_button = document.createElement("button");
// $buy_premium_button.innerText = "Comprar";
// $buy_premium.appendChild($buy_premium_button);
// // $buy_premium.style.display = "none";

// document.body.appendChild($buy_premium);

// // ==========================================================

// conteiner.appendChild(logo);
// for (let i = 0; i < Premium.length; i++) {
//      // let cloneLogo = logo.cloneNode(true);
//      // add o estilo de um elemento a outro
//      // let style = window.getComputedStyle(Premium[i]);
//      //     for (let propety of style) {
//      //         cloneLogo.style[propety] = style.getPropertyValue(propety);
//      //     }
//      //     console.log(style);
//      //     menuSettings.appendChild(cloneLogo);

//      Premium[i].disabled = true;
//      const label = document.querySelector(`label[for="${Premium[i].id}"]`);
//      label.classList.add("disabled-label");
     


// }
//      // Hide `#buy` when clicking outside of it
//      $buy_premium.addEventListener("click", (event) => event.stopPropagation());
//      document.addEventListener("click", (event) => {
//          if (event.target.closest("#buy_premium") === null) {
//              $buy_premium.style.display = "none";
//          }
//          if (event.srcElement.className === 'itemseting' ){
//             const clickedElement = event.target;
//             const filhoEspecifico = clickedElement.querySelector('.premiumitem');
//             if (filhoEspecifico)   {
//                 $buy_premium.style.display = "block";
//             }
//            console.log(event);
//          }
         
//      });
     

//      // Prevent bubbling from clicks inside `#buy`
//      $buy_premium.addEventListener("click", function (event) {
//           event.stopPropagation();
//      });

// // button click 
// $buy_premium_button.addEventListener("click", () => {
//      // $buy_premium.style.display = "none";
//      // alert("Compra realizada com sucesso!");
//      // window.location.href = "templates/register.html";
//      window.location.href = "templates/register.html";
// });
     