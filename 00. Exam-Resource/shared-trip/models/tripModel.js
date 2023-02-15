const mongoose = require('mongoose');

const startUrl = /^(https?:\/)?\/.*/i;

const tripSchema = new mongoose.Schema({
  startPoint: {
    type: String,
    required: [true, 'Please tell us your start point'],
    minlength: [4, 'Start point must have more or equal then 4 characters'],
  },
  endPoint: {
    type: String,
    required: [true, 'Please tell us your end point'],
    minlength: [4, 'End point must have more or equal then 4 characters'],
  },
  date: {
    // type: Date,
    type: String,
    required: [true, 'Please tell us your date of travel'],
  },
  time: {
    type: String,
    required: [true, 'Please tell us your time of travel'],
  },
  img: {
    type: String,
    required: [true, 'Please send us your car image'],
    validate: {
      validator: (value) => startUrl.test(value),
      message: `Please add valid image URL`,
    },
  },
  brand: {
    type: String,
    required: [true, 'Please tell us your car brand'],
    minlength: [4, 'Car brand must have more or equal then 4 characters'],
  },
  seats: {
    type: Number,
    required: [true, 'Please tell us how many seats is your car'],
    min: [0, 'Seats must be between 0 and 4'],
    max: [4, 'Seats must be between 0 and 4'],
  },
  price: {
    type: Number,
    required: [true, 'Please tell us your trip price'],
    min: [1, 'Price must be between 1 and 50'],
    max: [50, 'Price must be between 1 and 50'],
  },
  description: {
    type: String,
    required: [true, 'Please tell us your description'],
    minlength: [10, 'Description must have more or equal then 10 characters'],
  },
  buddies: {
    type: [mongoose.Types.ObjectId],
    default: [],
    ref: 'User',
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    // required: true,
  },
});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;
