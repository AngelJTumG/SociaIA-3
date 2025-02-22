import Category from './categoria.model.js';
import Publicacion from '../publicacion/publi.model.js';

const esAdmin = (rol) => rol === 'admin';

export const obtenerCategorias = async (req, res) => {
    if (!esAdmin(req.user.rol)) {
        return res.status(403).json({
            success: false,
            message: 'Acceso denegado'
        });
    }

    try {
        const { limite = 5, desde = 0 } = req.query;
        const query = { estado: true };

        const [total, categorias] = await Promise.all([
            Category.countDocuments(query),
            Category.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ]);

        return res.status(200).json({
            success: true,
            total,
            categorias
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener las categorías",
            error: err.message
        });
    }
};

export const crearCategoria = async (req, res) => {
    if (!esAdmin(req.user.rol)) {
        return res.status(403).json({
            success: false,
            message: 'Acceso denegado'
        });
    }

    try {
        const data = req.body;

        const nuevaCategoria = await Category.create(data);

        return res.status(201).json({
            success: true,
            message: 'Categoría creada',
            categoria: nuevaCategoria
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error al crear la categoría',
            error: err.message
        });
    }
};

export const editarCategoria = async (req, res) => {
    if (!esAdmin(req.user.rol)) {
        return res.status(403).json({
            success: false,
            message: 'Acceso denegado'
        });
    }

    try {
        const { cid } = req.params;
        const data = req.body;

        const categoria = await Category.findByIdAndUpdate(cid, data, { new: true });

        return res.status(200).json({
            success: true,
            message: 'Categoría actualizada',
            categoria
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error al actualizar la categoría',
            error: err.message
        });
    }
};

export const eliminarCategoria = async (req, res) => {
    if (!esAdmin(req.user.rol)) {
        return res.status(403).json({
            success: false,
            message: 'Acceso denegado'
        });
    }

    try {
        const { cid } = req.params;
        const categoria = await Category.findByIdAndUpdate(cid, { status: false }, { new: true });
        const categoriaPorDefecto = await Category.findOne({ nombre: 'anything' });

        const publicaciones = await Publicacion.find({ categoria: cid });

        await Promise.all(
            publicaciones.map(async (publicacion) => {
                publicacion.categoria = categoriaPorDefecto._id;
                return publicacion.save();
            })
        );

        return res.status(200).json({
            success: true,
            message: 'Categoría eliminada',
            categoria
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error al eliminar la categoría',
            error: err.message
        });
    }
};