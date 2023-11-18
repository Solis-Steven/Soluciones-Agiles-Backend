import mongoose from "mongoose";

const ticketSchema = mongoose.Schema({
    problemType: {
        type: String,
        required: true,
        enum : [
            "Problema de Software",
            "Problema de Hardware", 
            "Problema de Red",
            "Problema de Dispositivo"
        ],
        default: "Problema de Software"
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    deadline: {
        type: Date,
        default: Date.now()
    },
    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task"
        }
    ],
    status: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Ticket = mongoose.model("Ticket", ticketSchema);
export default Ticket;