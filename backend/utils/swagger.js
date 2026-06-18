import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Flicksy API Documentation",
      version: "1.0.0",
      description: "API documentation for the Flicksy application",
    },
    servers: [
      {
        url: "/api/v1",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "jwt-flicksy",
        },
      },
    },
  },
  apis: ["./backend/routes/*.js"], // Corrected path relative to root
};

const specs = swaggerJsdoc(options);

export const setupSwagger = (app) => {
  app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(specs));
};
