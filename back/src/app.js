import express from "express";
import cors from "cors";
import axios from "axios";
axios.defaults.baseURL = process.env.BASE_URL;

import { productsRoutes } from "./routes/product.js";
import { categoryRoutes } from "./routes/category.js";
import { userRoutes } from "./routes/user.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/categories", categoryRoutes);
app.use("/products", productsRoutes);
app.use("/user", userRoutes);

export default app;
