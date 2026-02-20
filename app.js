import express from 'express';
import authRouter from './routes/auth.routes.js';
import connectToDatabase from './database/mongodb.js';


const app = express();

app.use(express.json()); // ESSENCIAL para ler o JSON que você envia

connectToDatabase();

// Configura o prefixo da rota
app.use('/api/v1/auth', authRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});

export default app;