import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';

// app config
const app = express();
const port = 4000;

//middleware

app.use(express.json());
app.use(cors());

// Database connection

connectDB();

// GET method route
app.get('/', (req, res) => {
  res.send('API working');
});

app.listen(port, () => {
  console.log(`Server started at  http://localhost:${port}`);
});

///?
