const Trip = require('../models/tripModel');

exports.getAllTrips = async () => Trip.find().lean();

exports.create = async (data, user) => {
  data.owner = user._id;
  return await Trip.create({ ...data });
};

exports.edit = async (id, data) => {
  console.log(id);
  console.log(data);
  return await Trip.findByIdAndUpdate(id, { ...data }, { runValidators: true });
};

exports.getTripByID = async (tripId, lean, popOption, popOptionTwo) => {
  let trip = Trip.findById(tripId);
  if (lean) {
    lean = { lean };
    if ((lean = 'Yes')) {
      trip.lean();
    }
  }
  if (popOption) {
    trip = trip.populate(popOption);
  }
  if (popOptionTwo) {
    trip = trip.populate(popOptionTwo);
  }
  return await trip;
};

exports.deleteOne = async (id) => Trip.findByIdAndDelete(id);
