import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Gestor de opiniones API",
            version: "1.0.0",
            description: "SocialIA",
            contact: {
                name: "Angel",
                email: "atum-2023017@kinal.edu.gt"
            }
        },
        servers: [
            {
                url: "http://127.0.0.1:3001/socialIA/v1"
            }
        ]
    },
    apis: [
        "./src/auth/auth.routes.js",
        "./src/usuarios/user.routes.js",
        "./src/categorias/categoria.routes.js",
        "./src/publicacion/publi.routes.js"
    ]
};

const swaggerDocs = swaggerJSDoc(options);

export { swaggerDocs, swaggerUi };