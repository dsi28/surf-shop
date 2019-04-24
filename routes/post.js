const express = require('express'),
router = express.Router(),
multer = require('multer'),
 {storage} = require('../cloudinary'),
  upload = multer({storage}),
 {asyncErrorHandler,
  isUserLoggedIn,
  isPostAuthor} = require('../middleware'),
 {
    postIndex, 
    postNew, 
    postCreate,
    postShow,
    postEdit,
    postUpdate,
    postDelete
} = require('../controllers/post');

    //routes for: '/posts'

/* GET posts index. */
router.get('/', asyncErrorHandler(postIndex));

/* GET posts new. */
router.get('/new',isUserLoggedIn, postNew);

/* POST posts create. *///images is the type of file and 4 is the max number of file uploads
router.post('/', isUserLoggedIn, upload.array('images', 4), asyncErrorHandler(postCreate));

/* GET posts show. */ 
router.get('/:id', asyncErrorHandler(postShow));

/* GET posts edit. */
router.get('/:id/edit', isUserLoggedIn, asyncErrorHandler(isPostAuthor), postEdit);

/* POST posts update. */
router.put('/:id', isUserLoggedIn, asyncErrorHandler(isPostAuthor), upload.array('images', 4), asyncErrorHandler(postUpdate));

/* DELETE posts delete. */
router.delete('/:id', isUserLoggedIn, asyncErrorHandler(isPostAuthor), asyncErrorHandler(postDelete));
module.exports = router;