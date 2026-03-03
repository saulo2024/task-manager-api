import express from 'express';
import cors from 'cors'; // Importe apenas este
import authRouter from './routes/auth.routes.js';
import connectToDatabase from './database/mongodb.js';
import userRouter from './routes/user.routes.js';
import taskRouter from './routes/task.routes.js';

const app = express();

// CONFIGURAÇÃO DO CORS (O segredo para a Vercel funcionar)
app.use(cors()); 

app.use(express.json()); // Essencial para ler o JSON

// Conecta ao banco de dados
connectToDatabase();

// Configura as rotas
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/tasks', taskRouter);

const PORT = process.env.PORT || 3000; // Use a porta da Koyeb ou 3000 local

app.listen(PORT, () => {
  console.log(`Servidor rodando com sucesso!`);
});

export default app;