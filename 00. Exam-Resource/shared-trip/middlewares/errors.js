const errorController = require('../controllers/errorController');

module.exports = (err, req, res, next) => {
  errorController(err, req, res);
};
