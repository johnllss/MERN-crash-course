import express from 'express';
import mongoose from 'mongoose';
import Product from '../models/product.model.js';
import { createProduct, deleteProduct, getProducts, updateProduct } from '../controllers/product.controller.js';

const router = express.Router();

// get all products
router.get("/", getProducts);

// create product
router.post("/", createProduct);

//update a product
router.put("/:id", updateProduct);

// delete a product
router.delete("/:id", deleteProduct);

export default router;