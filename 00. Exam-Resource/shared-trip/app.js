const express = require('express');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');

const authMiddleware = require('./middlewares/authMiddleware');
const errors = require('./middlewares/errors');
const homeRouter = require('./routes/homeRouter');
const userRouter = require('./routes/userRouter');
const tripRouter = require('./routes/tripRouter');

const app = express();

app.engine(
  'hbs',
  handlebars.engine({
    extname: 'hbs',
  })
);
app.set('view engine', 'hbs');
app.set('views', './views');

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(authMiddleware.authentication);
app.use('/', homeRouter);
app.use('/user', userRouter);
app.use('/trips', tripRouter);
app.use('*', (req, res) => res.redirect('/404'));
app.use(errors);

module.exports = app;
