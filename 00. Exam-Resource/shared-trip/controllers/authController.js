const authService = require('../services/authService');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError('Please provide email and password', 401);
  }

  const token = await authService.login(email, password);

  res.cookie('auth', token, { httpOnly: true });

  res.redirect('/');
});

exports.register = catchAsync(async (req, res) => {

  const { email, password, repeatPassword, gender } = req.body;

  if (!email || !password || !repeatPassword || !gender) {
    throw new AppError('All fields are required', 401);
  }
  if (password !== repeatPassword) {
    throw new AppError('Passwords are not match', 401);
  }

  const token = await authService.register(gender, email, password);
  
  res.cookie('auth', token, { httpOnly: true });

  res.redirect('/');
});

exports.logout = (req, res) => {
  res.clearCookie('auth');

  res.redirect('/');
};
