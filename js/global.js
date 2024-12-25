export url_api = "http://127.0.0.1:5000";


/**
 * Carrega um objeto JSON armazenado no LocalStorage.
 * Se o item não existir, retorna um objeto padrão.
 *
 * @param {string} name - A chave usada para recuperar o objeto do LocalStorage.
 * @returns {Object} O objeto JSON recuperado ou um objeto padrão caso não exista.
 */
export function loadText_Cache_json(name,is_principal=true) {
     const text = localStorage.getItem(name);
     // Pega o texto do LocalStorage
     if (is_principal) {
              const padrao = {
          lang: "en",
          delay: 2000,
          markmove: "button",
          "font-size": 18,
          //background_type: "white",
          theme: "auto",
          $autoScroll: false,
          color: "#00f000",
          screentype: "markdow",
     }; 
     // Verifica se o item existe e converte de volta para um objeto
          return text ? JSON.parse(text) : padrao;
     }
     return text ? JSON.parse(text) : null;
}

/**
 * Salva um objeto JSON no LocalStorage como uma string.
 *
 * @param {Object} data - O objeto que será salvo no formato JSON.
 * @param {string} name - A chave usada para armazenar o objeto no LocalStorage.
 */

export function save_json_to_cache(data, name) {
    // Converte o objeto para uma string JSON
    const text = JSON.stringify(data);
    // Salva no LocalStorage
    localStorage.setItem(name, text);
}

/**
 * 
 * @param {*} name ex: name: /moduloN/login
 * @returns 
 */
export async function requestGET(name) {
     url = url_api + name;
  try {
          const response = await fetch(url);
          if (!response.ok) {
               throw new Error(`Erro na solicitação: ${response.status}`);
          }
          return await response.json();
     } catch (error) {
          console.error("Erro na solicitação:", error);
          throw error;
     }
}