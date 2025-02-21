import {Schema, model } from "mongoose";

const categoriaSchema = new Schema({
    nombre: {
        type: String,
        required: [true,"necesitas una categoria"],
        maxLength: [100]
    }
    
})