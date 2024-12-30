const functionUrl = "http://localhost:8888/.netlify/functions/env";

fetch(functionUrl, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    },
})
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        console.log("Resposta da função:", data);
    })
    .catch((error) => {
        console.error("Erro na requisição:", error);
    });
