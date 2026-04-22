import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Product from './models/product.model.js';
import productRoutes from './routes/product.route.js';

dotenv.config();

const app = express();

// middleware (process that runs before sending a response back to client)
app.use(express.json()); // allow us to accept JSON data in request body

// routes
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    connectDB();
    console.log(`Server started at http://localhost:${PORT}`);
});