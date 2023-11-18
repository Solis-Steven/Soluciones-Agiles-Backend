import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    state: {
        type: String,
        enum: ["Pendiente", "En Progreso", "Finalizada"],
        default: "Pendiente"
    },
    ticketId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ticket"
    }
}, {
    timestamps: true
});

const Task = mongoose.model("Task", taskSchema);
export default Task;