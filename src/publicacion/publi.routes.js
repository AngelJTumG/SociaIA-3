import { Router } from "express";
import { agregarPublicacion, obtenerPublicaciones, actualizarPublicacion, eliminarPublicacion } from "./publi.controller.js";
import { crearPublicacionValidator, editarPublicacionValidator, eliminarPublicacionValidator } from "../middlewares/publi-validators.js";

const router = Router();

router.post("/crearPublicacion", [crearPublicacionValidator], agregarPublicacion);
router.put("/editarPublicacion/:id", [editarPublicacionValidator], actualizarPublicacion);
router.delete("/eliminarPublicacion/:id", [eliminarPublicacionValidator], eliminarPublicacion);
router.get("/", obtenerPublicaciones);

export default router;