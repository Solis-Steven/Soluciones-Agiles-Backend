import TaskModel from "../models/Task.model.js";
import TicketModel from "../models/Ticket.model.js";

export const createTask = async(req, res) => {
    const {ticketId} = req.body;

    const ticketExist = await TicketModel.findById(ticketId);

    if(!ticketExist) {
        const error = new Error("The ticket doesn't exists");

        return(res.status(404).json({msg: error.message}));
    }


    try {
        const task = await TaskModel.create(req.body);
        ticketExist.tasks.push(task._id);
        await ticketExist.save();

        res.json(task);
    } catch (error) {
        console.log("Create task error: ", error);
    }
}


export const getTask = async(req, res) => {
    const { taskId } = req.params;
    
    const task = await TaskModel.findById(taskId).select("-createdAt -updatedAt -__v");
    
    if(!task) {
        const error = new Error("The task doesn't exists");
        
        return(res.status(404).json({ msg: error.message }));
    }

    res.json(task);
}

export const getTasks = async(req, res) => {
    const {ticketId} = req.params;

    const tasks = await TaskModel.find({
        ticketId
    }).select("-createdAt -updatedAt -__v");

    if(!tasks) {
        const error = new Error("The tasks don't exists");
        
        return(res.status(404).json({ msg: error.message }));
    }

    res.json(tasks);
}

export const updateTask = async(req, res) => {
    const { id } = req.params;

    const task = await TaskModel.findById(id);

    if(!task) {
        const error = new Error("The task doesn't exists");

        return(res.status(404).json({ msg: error.message }));
    }

    const { name, description, state } = req.body;

    task.name = name || task.name;
    task.description = description || task.description;
    task.state = state || task.state;

    try {
        const editedTask = await task.save();
        res.json(editedTask);
    } catch (error) {
        console.log("Edite task error", error);
    }

}

export const deleteTask = async(req, res) => {
    const { id } = req.params;

    const task = await TaskModel.findById(id);

    if(!task) {
        const error = new Error("The task doesn't exists");

        return(res.status(404).json({ msg: error.message }));
    }

    try {
        const ticket = await TicketModel.findById(task.ticketId);
        ticket.tasks.pull(task._id);

        await Promise.allSettled([await ticket.save(), await task.deleteOne()]);
        
        res.json({msg: "Task delete"});
    } catch (error) {
        console.log("Delete task error", error);
    }
}