const createError = require('http-errors'),
express = require('express'),
path = require('path'),
cookieParser = require('cookie-parser'),
logger = require('morgan'),
mongoose = require('mongoose'),
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
mongoose.connect('mongodb://localhost/surf-shop', { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', ()=>{
  console.log('Connected to db...');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app config
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//express-session config  MUST BE BEFORE PASSPORT! AFTER APP CONFIG!
app.use(session({
  secret: 'werwlk asldf 23lk13 kl',
  resave: false,
  saveUninitialized: true
}));

//passport   AFTER APP CONFIG  BEFORE SET ROUTES!
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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
