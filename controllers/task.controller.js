import Task from '../models/task.model.js';
import mongoose from 'mongoose';

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

export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    // 1. Validação de formato para evitar erro 500
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ 
        success: false, 
        message: 'ID inválido para exclusão.' 
      });
    }

    // 2. Busca e remove apenas se a tarefa pertencer ao Saulo
    const task = await Task.findOneAndDelete({ _id: id, user: req.user._id });

    if (!task) {
      return res.status(404).json({ 
        success: false, 
        message: 'Tarefa não encontrada ou você não tem permissão para excluí-la.' 
      });
    }

    res.status(200).json({
      success: true,
      message: 'Tarefa removida com sucesso!',
    });
  } catch (error) {
    next(error);
  }
};