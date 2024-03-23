import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import Stripe from "stripe";

import { productsRoutes } from "./routes/product.js";
import { categoryRoutes } from "./routes/category.js";
import { userRoutes } from "./routes/user.js";

const app = express();
const stripe = new Stripe(process.env.SECRET_KEY)

app.use(cors({
    origin: "http://localhost:3000"
}));
app.use(express.json());

app.use("/categories", categoryRoutes);
app.use("/products", productsRoutes);
app.use("/user", userRoutes);

//test payment

const storeItems = new Map([
    [1, {price: 20000, name: "Item 1"}],
    [2, {price: 10000, name: "Item 2"}]
])
app.post("/create-checkout-session", async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: req.body.items.map(item => {
                const storeItem = storeItems.get(item.id)
                return {
                    price_data: {
                        currency: 'uah',
                        product_data: {
                            name: storeItem.name
                        },
                        unit_amount: storeItem.price
                    },
                    quantity: item.quantity
                }
            }),
            success_url:`${process.env.SERVER_URL}/success.html`,
            cancel_url:`${process.env.SERVER_URL}/cancel.html`
        })
        res.json({ url: session.url })
    }catch (e) {
        res.status(500).json({ error: e.message })
    }

})

export default app;
