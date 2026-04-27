import mongoose from "mongoose";
import Product from "../models/product.model.js"

const ensureDatabaseConnection = (res) => {
    if (mongoose.connection.readyState !== 1) {
        res.status(503).json({
            success: false,
            message: "Database is not connected. Check your MongoDB Atlas connection and IP access list.",
        });
        return false;
    }

    return true;
};

export const getProducts = async (req, res) => {
    if (!ensureDatabaseConnection(res)) return;

    try {
        const products = await Product.find({}); // empty object means find all products
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.log("Error in fetching products:", error.message);
        res.status(500).json({ success: false, message: "Server Error." });
    }
}

export const createProduct = async (req, res) => {
    if (!ensureDatabaseConnection(res)) return;

    const product = req.body;

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: "Please provide all fields." });
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error." });
    }
}

export const updateProduct = async (req, res) => {
    if (!ensureDatabaseConnection(res)) return;

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid product ID." });
    }

    const product = req.body;

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: "Please provide all fields." });
    }

    try {
        await Product.findByIdAndUpdate(id, product, { new: true}); //give updated object back in response
        res.status(200).json({ success: true, message: "Product updated." });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error." });
    }
}

export const deleteProduct = async (req, res) => {
    if (!ensureDatabaseConnection(res)) return;

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid product ID." });
    }

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product deleted." });
    } catch (error) {
        console.log("Error in deleting product:", error.message);
        res.status(500).json({ success: false, message: "Server Error." });
    }
}