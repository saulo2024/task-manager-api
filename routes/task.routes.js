import express from 'express';
import { createTask, getTasks, updateTask, deleteTask} from '../controllers/task.controller.js';
import authorize from '../middlewares/auth.middleware.js';

const taskRouter = express.Router();

// Apenas usuários logados podem criar tarefas
taskRouter.post('/', authorize, createTask);
taskRouter.get('/', authorize, getTasks);
taskRouter.put('/:id', authorize, updateTask);
taskRouter.delete('/:id', authorize, deleteTask);

export default taskRouter;