const Post = require('../models/post'),
Review = require('../models/review');

module.exports =  {
    //Review create
    async reviewCreate (req,res,next){
        //find post
        let post = await Post.findById(req.params.id).populate('reviews').exec();
        let userCreatedReview = post.reviews.some((rev)=>{
            return rev.author.equals(req.user._id);
        });
        if(!userCreatedReview){
            //create review
            req.body.review.author = req.user._id;
            let review = await Review.create(req.body.review);
            //assign review to post
            post.reviews.push(review);
            post.save();
        }else{
            console.log('This user has already created a review...');
        }
        //redirect to post
        res.redirect(`/posts/${req.params.id}`);
    },

    //Review update
    async reviewUpdate(req,res,next){
        await Review.findByIdAndUpdate(req.params.review_id, req.body.review);
        res.redirect(`/posts/${req.params.id}`);
    },

    //Review delete
    async reviewDelete(req,res,next){
        let post = await Post.findById(req.params.id);
        let review = await Review.findByIdAndDelete(req.params.review_id);
        post.reviews = post.reviews.filter((rev)=>{
            if(!rev.equals(review._id)){
                return rev;
            } 
        });
        await post.save();
        await Review.findByIdAndDelete(req.params.review_id);
        res.redirect(`/posts/${req.params.id}`);
    }
}