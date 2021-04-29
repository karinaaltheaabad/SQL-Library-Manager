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
  next(pageNotFound);
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.error = err; 
  res.status(res.error || 500);
  
  if (err.message === undefined) {
    message = "Oops! Something went wrong."
  }

  console.log(err.status + " " + err.message);
  res.render('error');
});

module.exports = app;
