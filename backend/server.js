import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';

dotenv.config();

const app = express();

// middleware (process that runs before sending a response back to client)
app.use(express.json()); // allow us to accept JSON data in request body

// routes
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server started at http://localhost:${PORT}`);
    });
};

startServer();
