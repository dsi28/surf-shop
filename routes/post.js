const express = require('express'),
router = express.Router(),
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

/* POST posts create. */
router.post('/', asyncErrorHandler(postCreate));

/* GET posts show. */
router.get('/:id', asyncErrorHandler(postShow));

/* GET posts edit. */
router.get('/:id/edit', asyncErrorHandler(postEdit));

/* POST posts update. */
router.put('/:id', asyncErrorHandler(postUpdate));

/* DELETE posts delete. */
router.delete('/:id', asyncErrorHandler(postDelete));
module.exports = router;