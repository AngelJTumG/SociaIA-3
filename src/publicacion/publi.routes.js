import { Router } from "express";
import { agregarPublicacion, obtenerPublicacionPorId, obtenerPublicaciones, actualizarPublicacion, eliminarPublicacion } from "./publi.controller.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { crearPublicacionValidator, editarPublicacionValidator, eliminarPublicacionValidator } from "../middlewares/publi-validators.js";

const router = Router();

router.post("/crearPublicacion", [validarJWT, crearPublicacionValidator], agregarPublicacion);
router.put("/editarPublicacion/:id", [validarJWT, editarPublicacionValidator], actualizarPublicacion);
router.delete("/eliminarPublicacion/:id", [validarJWT, eliminarPublicacionValidator], eliminarPublicacion);
router.get("/", obtenerPublicaciones);
router.get("/:id", obtenerPublicacionPorId);

export default router;