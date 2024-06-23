import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// place user order for frontend
const placeOrder = async (req, res) => {
  const frontend_url = 'http://localhost:5173';
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: 'MAD',
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100 * 10,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: 'MAD',
        product_data: {
          name: 'Delivery charges',
        },
        unit_amount: 2 * 100 * 10,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: 'payment',
      success_url: `${frontend_url}/verify?Success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?Success=false&orderId=${newOrder._id}`,
    });
    res.json({ Success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ Success: true, message: 'Error' });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, Success } = req.body;
  try {
    if (Success == 'true') {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ Success: true, message: 'Paid' });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ Success: false, message: 'Not paid' });
    }
  } catch (error) {
    console.log(error);
    res.json({ Success: false, message: 'Error' });
  }
};
export { placeOrder, verifyOrder };
