import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const authorize = async (req, res, next) => {
  try {
    let token;

    // 1. Verifica se o token foi enviado no cabeçalho (Header)
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
    }

    // 2. Decodifica e valida o token usando a sua chave secreta
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Busca o usuário no banco para garantir que ele ainda existe
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: 'Usuário não encontrado.' });
    }

    // 4. Adiciona o usuário à requisição para que os próximos controllers saibam quem ele é
    req.user = user;
    next();
  } catch (error) {
    console.error("Erro no middleware de autorização:", error.message);
    res.status(401).json({ message: 'Token inválido ou expirado.' });
  }
};

export default authorize;