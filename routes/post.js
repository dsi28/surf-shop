const express = require('express'),
router = express.Router(),
multer = require('multer'),
 {storage} = require('../cloudinary'),
  upload = multer({storage}),
 {asyncErrorHandler} = require('../middleware'),
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
router.get('/new', postNew);

/* POST posts create. *///images is the type of file and 4 is the max number of file uploads
router.post('/', upload.array('images', 4), asyncErrorHandler(postCreate));

/* GET posts show. */ 
router.get('/:id', asyncErrorHandler(postShow));

/* GET posts edit. */
router.get('/:id/edit', asyncErrorHandler(postEdit));

/* POST posts update. */
router.put('/:id', upload.array('images', 4), asyncErrorHandler(postUpdate));

/* DELETE posts delete. */
router.delete('/:id', asyncErrorHandler(postDelete));
module.exports = router;