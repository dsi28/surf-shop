const express = require('express'),
router = express.Router({mergeParams: true}),
 {asyncErrorHandler, isReviewAuthor} = require('../middleware'),
 {
    reviewCreate,
    reviewUpdate,
    reviewDelete
 } = require('../controllers/reviews');
 
    //routes for: '/posts/:id/reviews'

/* POST reviews create. */
router.post('/', asyncErrorHandler(reviewCreate));

/* POST reviews update. */
router.put('/:review_id', asyncErrorHandler(isReviewAuthor), asyncErrorHandler(reviewUpdate));

/* DELETE reviews delete. */
router.delete('/:review_id', asyncErrorHandler(isReviewAuthor), asyncErrorHandler(reviewDelete));

module.exports = router;