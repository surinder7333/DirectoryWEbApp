import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js';
import materialRoutes from './routes/materialRoutes.js';
import gradeRoutes from './routes/gradeRoutes.js';
import productCombinationRoutes from './routes/productCombinationRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Connection Error:', err));

  

// Routes
app.use('/api/products', productRoutes);
app.use('/api/materials', materialRoutes);
app.use('/api/grades', gradeRoutes);
app.use('/api/product-combinations', productCombinationRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});