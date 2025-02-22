import { Schema, model } from "mongoose";

const categoriaSchema = new Schema({
    nombre: {
        type: String,
        required: [true],
        unique: true,
        maxLength: [100]
    },
    descripcion: {
        type: String,
        required: [true]
    },
    estado: {
        type: Boolean,
        default: true
    }
}, {
    versionKey: false,
    timestamps: true
});

categoriaSchema.methods.toJSON = function() {
    const { _id, ...categoria } = this.toObject();
    categoria.cid = _id;
    return categoria;
};

export default model("Categoria", categoriaSchema);