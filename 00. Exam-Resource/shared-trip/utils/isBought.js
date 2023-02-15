const isBought = (user, trip) => {
  return trip.buddies.includes(user._id);
};

module.exports = isBought;
