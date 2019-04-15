const express = require('express'),
router = express.Router(),
 { postRegister } = require('../controllers/index'); //this links the controllers/index.js file to this route file
                                                      // any method from the controller file that is to be used here must be named inside of the { nameOfMethod }



  //routes for : '/'

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Surf Shop - Home' });
});

/* GET register. */
router.get('/register', (req, res, next) => {
  res.send('GET register');
});

/* POST register. */
router.post('/register', postRegister);

/* GET login. */
router.get('/login', (req, res, next) => {
  res.send('GET login');
});

/* POST login. */
router.post('/login', (req, res, next) => {
  res.send('POST login');
});

/* GET profile. */
router.get('/profile', (req, res, next) => {
  res.send('GET profile');
});

/* PUT profile. */
router.put('/profile/:user_id', (req, res, next) => {
  res.send('PUT profile');
});

/* GET forgot-password. */
router.get('/forgot', (req, res, next) => {
  res.send('GET forgot');
});

/* PUT forgot-password. //addes token to user */
router.put('/forgot', (req, res, next) => {
  res.send('PUT forgot');
});

/* GET reset-password. */
router.get('/reset/:token', (req, res, next) => {
  res.send('GET reset/:token');
});

/* PUT reset-password. //addes token to user */
router.put('/reset/:token', (req, res, next) => {
  res.send('PUT reset/:token');
});

module.exports = router;