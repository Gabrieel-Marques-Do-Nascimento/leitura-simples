// menu de comfiguracoes
let setings = document.getElementById("setings");

let setingbtn = document.getElementById("setting");
let close = document.getElementById("close");

close.addEventListener("click", () =>
{
  //console.log("none");
  setingbtn.style.display = "block"
  setings.style.display = "none";
});

setingbtn.addEventListener("click", () =>
{
  //console.log("fixed");
  setingbtn.style.display = "none"
  setings.style.display = "block";
});
// ----------------------------------
// comfiguracoes gerais do Site