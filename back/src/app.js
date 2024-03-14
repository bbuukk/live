import express from "express";
import cors from "cors";

import { productsRoutes } from "./routes/product.js";
import { categoryRoutes } from "./routes/category.js";
import { userRoutes } from "./routes/user.js";

// -- deployment --
// import path from "path";
// import { fileURLToPath } from "url";
// -- deployment --

const app = express();

// app.use(express.json({ limit: "300mb" }));

app.use(cors());
app.use(express.json());

app.use("/categories", categoryRoutes);
app.use("/products", productsRoutes);
app.use("/user", userRoutes);

// -- deployment --
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// -- deployment --

export default app;
