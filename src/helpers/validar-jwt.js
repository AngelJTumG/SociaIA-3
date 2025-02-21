import jwt from "jsonwebtoken";

export const validarJWT = (req, res, next) => {
    const token = req.header("x-token");
    try {
        const { uid } = jwt.verify(token, process.env.KEY);
        req.usuario = { _id: uid };
        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Token no válido",
            error: err.message
        });
    }

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "No hay token en la petición"
        });
    }

    
};