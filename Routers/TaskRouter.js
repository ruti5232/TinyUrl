import express from 'express';
import TaskController from '../Controllers/TaskController.js';

const TaskRouter = express.Router();

TaskRouter.get('/', TaskController.getAll)

TaskRouter.get('/:id', TaskController.getById)

TaskRouter.post('/', TaskController.add);

TaskRouter.delete('/:id', TaskController.delete);

export default TaskRouter;