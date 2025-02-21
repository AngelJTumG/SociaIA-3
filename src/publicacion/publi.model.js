import { Schema, model } from "mongoose";

const publicacionSchema = new Schema({
    titulo: {
        type: String,
        required: [true, "El título es requerido"],
        maxLength: [100, "El título no puede exceder los 100 caracteres"]
    },
    categoria: {
        type: String,
        required: [true, "La categoría es requerida"],
    },
    texto: {
        type: String,
        required: [true, "El texto es requerido"]
    },
    autor: {
        type: Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    }
}, {
    versionKey: false,
    timestamps: true
});

publicacionSchema.methods.toJSON = function () {
    const { _id, ...publicacion } = this.toObject();
    publicacion.uid = _id;
    return publicacion;
};

export default model("Publicacion", publicacionSchema);