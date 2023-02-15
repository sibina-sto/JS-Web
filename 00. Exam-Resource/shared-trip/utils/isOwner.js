const isOwner = (user, trip) => {
  return trip.owner == user._id;
};

module.exports = isOwner;
