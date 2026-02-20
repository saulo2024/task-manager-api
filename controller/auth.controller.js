import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const signUp = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // 1. Verifica se o usuário já existe
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).json({ message: 'E-mail já cadastrado.' });

    // 2. Criptografa a senha (bcrypt)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Cria o usuário
    const newUser = await User.create({ name, email, password: hashedPassword });

    // 4. Gera o Token (JWT)
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(201).json({
      success: true,
      message: 'Usuário criado com sucesso!',
      data: { token, user: newUser },
    });
  } catch (error) {
    next(error);
  }
};