import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Products.js';
import Material from './models/Material.js';
import Grade from './models/Grade.js';

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected for seeding'))
  .catch(err => console.log('MongoDB Connection Error:', err));

const seedDatabase = async () => {
  try {
    await Product.deleteMany({});
    await Material.deleteMany({});
    await Grade.deleteMany({});
    
    const products = [
      { name: 'Pipes' },
      { name: 'Tubing' },
      { name: 'Pipe Fittings' },
      { name: 'Forged Fittings' },
      { name: 'Flanges' },
      { name: 'Valves' },
      { name: 'Gaskets' },
      { name: 'Instrumentation Fittings' },
      { name: 'Sheet & Plates' },
      { name: 'Bars' },
      { name: 'Electrodes' },
      { name: 'Fasteners' },
      { name: 'Bolts' },
      { name: 'Channels' }
    ];
    
    const createdProducts = await Product.insertMany(products);
    console.log(`${createdProducts.length} products created`);
    
    
    const materials = [
      { name: 'Stainless Steel' },
      { name: 'Carbon Steel' },
      { name: 'Aluminium' },
      { name: 'Copper Nickel' },
      { name: 'Duplex Steel' },
      { name: 'Hastelloy' },
      { name: 'Incoloy' },
      { name: 'Inconel' },
      { name: 'Low Temperature Carbon Steel' },
      { name: 'Monel' },
      { name: 'Nickel Alloy' },
      { name: 'Super Duplex Steel' },
      { name: 'Titanium' }
    ];
    
    const createdMaterials = await Material.insertMany(materials);
    console.log(`${createdMaterials.length} materials created`);
    
    const grades = [
      { name: 'Aluminium', code: 'F11' },
      { name: 'Aluminium', code: 'F22' },
      { name: 'Aluminium', code: 'F5' },
      { name: 'Aluminium', code: 'F9' },
      { name: 'Aluminium', code: 'F91' },
      { name: 'Stainless Steel', code: '304' },
      { name: 'Stainless Steel', code: '316' },
      { name: 'Stainless Steel', code: '321' },
      { name: 'Carbon Steel', code: 'A105' },
      { name: 'Carbon Steel', code: 'A106' },
      { name: 'Duplex Steel', code: '2205' },
      { name: 'Hastelloy', code: 'C22' },
      { name: 'Incoloy', code: '800' },
      { name: 'Inconel', code: '600' },
      { name: 'Copper Nickel', code: '90/10' }
    ];
    
    const createdGrades = await Grade.insertMany(grades);
    console.log(`${createdGrades.length} grades created`);
    
    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();