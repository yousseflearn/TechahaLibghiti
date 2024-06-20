import userModel from '../models/userModel.js';

// Add items to user cart
const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findOne({ _id: req.body.userId });
    let cartData = await userData.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    return res.json({ Success: true, message: 'Food is added to cart' });
  } catch (error) {
    console.log(error);
    return res.json({ Success: false, message: 'Error' });
  }
};

// Remove items  from user cart
const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    return res.json({ Success: true, message: 'removed from cart' });
  } catch (error) {
    console.log(error);
    res.json({ Success: false, message: 'Error' });
  }
};

//Fetch user cart data
const getCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    return res.json({ Success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ Success: false, message: 'Error' });
  }
};

export { addToCart, removeFromCart, getCart };
