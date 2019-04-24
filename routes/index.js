const express = require('express'),
router = express.Router(),
 { asyncErrorHandler,
  isUserLoggedIn,
  isValidPassword,
  changePassword } = require('../middleware'),
 { postRegister, 
  postLogin, 
  getLogout, 
  langingPage,
  getRegister,
  getLogin,
  getProfile,
  updateProfile} = require('../controllers/index'); //this links the controllers/index.js file to this route file
                                                      // any method from the controller file that is to be used here must be named inside of the { nameOfMethod }



  //routes for : '/'

/* GET home page. */
router.get('/', asyncErrorHandler(langingPage));

/* GET register. */
router.get('/register', getRegister);

/* POST register. */
router.post('/register', asyncErrorHandler(postRegister));

/* GET login. */
router.get('/login', getLogin);

/* POST login. */
router.post('/login', asyncErrorHandler(postLogin), postLogin);

/* GET logout. */
router.get('/logout', getLogout);

/* GET profile. */
router.get('/profile', isUserLoggedIn, asyncErrorHandler(getProfile));

/* PUT profile. */
router.put('/profile', 
        isUserLoggedIn,
        asyncErrorHandler(isValidPassword),
        asyncErrorHandler(changePassword),
        asyncErrorHandler(updateProfile));

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