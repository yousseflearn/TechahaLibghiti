import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import { addFood } from './controllers/foodController.js';
import multer from 'multer';

// app config
const app = express();
const port = 4000;

//middleware

app.use(express.json());
app.use(cors());

// Database connection

connectDB();

//API endPoints
app.use('/api/food', foodRouter);
app.use('/images', express.static('uploads'));

// GET method route
app.get('/', (req, res) => {
  res.send('API working');
});

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

app.listen(port, () => {
  console.log(`Server started at  http://localhost:${port}`);
});
