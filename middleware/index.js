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
    }, 

    isValidPassword: async(req,res,next)=>{
        const {user} = await User.authenticate()(req.user.username, req.body.currentPassword);
        if(user){
            res.locals.user = user;
            next();
        }else{
            console.log('Incorrect current password!');
            return res.redirect('/profile');
        }
    },

    changePassword: async(req,res,next)=>{
        const { 
            newPassword,
            confirmPassword
        } = req.body;
        if(newPassword && !confirmPassword ||  !newPassword && confirmPassword){
            console.log('missing password');
            return res.redirect('/profile');
        }else if(newPassword && confirmPassword ){
            const {user} = res.locals;
            if(newPassword === confirmPassword){
                await user.setPassword(newPassword);
                next();
            }else{
                console.log('passwords do not match');
                return res.redirect('/profile');
            }
        }else{
            next();
        }
    }
}