
// let config = {};

// async function loadConfig() {
//     try {
//         const response = await fetch('../data/config.json');
//         config = await response.json();
//         console.log('Config carregado:', config);
//     } catch (error) {
//         console.error(error);
//     }
// }

// loadConfig();


// async function getApiKey() {
//     try {
//         const response = await fetch('/netlify/functions/getApiKey.js');
//         const data = await response.json();
//         console.log('API Key:', data);
//         config = data.apiKey;
//         return data.apiKey;
//     } catch (error) {
//         console.error(error);
//         return null;
//     }
// }


// getApiKey();

let env = null;

export async function initializeConfig() {
    try {
        const response = await fetch('/.netlify/functions/env');
        const data = await response.json();
        env = data;
        console.log('API Key carregada', env);
    } catch (error) {
        console.error('Erro ao carregar API Key:', error);
    }
}
onload = async () => {
    await initializeConfig();
};
export function getConfig() {
    return {
        env
    };
}


export function getURLAPi() {
    return getConfig().env.URL_API;
}