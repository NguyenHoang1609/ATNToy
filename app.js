var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var carRouter = require('./routes/car');
var doolRouter = require('./routes/doll');
var guitarRouter = require('./routes/guitar');
var modelRouter = require('./routes/model');

var app = express();


//import body-parser library (to get input from client)
var bodyParser = require('body-parser');
//config body-parser library
app.use(bodyParser.urlencoded({ extended: false }));

//Connect to DB
var mongoose = require('mongoose');
var uri = "mongodb+srv://dangtien:tien0813311399@cluster399.7mrbydg.mongodb.net/ATNToy";
mongoose.set('strictQuery', true);
mongoose.connect(uri)
.then( () => console.log("Connect to DB success!"))
.catch( (err) => console.log(err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/car', carRouter);
app.use('/doll', doolRouter);
app.use('/guitar', guitarRouter);
app.use('/model', modelRouter);

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
  res.render('error');
});

var hbs = require('hbs');
hbs.registerHelper('eq', function(a, b) {
  return a.toString() === b.toString();
});

//update port to deploy to Render cloud
app.listen(process.env.PORT || 3001);

module.exports = app;
