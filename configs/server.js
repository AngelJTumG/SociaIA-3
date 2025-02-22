"use strict";

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { dbConnection } from "./mongo.js";
import { createAdmin, createDefaultCategory } from "./default-admin.js";
import authRoutes from "../src/auth/auth.routes.js";
import userRoutes from "../src/usuarios/user.routes.js";
import publiRoutes from "../src/publicacion/publi.routes.js";
import apiLimiter from "../src/middlewares/rate-limit-validator.js";

const middlewares = (app) => {
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(cors());
    app.use(helmet());
    app.use(morgan("dev"));
    app.use(apiLimiter);
};

const conectarDB = async () => {
    try {
        await dbConnection();
        await createAdmin(); 
        await createDefaultCategory();
    } catch (err) {
        console.log(`Database connection failed: ${err}`);
        process.exit(1);
    }
};

const routes = (app) => {
    app.use("/socialIA/v1/auth", authRoutes);
    app.use("/socialIA/v1/user", userRoutes);
    app.use("/socialIA/v1/publicacion", publiRoutes);
};

export const initServer = () => {
    const app = express();
    try {
        middlewares(app);
        conectarDB();
        routes(app);
        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);
        });
    } catch (err) {
        console.log(`Server init failed: ${err}`);
    }
};