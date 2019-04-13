const express = require('express'),
router = express.Router({mergeParams: true});

    //routes for: '/posts/:id/reviews'

/* GET reviews index. */
router.get('/', (req, res, next) => {
  res.send('/posts/:id/reviews');
});

/* POST reviews create. */
router.post('/', (req,res,next)=>{
    res.send('/posts/:id/reviews create');
});

/* GET reviews edit. */
router.get('/:review_id/edit', (req,res,next)=>{
    res.send('/posts/:id/reviews'+req.params.review_id+'/edit');
});

/* POST reviews update. */
router.put('/:review_id', (req,res,next)=>{
    res.send('/posts/:id/reviews'+req.params.review_id+ ' updates');
});

/* DELETE reviews delete. */
router.delete('/:review_id', (req,res,next)=>{
    res.send('/posts/:id/reviews'+req.params.review_id + ' delete');
});
module.exports = router;