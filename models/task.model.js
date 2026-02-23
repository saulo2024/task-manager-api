import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'O título da tarefa é obrigatório'],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ['pendente', 'em-progresso', 'concluida'],
    default: 'pendente',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Referência ao modelo de Usuário
    required: true,
  }
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

export default Task;