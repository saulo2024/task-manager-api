import Task from '../models/task.model.js';

(`Task.find({ user: req.user._id })`)

export const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const createTask = async (req, res, next) => {
  try {
    // 1. Criamos a tarefa enviada no body, mas injetamos o ID do usuário logado
    const task = await Task.create({
      ...req.body,
      user: req.user._id, // O 'segurança' (middleware) nos deu esse ID!
    });

    res.status(201).json({
      success: true,
      message: 'Tarefa criada com sucesso!',
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findOneAndUpdate(
      { _id: id, user: req.user._id }, 
      req.body,
      {new: true, runValidators: true}
    );

    if (!task) {
      return res.status(404).json({ success: false, message: 'Tarefa não encontrada' });
    }

    res.status(200).json({
      success: true,
      message: 'Tarefa atualizada com sucesso!',
      data: task,
    });
  } catch (error) {
    next(error);
  }
}