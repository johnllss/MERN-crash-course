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
app.get("/api/health", (_req, res) => {
    res.status(200).json({ success: true, message: "API is running" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});

connectDB().then((conn) => {
    if (!conn) {
        console.log("MongoDB connection failed. API server is running, but database-backed routes may return errors until the connection works.");
    }
});