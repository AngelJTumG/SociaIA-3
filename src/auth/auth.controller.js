import { hash, verify } from "argon2"
import User from "../usuarios/users.model.js"
import { generateJWT } from "../helpers/generate-jwt.js";

export const register = async (req, res) => {
    try {
        const data = req.body;
        let profilePicture = req.file ? req.file.filename : null;
        const encryptedPassword = await hash(data.password)
        data.password = encryptedPassword
        data.profilePicture = profilePicture

        const user = await User.create(data);

        return res.status(201).json({
            message: "El usuario ha sido creado",
            name: user.name,
            email: user.email
        });
    } catch (err) {
        console.error("Error al registrar el usuario:", err);
        return res.status(500).json({
            message: "Error al registrar el usuario",
            error: err.message
        });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        console.log('Buscando usuario');
        const usuario = await User.findOne({ email: email });
        console.log(usuario)
        console.log('Usuario encontrado:', usuario);

        if (!usuario) {
            return res.status(400).json({
                message: "Credenciales inválidas",
                error: "No existe el cliente con el correo ingresado"
            });
        }

        console.log('Verificando contraseña');
        const validPassword = await verify(usuario.password, password);

        if (!validPassword) {
            return res.status(400).json({
                message: "Credenciales inválidas",
                error: "Contraseña incorrecta"
            });
        }

        console.log('Generando token');
        const token = await generateJWT(usuario.id);

        return res.status(200).json({
            message: "Inicio de sesión exitoso",
            userDetails: {
                token: token,
                profilePicture: usuario.profilePicture
            }
        });
    } catch (err) {
        console.log('Error:', err); 
        return res.status(500).json({
            message: "Inicio de sesión fallido, error del servidor",
            error: err.message
        });
    }
}