import arcjet, { detectBot, fixedWindow } from "@arcjet/node";

// Configura o Arcjet com a sua chave do .env
const aj = arcjet({
  key: process.env.ARCJET_KEY,
  characteristics: ["ip.src"], // Identifica o invasor pelo endereço IP
  rules: [
    // 1. Bloqueia robôs conhecidos
    detectBot({
      mode: "LIVE", 
      allow: ["CATEGORY:SEARCH_ENGINE"], // Permite apenas Google, Bing, etc.
    }),
    // 2. Limita a 5 tentativas de login por minuto por IP (Rate Limiting)
    fixedWindow({
      mode: "LIVE",
      window: "1m",
      max: 5,
    }),
  ],
});

export const arcjetMiddleware = async (req, res, next) => {
  try {
    const decision = await aj.protect(req);

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({ error: "Muitas tentativas. Tente novamente em 1 minuto." });
      }
      if (decision.reason.isBot()) {
        return res.status(403).json({ error: "Acesso negado para robôs." });
      }
      return res.status(403).json({ error: "Acesso negado pela segurança." });
    }

    next();
  } catch (error) {
    next(error);
  }
};