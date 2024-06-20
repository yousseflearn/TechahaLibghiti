import express from 'express';
import {
  addToCart,
  removeFromCart,
  getCart,
} from '../controllers/cartController.js';
import authMiddleware from '../middleware/auth.js';

const cartRouter = express.Router();

// add to cart using post method
// remove from cart using post method
cartRouter.post('/remove', authMiddleware, removeFromCart);
cartRouter.post('/add', authMiddleware, addToCart);
// get data cart using get method
cartRouter.post('/get', authMiddleware, getCart);

export default cartRouter;
