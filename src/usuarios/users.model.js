import { Schema, model } from "mongoose";

const clienteSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        maxLength: [25, "Name cannot exceed 25 characters"]
    },
    surname: {
        type: String,
        required: [true, "Surname is required"],
        maxLength: [25, "Surname cannot exceed 25 characters"]
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    phone: {
        type: String,
        minLength: 8,
        maxLength: 8,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ["CLIENTE_ROLE", "ADMIN"],
        default: "CLIENTE_ROLE"
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    versionKey: false,
    timestamps: true 
});


clienteSchema.methods.toJSON = function () {
    const { password, _id, ...cliente } = this.toObject();
    cliente.uid = _id;
    return cliente;
};

export default model("Cliente", clienteSchema);