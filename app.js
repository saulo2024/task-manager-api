import express from 'express';
import authRouter from './routes/auth.routes.js';
import connectToDatabase from './database/mongodb.js';
import userRouter from './routes/user.routes.js';
import taskRouter from './routes/task.routes.js';
import cors from 'cors';

const app = express();

app.use(cors()); // Habilita CORS
app.use(express.json()); // ESSENCIAL para ler o JSON que você envia

connectToDatabase();

// Configura o prefixo da rota
app.use('/api/v1/auth', authRouter);

app.use('/api/v1/users', userRouter);

app.use('/api/v1/tasks', taskRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});

export default app;