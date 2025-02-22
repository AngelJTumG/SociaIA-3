import jwt from "jsonwebtoken";
import User from "../usuarios/users.model.js";

export const validarJWT = async (req, res, next) => {
    try {
        let token = req.body.token || req.query.token || req.headers["authorization"];

        if (!token) {
            return res.status(400).json({
                success: false,
                message: "No hay token en la petición"
            });
        }

        token = token.replace(/^Bearer\s+/, "");

        const { uid } = jwt.verify(token, process.env.KEY);

        const user = await User.findById(uid);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "El usuario no existe en la base de datos"
            });
        }

        if (user.status === false) {
            return res.status(400).json({
                success: false,
                message: "Usuario previamente desactivado"
            });
        }

        req.usuario = user;
        next();
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al validar el token",
            error: err.message
        });
    }
};