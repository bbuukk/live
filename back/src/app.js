import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { productsRoutes } from "./routes/product.routes.js";
import { categoryRoutes } from "./routes/category.routes.js";
import { userRoutes } from "./routes/user.routes.js";

import * as loggingMiddleware from "#src/middleware/logger.js";

import { mainLogger as ml } from "#src/utils/loggers.js"; // Adjust the path as needed

const app = express();

app.use(cors());
app.use(express.json());

app.use(loggingMiddleware.infoLogger);

app.use("/categories", categoryRoutes);
app.use("/products", productsRoutes);
app.use("/user", userRoutes);

app.use(loggingMiddleware.errorLogger);

// Error handling middleware
app.use((err, req, res, next) => {
  ml.error(err.stack);

  res.status(500).send("Something broke!");
});

export default app;
