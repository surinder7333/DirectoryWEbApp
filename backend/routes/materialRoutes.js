import express from 'express';
import { createMaterial, getAllMaretials } from '../controllers/materialController.js';

const router = express.Router();

// Get all materials
router.get('/', getAllMaretials);

// Create a new material
router.post('/', createMaterial);

export default router;