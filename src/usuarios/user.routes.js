import { Router } from "express";
import { obtenerUsuarioPorId, obtenerUsuarios, actualizarContrasena, actualizarUsuario, actualizarFotoPerfil, } from "./user.controller.js";
import { getUserByIdValidator, updatePasswordValidator, updateUserValidator, updateProfilePictureValidator, } from "../middlewares/usuario-validator.js";

const router = Router();

router.get("/findUser/:uid", getUserByIdValidator, obtenerUsuarioPorId);
router.get("/", obtenerUsuarios);
router.put("/updatePassword/:uid", updatePasswordValidator, actualizarContrasena);
router.put("/updateUser/:uid", updateUserValidator, actualizarUsuario);
router.patch("/updateProfilePicture/:uid",updateProfilePictureValidator, actualizarFotoPerfil);

export default router;