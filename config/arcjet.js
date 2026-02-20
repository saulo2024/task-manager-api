import arcjet, { detectBot, shield, tokenBucket } from "@arcjet/node";
import dotenv from 'dotenv';

dotenv.config();

 const aj = arcjet({
    KEY: process.env.ARCJET_KEY,
    characteristics: ["import.src"], // Identifica o usuário pelo IP
    rules: [
    shield({ mode: "LIVE"}), // Proteção contra ataques comuns
    detectBot({ mode: "LIVE", allow: ["CATEGORY: SEARCH_ENGINE"]}), // Bloqueia bots, exceto Google/Bing
    tokenBucket({ 
        mode: "LIVE",
        refillRate: 5, // Adiciona 5 tokens a cada intervalo
        interval: 10, // Intervalo de 10 segundos
        capacity: 10, // Máximo de 10 requisições seguidas
    }),
   ], 
});

export default aj;