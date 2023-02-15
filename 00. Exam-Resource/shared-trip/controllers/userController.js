const User = require('../models/userModel');

exports.getLoginPage = async (req, res) => {
  res.render('login', {
    title: 'Login Page',
  });
};

exports.getRegisterPage = async (req, res) => {
  res.render('register', {
    title: 'Register Page',
  });
};

exports.getProfile = async (req, res) => {
  let historyTrips;
  let user = await User.findById(req.user).lean().populate({
    path: 'history',
    select: '-__v -owner -buddies -description -price -seats -brand -img',
  });
  if (user.history.length > 0) {
    historyTrips = user.history.map((el) => el);
  }

  res.render('profile', {
    title: 'Profile Page',
    user,
    historyTrips,
  });
};
