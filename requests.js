const user = {
    "username": 'gabriel55',
    "password": 123456,
    "email": 'gabriel@gmail.com',
  };

  fetch("http://127.0.0.1:5000/modulo1/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then(async (response) => {
      console.log("Status HTTP:", response.status);
      const data = await response.json(); // Tenta parsear o JSON
      if (!response.ok) {
        console.error("Erro da API:", data);
        throw new Error(data.error || "Erro desconhecido");
      }
      console.log("Sucesso:", data);
   
    })
    .catch((error) => {
      console.error("Erro:", error.message);
    
    });
  
