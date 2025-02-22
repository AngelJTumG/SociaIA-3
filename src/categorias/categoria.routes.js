import { Router } from 'express';
import { obtenerCategorias, crearCategoria, editarCategoria, eliminarCategoria } from './categoria.controller.js';
import { crearCategoriaValidator, editarCategoriaValidator, eliminarCategoriaValidator } from '../middlewares/categoria-validator.js';

const router = Router();

router.get('/categorias', obtenerCategorias);

router.post('/categorias', crearCategoriaValidator, crearCategoria);

router.put('/categorias/:cid', editarCategoriaValidator, editarCategoria);

router.delete('/categorias/:cid', eliminarCategoriaValidator, eliminarCategoria);

export default router;