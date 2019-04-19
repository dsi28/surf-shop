const Post = require('../models/post'),
Review = require('../models/review');

module.exports =  {
    //Review create
    async reviewCreate (req,res,next){
        //find post
        let post = await Post.findById(req.params.id);
        //create review
        req.body.review.author = req.user._id;
        let review = await Review.create(req.body.review);
        //assign review to post
        post.reviews.push(review);
        post.save();
        //redirect to post
        res.redirect(`/posts/${req.params.id}`);
    },

    //Review update
    async reviewUpdate(req,res,next){

    },

    //Review delete
    async reviewDelete(req,res,next){

    }
}