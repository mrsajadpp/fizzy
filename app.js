var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let handlebars = require('express-handlebars');
let session = require('express-session');
let fileUpload = require('express-fileupload');
let favicon = require("serve-favicon");

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views/pages'));
app.use(favicon(path.join(__dirname, 'public', '/images/favicon.png')));
app.engine('hbs', handlebars.engine({ extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/', partialsDir: __dirname + '/views/partials/' }));
app.use(session({ secret:"@tric@fizzy@#]$" }));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { title: err.status || 500, description: err.message || 'Internal server error.', status: err.status || 500, message: err.message || 'Internal Server Error', user: req.session.user });
});

module.exports = app;
