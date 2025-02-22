import User from "../src/usuarios/users.model.js";
import Categorias from "../src/categorias/categoria.model.js";
import { hash } from "argon2";

export const createAdmin = async () => {
    try {
        const adminEmail = "admin@gmail.com";
        const adminPassword = "AdminPassword";

        const existingAdmin = await User.findOne({ email: adminEmail });

        if (!existingAdmin) {
            const encryptedPassword = await hash(adminPassword);

            const adminUser = new User({
                username: "admin",
                email: adminEmail,
                password: encryptedPassword,
                role: "ADMIN_ROLE",
            });

            await adminUser.save();
            console.log("el admin se creo");
        } else {
            console.log("admin ya esta creado");
        }
    } catch (err) {
        console.error("error al crear admin pro defecto:", err);
    }
};

export const createDefaultCategory = async () => {
    try {
        const name = "general";
        const description = "categoria general";

        const existingCategory = await Category.findOne({ name });

        if (!existingCategory) {
            const newCategory = new Category({
                name,
                description,
            });

            await newCategory.save();
            console.log("categoria creada");
        } else {
            console.log("ya existe la categoria");
        }
    } catch (err) {
        console.error("error en categorias", err);
    }
};