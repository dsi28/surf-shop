//this is the controller for the index routes
const User = require('../models/user'),
passport = require('passport'),
Post = require('../models/post'),
util = require('util');

//this makes is to that everything inside the object will be exported.
module.exports = {
    //GET /
    async langingPage(req,res,next){
        const posts = await Post.find({});
        res.render('index', {posts, mapBoxToken: process.env.MAPBOX_MAIN_TOKEN, title: 'Surf Shop - Home'});
    },

    //GET /register
    getRegister(req,res,next){
        res.render('register', {tittle: 'Register'});
    },

    //POST /register
    async postRegister(req,res,next){
        try{
            const user = await User.register(new User(req.body), req.body.password);
            req.login(user, (err)=>{
                if(err){
                    console.log(err);
                    return next(err);
                }else{
                    res.redirect('/');
                }
            });
        }catch(err){
            const { username, email} = req.body;
            let error = err.message;
            if(error.includes('duplicate') && error.includes('index: email_1 dub key')){
                error = `A user with the given email is already registered`;
            }
            res.render('register', {title: 'Register', username, email, error});
        }
    },

    //GET /login
    getLogin(req,res,next){
        if(req.isAuthenticated()){
           return res.redirect('/'); 
        }if(req.query.returnTo){
            req.session.redirectTo = req.headers.referer;
        }else{
            res.render('login', {title: 'Login'});
        }
    },

    // POST /login
    async postLogin(req,res,next){
        const {username, password} = req.body;
        const {user, err} = await User.authenticate()(username, password);
        if(!user){
            console.log('password or user incorrect');
            return res.redirect('/login');
        }
        if(err){
            console.log(err);
            return next(err);
        }else{
            req.login(user,(err)=>{
                if(err){
                    console.log(err);
                    return next(err);
                }else{
                    const redirectUrl = req.session.redirectTo || '/';
                    delete req.session.redirectTo;
                    res.redirect(redirectUrl);
                }
            })
        }
    },

    //GET /logout
    getLogout(req,res,next){
        req.logout();
        res.redirect('/');
    },

    async getProfile(req,res,next){
        const posts = await Post.find()
                    .where('author')
                    .equals(req.user._id)
                    .limit(10)
                    .exec();
        res.render('profile', {posts});
    },

    async updateProfile(req,res,next){
        const {
            email,
            username
        } = req.body,
        {user} = res.locals;
        if(username){
            user.username = username;
        }
        if(email){
            user.email = email;
        }
        await user.save();
        const login = util.promisify(req.login.bind(req));
        await login(user);
        console.log('profile has been updated');
        next();
    }
}