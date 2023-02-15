const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please tell us your email'],
    lowercase: true,
    unique: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
    minlength: [10, 'Email must have more or equal then 10 characters'],
  },
  password: {
    type: String,
    required: [true, 'Please tell us your password'],
    minlength: [4, 'Password must have more or equal then 4 characters'],
  },
  gender: {
    type: String,
    required: [true, 'Please choose male or female'],
    enum: {
      values: ['male', 'female'],
      message: 'Gender methods are: male and female',
    },
  },
  history: {
    type: [mongoose.Types.ObjectId],
    default: [],
    ref: 'Trip',
  },
});

userSchema.pre('save', function (next) {
  bcrypt.hash(this.password, 10).then((hash) => {
    this.password = hash;

    next();
  });
});

userSchema.method('validatePassword', function (password) {
  return bcrypt.compare(password, this.password);
});

const User = mongoose.model('User', userSchema);

module.exports = User;
