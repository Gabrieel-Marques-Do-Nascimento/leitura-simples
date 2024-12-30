
### **1. Use Functions no Netlify**
Netlify Functions permite que você crie APIs no backend. Elas podem acessar variáveis de ambiente e fornecer apenas os dados necessários para o frontend.

#### **Passo 1: Configure uma função**
1. Crie uma pasta chamada `netlify/functions` no seu projeto.
2. Dentro dela, crie um arquivo, por exemplo, `getApiKey.js`:
   ```javascript
   exports.handler = async function (event, context) {
       return {
           statusCode: 200,
           body: JSON.stringify({
               apiKey: process.env.SECRET_API_KEY, // Variável de ambiente configurada no Netlify
           }),
       };
   };
   ```

#### **Passo 2: Adicione a variável de ambiente no Netlify**
- No painel do Netlify, vá em **Site settings** → **Environment variables** e adicione sua variável com a chave `SECRET_API_KEY`.

#### **Passo 3: Acesse essa função no frontend**
- No seu JavaScript, chame a função usando `fetch`:
   ```javascript
   fetch('/.netlify/functions/getApiKey')
       .then((response) => response.json())
       .then((data) => {
           console.log('Chave da API:', data.apiKey);
       })
       .catch((error) => console.error('Erro ao buscar a chave:', error));
   ```

---

### **2. Configurar Variáveis Seguras no Build**
Se você não pode expor as variáveis, mas precisa usá-las no build (por exemplo, para gerar conteúdo estático):

#### **Passo 1: Use as variáveis apenas no build**
1. No seu script de build, use `process.env.VARIAVEL` para acessar a variável de ambiente.
2. O Netlify irá substituí-las automaticamente quando você fizer o deploy.

Exemplo em um script Node.js no processo de build:
```javascript
const mySecret = process.env.SECRET_API_KEY;
console.log("Usando minha chave secreta no build:", mySecret);
```

---

### **3. Por que não expor variáveis no frontend?**
Se você expuser uma variável sensível no frontend:
- Qualquer pessoa pode vê-la usando ferramentas como "Inspecionar Elemento" no navegador.
- Isso é inseguro para chaves de API privadas, credenciais, ou qualquer dado que você não deseja público.

Ao usar Netlify Functions, as variáveis permanecem no servidor e nunca chegam ao cliente diretamente.

Se precisar de mais ajuda com funções ou outro método, me avise! 😊