var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


//for passport and facebook login
var passport = require('passport');
var util   = require('util');
var session = require('express-session');
var methodOverride = require('method-override');
var FacebookStrategy = require('passport-facebook').Strategy;
var routes = require('./routes/index');
var users = require('./routes/users');

var FACEBOOK_APP_ID = "746384685491650";
var FACEBOOK_APP_SEC = "d4464b1433f49f3212beffc48d3b31e5";

passport.serializeUser(function(user,done){
  done(null,user);
});
passport.deserializeUser(function(obj,done) {
  done(null,obj);
});
passport.use(new FacebookStrategy({
  clientID :FACEBOOK_APP_ID,
  clientSecret : FACEBOOK_APP_SEC,
  callbackURL:"http://localhost:3000/auth/facebook/callback"
},function(accessToken, refreshToken,profile,done){
  process.nextTick(function(){
    return done(null,profile);
  });
}));

var app = express();

// for MongoDB control
var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var userSchema = new Schema({
  name:String,
  username :{type:String,required:true,unique:true},
  password :{type:String,required:true},
  admin:Boolean,
  location: String,
  meta:{
    age:Number,
    website:String
  },
  created_at:Date,
  updated_at:Date
});
var User = mongoose.model('User',userSchema);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//mongoose.connect('mongodb://localhost/myappdatabase');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
//app.use(express.bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
