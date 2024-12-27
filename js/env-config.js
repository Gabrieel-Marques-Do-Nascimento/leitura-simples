
let config = {};

async function loadConfig() {
    try {
        const response = await fetch('../data/config.json');
        config = await response.json();
        console.log('Config carregado:', config);
    } catch (error) {
        console.error(error);
    }
}

loadConfig();

export { config };
