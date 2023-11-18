import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['Cliente', 'IT', 'Administrador', 'SuperAdministrador'],
        default: 'Cliente'
    }
}, {
    timestamps: true
});


const User = mongoose.model("User", userSchema);
export default User;