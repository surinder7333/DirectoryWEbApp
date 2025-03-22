import express from 'express'
import { bulkUpdateProductCombination, createProductCombination, getProductCombination, updateProductCombination } from '../controllers/productCombinationController.js';

const router = express.Router();

// Get all product combinations
router.get('/', getProductCombination);

// Create new product combinations
router.post('/', createProductCombination);

// Bulk update product combinations
router.patch('/bulk-update', bulkUpdateProductCombination);

// Update product combination details
router.patch('/:id', updateProductCombination);


export default router;
