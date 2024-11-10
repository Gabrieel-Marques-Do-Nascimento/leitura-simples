async function pegaDados() {
  const result = await fetch(
    "https://api.github.com/users/Gabrieel-Marques-Do-Nascimento"
  );
  console.log('result: ', result);
}

pegaDados()