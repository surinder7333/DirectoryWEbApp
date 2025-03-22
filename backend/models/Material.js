import mongoose from 'mongoose';

const materialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
}, { timestamps: true });

export default mongoose.model('Material', materialSchema);