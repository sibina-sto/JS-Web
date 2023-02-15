const tripService = require('../services/tripService');
const catchAsync = require('../utils/catchAsync');
const authService = require('../services/authService');

exports.getCreate = async (req, res) => {
  res.render('trip-create', {
    title: 'Create Offer Page',
  });
};

exports.postCreate = catchAsync(async (req, res) => {
  await tripService.create(req.body, req.user);
  res.redirect('/trips/offers');
});

exports.getAllTrips = async (req, res) => {
  const trips = await tripService.getAllTrips();

  res.render('shared-trips', {
    title: 'Shared Trips Page',
    trips,
  });
};

exports.getDetails = async (req, res, next) => {
  const data = await tripService.getTripByID(
    req.params.tripId,
    { lean: 'Yes' },
    { path: 'owner', select: 'email' },
    { path: 'buddies', select: 'email' }
  );
  let buddies;

  if (!data) {
    return res.redirect('/404');
  }

  if (req.user) {
    if (data.buddies.length > 0) {
      buddies = data.buddies.map((el) => el.email).join(', ');
    }
  }
  res.render('trip-details', { data, buddies });
};

exports.getEdit = async (req, res) => {
  const data = await tripService.getTripByID(req.params.tripId, {
    lean: 'Yes',
  });

  console.log(res.locals);
  if (!data) {
    return res.redirect('/404');
  }
  console.log(req.user);
  if (!res.locals.owner) {
    return res.redirect('/404');
  }

  res.render('trip-edit', { title: 'Edit Page', data });
};

exports.postEdit = catchAsync(async (req, res) => {
  await tripService.edit(req.params.tripId, req.body);
  res.redirect(`/trips/${req.params.tripId}/details`);
});

exports.getDelete = async (req, res) => {
  if (!res.locals.owner) {
    return res.redirect('/404');
  }
  await tripService.deleteOne(req.params.tripId);

  res.redirect('/trips/offers');
};

exports.getBuy = async (req, res) => {
  let trip = await tripService.getTripByID(req.params.tripId);
  let user = await authService.getUserById(req.user._id);

  if (res.locals.owner) {
    return res.redirect('/404');
  }
  if (res.locals.isBought) {
    return res.redirect('/404');
  }

  trip.buddies.push(req.user._id);
  await trip.save();
  user.history.push(trip._id);
  await user.save();
  res.redirect(`/trips/${req.params.tripId}/details`);
};
