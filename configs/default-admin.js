import User from "../src/usuarios/users.model.js";
import Categoria from "../src/categorias/categoria.model.js"; // Asegúrate de que el nombre del modelo sea correcto
import { hash } from "argon2";

export const createAdmin = async () => {
    try {
        const adminEmail = "admin@gmail.com";
        const adminPassword = "AdminPassword";

        const existingAdmin = await User.findOne({ email: adminEmail });

        if (!existingAdmin) {
            const encryptedPassword = await hash(adminPassword);

            const adminUser = new User({
                name: "Admin",
                surname: "User",
                username: "admin",
                email: adminEmail,
                password: encryptedPassword,
                phone: "12345678",
                role: "ADMIN",
                status: true
            });

            await adminUser.save();
            console.log("El admin se creó");
        } else {
            console.log("El admin ya está creado");
        }
    } catch (err) {
        console.error("Error al crear admin por defecto:", err);
    }
};

export const createDefaultCategory = async () => {
    try {
        const nombre = "general";
        const descripcion = "Categoría general";

        const existingCategory = await Categoria.findOne({ nombre });

        if (!existingCategory) {
            const newCategory = new Categoria({
                nombre,
                descripcion,
                estado: true
            });

            await newCategory.save();
            console.log("Categoría creada");
        } else {
            console.log("La categoría ya existe");
        }
    } catch (err) {
        console.error("Error en categorías:", err);
    }
};