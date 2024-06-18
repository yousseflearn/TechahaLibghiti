import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ Success: false, message: 'User does not exist' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ Success: false, message: 'invalid credentials' });
    }
    const token = createToken(user._id);
    return res.json({ Success: true, token });
  } catch (error) {
    console.log(error);
    return res.json({ Success: false, message: 'Error' });
  }
};
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};
// register user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // checking existing email
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ Success: false, message: 'User already exists' });
    }
    // Validating Email Format & Strong Password
    if (!validator.isEmail(email)) {
      return res.json({
        Success: false,
        message: 'Please enter a validate Email',
      });
    }
    if (password.length < 8) {
      return res.json({
        Success: false,
        message: 'Please enter a strong password',
      });
    }
    // Hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //creation and save user in database
    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ Success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ Success: false, message: 'Error' });
  }
};

export { loginUser, registerUser };
