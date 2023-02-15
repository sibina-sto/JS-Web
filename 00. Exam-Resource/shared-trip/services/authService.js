const User = require('../models/userModel');
const dotenv = require('dotenv');
const jwt = require('../lib/jsonwebtoken');
const AppError = require('../utils/AppError');

dotenv.config({ path: './config.env' });

const SECRET = process.env.JWT_SECRET;
const EXPIRES_IN = process.env.JWT_EXPIRES_IN;

const createAndSendToken = async (user) => {
  const payload = { email: user.email, _id: user._id, gender: user.gender };
  const token = await jwt.sign(payload, SECRET, { expiresIn: EXPIRES_IN });

  return token;
};

exports.getUserByEmail = (email) => User.findOne({ email });
exports.getUserById = (id) => User.findById(id);

exports.register = async (gender, email, password) => {
  const user = await User.create({ gender, email, password });
  return createAndSendToken(user);
};

exports.login = async (email, password) => {
  const user = await this.getUserByEmail(email);

  if (!user) {
    throw new AppError('Invalid Email or Password!', 401, { user });
  }

  const isValid = await user.validatePassword(password);
  if (!isValid) {
    throw new AppError('Invalid email or Password!', 401);
  }

  return createAndSendToken(user);
};
