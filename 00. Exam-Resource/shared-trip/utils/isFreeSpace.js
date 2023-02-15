const isFreeSpace = (trip) => {
  const availableSpace = trip.seats;
  const currentSpace = trip.buddies.length;
  if (availableSpace - currentSpace > 0) {
    return availableSpace - currentSpace;
  }
};

module.exports = isFreeSpace;
