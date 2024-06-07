import express from 'express';
import {
  addFood,
  listFood,
  removeFood,
} from '../controllers/foodController.js';
import multer from 'multer';

const foodRouter = express.Router();

//image storage engine
const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

//Post method route
foodRouter.post('/add', upload.single('image'), addFood);
// GET method route
foodRouter.get('/list', listFood);
//Post method route
foodRouter.post('/remove', removeFood);

export default foodRouter;
