import { body } from 'express-validator';
import { hasRoles } from '../helpers/db-validators.js';
import { validarCampos } from './validate-campos.js';
import { handleErrors } from './haddle-error.js';
import { validarJWT } from "../helpers/validar-jwt.js"

export const crearCategoriaValidator = [
    validarJWT,
    hasRoles('admin'),
    body("nombre").notEmpty().withMessage('El nombre es requerido'),
    body("nombre").custom(categoryExist),
    validarCampos,
    handleErrors
];

export const editarCategoriaValidator = [
    validarJWT,
    hasRoles('admin'),
    body("nombre").custom(categoryExist),
    validarCampos,
    handleErrors
];

export const eliminarCategoriaValidator = [
    validarJWT,
    hasRoles('admin'),
    validarCampos,
    handleErrors
];