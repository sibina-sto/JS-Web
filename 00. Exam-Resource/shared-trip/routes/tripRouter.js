const router = require('express').Router();
const tripController = require('../controllers/tripController');
const authMiddleware = require('../middlewares/authMiddleware');

router.route('/offers').get(tripController.getAllTrips);

router
  .route('/create')
  .get(authMiddleware.isAuthenticated, tripController.getCreate)
  .post(tripController.postCreate);

router.route('/:tripId/details').get(authMiddleware.checkUser, tripController.getDetails);

router
  .route('/:tripId/edit')
  .get(authMiddleware.isAuthenticated, authMiddleware.checkUser, tripController.getEdit)
  .post(tripController.postEdit);

router
  .route('/:tripId/delete')
  .get(authMiddleware.isAuthenticated, authMiddleware.checkUser, tripController.getDelete);

router
  .route('/:tripId/buy')
  .get(authMiddleware.isAuthenticated, authMiddleware.checkUser, tripController.getBuy);

module.exports = router;
