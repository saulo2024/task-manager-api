import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const accountEmail = 'estevessaulo2@gmail.ccom'; // O e-mail que enviará as mensagens

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: accountEmail,
    pass: process.env.EMAIL_PASSWORD, // Senha de App do Google
  },
});

export default transporter;