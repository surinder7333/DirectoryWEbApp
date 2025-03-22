import express from 'express';
import { createNewGrade, getAllGrades } from '../controllers/gradeController.js';

const router = express.Router();

// Get all grades
router.get('/', getAllGrades);

// Create a new grade
router.post('/',  createNewGrade);

export default router;