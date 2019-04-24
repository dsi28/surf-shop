const Review = require('../models/review'),
User = require('../models/user'),
Post = require('../models/post');

module.exports = {
    asyncErrorHandler: (fn)=>
        (req,res,next)=>{
            Promise.resolve(fn(req,res,next)).catch(next);
        },
    
    isReviewAuthor: async(req,res,next)=>{
        let review = await Review.findById(req.params.review_id);
        if(review.author.equals(req.user._id)){
            next();
        }else{
            res.redirect('back');
        }
    },

    isUserLoggedIn: (req,res,next)=>{
        if(req.isAuthenticated()){
            return next();
        }else{
            console.log('You need to be logged in..');
            req.session.redirectTo = req.originalUrl;//is the target page.
            res.redirect('/login');
        }
    },

    isPostAuthor: async(req,res,next)=>{
        const post = await Post.findById(req.params.id);
        if(post.author.equals(req.user._id)){
            res.locals.post = post;
            return next();
        }else{
            console.log('user is not post owner');
            res.redirect('back');
        }
    }
}