import Material from "../models/Material.js";

export const getAllMaretials = async (req, res) => {
  try {
    const materials = await Material.find();
    res.json(materials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createMaterial = async (req, res) => {
  try {
    const material = new Material(req.body);
    const createdMaterial = await material.save();
    res.json(createdMaterial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
