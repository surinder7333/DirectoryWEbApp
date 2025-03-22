import express from 'express';
import {getAllProducts, addProduct, updateProduct} from '../controllers/productController.js';
const router = express.Router();

// Get all products
router.get('/', getAllProducts)

// Create a new product
router.post('/', addProduct)


// Update product count
router.patch('/update-count/:id', updateProduct);

export default router;