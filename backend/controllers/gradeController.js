import Grade from "../models/Grade.js";

export const getAllGrades = async (req, res) => {
  try {
    const grades = await Grade.find();
    res.json(grades);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const createNewGrade = async (req, res) => {
  try {
    const grade = new Grade({
      name: req.body.name,
      code: req.body.code
    });                      
    const newGrade = await grade.save();
    res.status(201).json(newGrade);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};