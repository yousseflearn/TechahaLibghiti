import foodModel from '../models/foodModel.js';
import fs from 'fs';

// add food item
const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;
  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });
  try {
    await food.save();
    res.json({ Success: true, message: 'food added successfully!' });
  } catch (error) {
    console.log(error);
    res.json({ Success: false, message: 'Error' });
  }
};
// add foodList
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ Success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ Success: false, message: 'Error' });
  }
};

export { addFood, listFood };
