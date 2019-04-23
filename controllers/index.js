//this is the controller for the index routes
const User = require('../models/user'),
passport = require('passport'),
Post = require('../models/post');

//this makes is to that everything inside the object will be exported.
module.exports = {
    //GET /
    async langingPage(req,res,next){
        const posts = await Post.find({});
        res.render('index', {posts, mapBoxToken: process.env.MAPBOX_MAIN_TOKEN, title: 'Surf Shop - Home'});
    },

    //POST /register
    async postRegister(req,res,next){
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            image: req.body.image
        });
        await User.register(newUser, req.body.password);
        res.redirect('/');
    },

    // POST /login
    postLogin(req,res,next){
        passport.authenticate('local',  
            {
                successRedirect: '/',
                failureRedirect: '/login'
            })(req,res,next);
    },

    //GET /logout
    getLogout(req,res,next){
        req.logout();
        res.redirect('/');
    }
}