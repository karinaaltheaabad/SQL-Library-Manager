var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var bookRouter = require('./routes/books');

var app = express();
var { sequelize } = require('./models');

(async () => {
  try {
    await sequelize.authenticate(); 
    console.log('Successfully connected to the database!');
  } catch (error) {
    console.log('Error connecting to the database');
  }
})();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', bookRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const pageNotFound = new Error();
  pageNotFound.status = 404; 
  message = "Oops! Page not found.";
  res.status(404).render('page-not-found');
});

// error handler
app.use(function(err, req, res, next) {
  if (err.status === 404) {
    res.status(404).render('page-not-found');
  } else {
    err.message = err.message || 'Oops, looks like something went wrong on the server!';
    res.status(err.status || 500 ).render('error', { error: err });
  }
});

module.exports = app;
