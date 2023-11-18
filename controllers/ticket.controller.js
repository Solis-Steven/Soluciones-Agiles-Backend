import TicketModel from "../models/Ticket.model.js";
import TaskModel from "../models/Task.model.js";

export const createTicket = async(req, res) => {
    const ticket = new TicketModel(req.body);

    try {
        const savedTicket = await ticket.save();
        
        res.json(savedTicket);
    } catch (error) {
        console.log("Create ticket error: ", error);
    }
}

export const getTickets = async (req, res) => {
    try {
        const tickets = await TicketModel
            .find()
            .populate({
                path: 'tasks',
                select: 'name description state'
            })
            .select("-createdAt -updatedAt -__v");

        res.json(tickets);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los tickets", error: error.message });
    }
};


export const getTicket = async(req, res) => {
    const { id } = req.params;

    const ticket = await TicketModel.findById(id)
        .populate({
            path: 'tasks',
            select: 'name description state'
        })
        .select("-createdAt -updatedAt -__v");

    if(!ticket) {
        const error = new Error("The ticket doesn'ts exists");

        return(res.status(404).json({ msg: error.message }));
    }

    res.json(ticket);
}

export const updateTicket = async(req, res) => {
    const { id } = req.body;

    const ticket = await TicketModel.findById(id)
    .populate({
        path: 'tasks',
        select: 'name description state'
    })
    .select("-createdAt -updatedAt -__v");

    if(!ticket) {
        const error = new Error("El ticketo no existe");

        return(res.status(404).json({ msg: error.message }));
    }

    const { problemType, description, deadline } = req.body.newTicketData;

    ticket.problemType = problemType;
    ticket.description = description;
    ticket.deadline = deadline;

    try {
        const editedTicket = await ticket.save();
        res.json(editedTicket);
    } catch (error) {
        console.log("Edite ticket error", error);
    }

}

export const deleteTicket = async(req, res) => {
    const { id } = req.params;

    const ticket = await TicketModel.findById(id);

    if(!ticket) {
        const error = new Error("The ticket doesn't exists");

        return(res.status(404).json({ msg: error.message }));
    }
    
    try {
        await TaskModel.deleteMany({ ticketId: id });
        await ticket.deleteOne();
        
        res.json(ticket);
    } catch (error) {
        console.log("Delete ticket error", error);
    }
}