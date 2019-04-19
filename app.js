require('dotenv').config();
const createError = require('http-errors'),
express = require('express'),
engine = require('ejs-mate'),
path = require('path'),
cookieParser = require('cookie-parser'),
logger = require('morgan'),
mongoose = require('mongoose'),
methodOverride = require('method-override'),
//routes
indexRouter = require('./routes/index'),
postRouter = require('./routes/post'),
reviewRouter = require('./routes/reviews'),
//models
User = require('./models/user'),
//passport
passport = require('passport'),
//session
session = require('express-session'),
app = express();

//db conncetion
mongoose.connect('mongodb://localhost/surf-shop', { useNewUrlParser: true }); //changed db url from surf-shop to surf-shop-mapbox while in mapbox branch
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', ()=>{
  console.log('Connected to db...');
});

// use ejs-locals for all ejs templates:
app.engine('ejs', engine); //before view engine set up
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//set up public assets directory
app.use(express.static('public'));
//app config
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // in order to use objects in form names set this value to true. ex) post[title] req.body.post
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

//express-session config  MUST BE BEFORE PASSPORT! AFTER APP CONFIG!
app.use(session({
  secret: 'werwlk asldf 23lk13 kl',
  resave: false,
  saveUninitialized: true
}));

//passport   AFTER APP CONFIG  BEFORE SET ROUTES!
  //intialize and session must be after express session config
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//set title middlware
app.use(function(req,res,next){
  res.locals.title ='Surf Shop';
  next();
});

//set routes
app.use('/', indexRouter);
app.use('/posts', postRouter);
app.use('/posts/:id/reviews', reviewRouter);

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

module.exports = app;
