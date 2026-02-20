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

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1. Procura o usuário pelo e-mail
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });

    // 2. Compara a senha digitada com a senha criptografada
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: 'Senha inválida.' });

    // 3. Se tudo estiver ok, gera um novo Token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({
      success: true,
      message: 'Login realizado com sucesso!',
      data: { token, user },
    });
  } catch (error) {
    next(error);
  }
};