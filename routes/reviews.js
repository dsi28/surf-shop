const express = require('express'),
router = express.Router({mergeParams: true}),
 {asyncErrorHandler} = require('../middleware'),
 {
    reviewCreate,
    reviewUpdate,
    reviewDelete
 } = require('../controllers/reviews');
 
    //routes for: '/posts/:id/reviews'

/* POST reviews create. */
router.post('/', asyncErrorHandler(reviewCreate));

/* POST reviews update. */
router.put('/:review_id', (req,res,next)=>{
    res.send('/posts/:id/reviews'+req.params.review_id+ ' updates');
});

/* DELETE reviews delete. */
router.delete('/:review_id', (req,res,next)=>{
    res.send('/posts/:id/reviews'+req.params.review_id + ' delete');
});
module.exports = router;