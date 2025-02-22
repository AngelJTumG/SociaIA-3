import Publicacion from "./publi.model.js";
import User from "../usuarios/users.model.js";

export const agregarPublicacion = async (req, res) => {
    try {
        const data = req.body;

        const nuevaPublicacion = await Publicacion.create(data);
        
        res.status(201).json({
            success: true,
            msg: 'Publicación agregada',
            publicacion: nuevaPublicacion,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error al agregar la publicación',
            error: err.message
        });
    }
};

export const obtenerPublicaciones = async (req, res) => {
    try {
        const publication = await Publicacion.find();
 
        return res.status(200).json({
            success: true,
            publication
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: 'Error al obtener las publicaciones',
            error: error.message
        });
    }
};

export const actualizarPublicacion = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const usuario = req.usuario;

        if (!usuario) {
            return res.status(401).json({
                success: false,
                msg: 'Usuario no autenticado'
            });
        }

        const publicacion = await Publicacion.findById(id);
        if (!publicacion) {
            return res.status(404).json({
                success: false,
                msg: 'Publicación no encontrada'
            });
        }

        if (publicacion.autor.toString() !== usuario._id.toString() && usuario.role !== 'ADMIN_ROLE') {
            return res.status(403).json({
                success: false,
                msg: 'No tienes permiso para actualizar esta publicación'
            });
        }

        const publicacionActualizada = await Publicacion.findByIdAndUpdate(id, data, { new: true });

        return res.status(200).json({
            success: true,
            msg: 'Publicación actualizada',
            publicacion: publicacionActualizada,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: 'Error al actualizar la publicación',
            error: err.message
        });
    }
};

export const eliminarPublicacion = async (req, res) => {
    try {
        const { id } = req.params;
        const usuarioId = req.user._id; 
        const usuario = await User.findById(usuarioId);

        const publicacion = await Publicacion.findById(id);

        if (!publicacion) {
            return res.status(404).json({
                success: false,
                msg: 'Publicación no encontrada'
            });
        }

        if (publicacion.autor.toString() !== usuarioId.toString()) {
            return res.status(403).json({
                success: false,
                msg: 'No tienes permiso para eliminar esta publicación'
            });
        }

        await Publicacion.findByIdAndUpdate(id, { status: false });
        await User.findByIdAndUpdate(publicacion.autor, { $pull: { publicaciones: id } });

        return res.status(200).json({
            success: true,
            msg: 'Publicación eliminada'
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: 'Error al eliminar la publicación',
            error: err.message
        });
    }
};