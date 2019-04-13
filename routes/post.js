const express = require('express'),
router = express.Router();

    //routes for: '/posts'

/* GET posts index. */
router.get('/', (req, res, next) => {
  res.send('/posts');
});

/* GET posts new. */
router.get('/new', (req,res,next)=>{
    res.send('/posts/new');
});

/* POST posts create. */
router.post('/', (req,res,next)=>{
    res.send('/posts create');
});

/* GET posts show. */
router.get('/:id', (req,res,next)=>{
    res.send('/'+req.params.id + ' show');
});

/* GET posts edit. */
router.get('/:id/edit', (req,res,next)=>{
    res.send('/'+req.params.id+'/edit');
});

/* POST posts update. */
router.put('/:id', (req,res,next)=>{
    res.send('/'+req.params.id+ ' updates');
});

/* DELETE posts delete. */
router.delete('/:id', (req,res,next)=>{
    res.send('/'+req.params.id + ' delete');
});
module.exports = router;