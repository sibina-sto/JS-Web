const dotenv = require('dotenv');
const jwt = require('../lib/jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const tripService = require('../services/tripService');

dotenv.config({ path: './config.env' });

const SECRET = process.env.JWT_SECRET;

exports.authentication = catchAsync(async (req, res, next) => {
  const token = req.cookies['auth'];

  if (token) {
    const decodedToken = await jwt.verify(token, SECRET);

    req.user = decodedToken;
    req.isAuthenticated = true;

    res.locals.email = decodedToken.email;
    res.locals.isAuthenticated = true;

    
  }
  next();
});

exports.isAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated) {
    return res.redirect('/user/login');
  }

  next();
};

exports.checkUser = catchAsync(async (req, res, next) => {
  const trip = await tripService.getTripByID(req.params.tripId);
  if(!trip) {
    return res.redirect('/404')
  }
 
  res.locals.owner = false;
  res.locals.isBought = false;
  res.locals.isSpace = 0;
  if (req.user) {
  if (trip.owner == req.user._id) {
    res.locals.owner = true;
  }
  if (trip.buddies.map((t) => t.toString()).includes(req.user._id.toString())) {
    res.locals.isBought = true;
  }
  const availableSpace = trip.seats;
  const currentSpace = trip.buddies.length;
  if (availableSpace - currentSpace > 0) {
    res.locals.isSpace = availableSpace - currentSpace;
  }} 

  next();
});
