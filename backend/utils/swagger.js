import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import path from "path";

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
        description: "Relative server",
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
  apis: [
    path.join(process.cwd(), "backend/routes/*.js"), 
    path.join(process.cwd(), "routes/*.js"),
    "./routes/*.js",
    "./backend/routes/*.js"
  ], 
};

const specs = swaggerJsdoc(options);

export const setupSwagger = (app) => {
  const swaggerOptions = {
    customCssUrl: "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css",
    customJs: [
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js",
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js",
    ],
  };
  app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(specs, swaggerOptions));
};
