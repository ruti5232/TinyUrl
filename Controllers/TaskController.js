import TaskModel from "../Models/TaskModel.js";

const TasksList = [{id:1, name:'לשטוף כלים'}, {id:2, name:"לקפל כביסה"}]

const TaskController = {
    getAll: async(req, res) => {
      const tasks = await TaskModel.find();
      console.log('tasks', tasks);
      res.send(tasks);
    },

    getById: async(req, res) => {
      const id = req.params.id;
      //const task = await TaskModel.findById(id)
      const task = await TaskModel.find({_id:id});  
      res.send(task)
    },

    add:async(req,res)=>{
      const {name} = req.body;
      const newTask = await TaskModel.create({name});
      res.send(newTask);
    },

    delete:async(req,res)=>{
      await TaskModel.findByIdAndDelete(req.params.id);
      res.status(204).send('removed successfully');
    }
}

export default TaskController;
