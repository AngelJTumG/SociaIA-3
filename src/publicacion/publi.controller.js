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
        const { limite = 5 ,desde = 0 } = req.query;    
        const query = { status: true };
 
        const publicacion = await Publicacion.find(query);
        
        const [total, Publicacion] = await Promise.all([
            Publicacion.countDocuments(query),
            Publicacion.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ]);

        return res.status(200).json({
            success: true,
            total,
            publicacion
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: 'Error al obtener las publicaciones',
            error: err.message
        });
    }
};

export const actualizarPublicacion = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const usuarioId = req.user._id;

        const publicacion = await Publicacion.findById(id);
        if (!publicacion) {
            return res.status(404).json({
                success: false,
                msg: 'Publicación no encontrada'
            });
        }

        if (publicacion.autor.toString() !== usuarioId.toString() && req.user.role !== 'ADMIN_ROLE') {
            return res.status(403).json({
                success: false,
                msg: 'No tienes permiso para actualizar esta publicación'
            });
        }

        const publicacionActualizada = await Publicacion.findByIdAndUpdate(id, { titulo, categoria, texto }, { new: true });

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

        if (publicacion.autor.toString() !== usuarioId.toString() && usuario.role !== 'ADMIN_ROLE') {
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