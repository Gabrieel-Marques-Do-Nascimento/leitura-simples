const user = { username: "Gabriel2", password: "20211613" };

const confg_json = {
  // envia os dados e recebe o resultado
  method: "POST",
  // tipo de dado
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(user),
};

/**
 *
 * @param {string} api caminho para a API escolhida pelo user
 * @param {string} type_api tipo disponíveis  `login`, `register`
 * @param {*} confg as configurações `{method: POST, headers: {json}, body: user}`
 */
async function requests_api(
  api = "http://192.168.0.102:5000//login",
  type_api = "login",
  confg = confg_json
) {
 fetch(api, confg)
    .then((response) => {
      console.log("STATUS HTTP:", response.status);

    if (response.ok){
      if (data["permision"] == "base"){
        window.location.href = "api/premium.html"
      }
      
    }


      if (!response.ok) {
        return response.json().then((erro) => {
          console.error("ERRO da API:", erro);
          throw new Error(erro.error || "Erro desconhecido");
        });
      }
      return response.json();
    })
    .then((data) => {
      console.log("sucesso:", data);
      alert("Formulario enviado com sucesso!");
    })
    .catch((erro) => {
      console.error("error:", erro.message);
      alert("Ocorreu um erro:" + erro.message);
    });
}
