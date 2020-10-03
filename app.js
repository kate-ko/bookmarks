require('dotenv').config({});
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const apiRoutes = require('./routes')
const port = process.env.PORT || 8080;

const { MONGO_URL } = process.env;
const mongoose = require('mongoose');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, function () {
  console.log("Running API on Port " + port);
})

//Use API routes in the App
app.use('/', apiRoutes)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//connect to mongoose
const options = { useNewUrlParser: true, useUnifiedTopology: true }
const mongo = mongoose.connect(MONGO_URL, options);

mongo.then(() => {
  console.log('connected to mongodb');
}, error => {
  console.log(error, 'error');
})

module.exports = app;
