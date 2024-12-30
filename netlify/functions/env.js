require("dotenv").config();

exports.handler = async function (event, context) {
     const baseUrl = process.env.FUNCTION_BASE_URL || "http://localhost:8888/";
     const origin = event.headers.origin || event.headers.referer;
     if (!origin || !origin.startsWith(baseUrl)) {
          return {
               statusCode: 403,
               body: JSON.stringify({ error: "Acess denied. invalid origin" }),
          };
     }
     return {
          statusCode: 200,
          body: JSON.stringify({
               SECRET_API_KEY: process.env.SECRET_API_KEY,
               apiKey: process.env.apiKey,
               URL_API: process.env.URL_API
          }),
     };
};
// console.log("Verificando variável:", process.env);
