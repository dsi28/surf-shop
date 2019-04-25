//this is the controller for the index routes
const User = require('../models/user'),
passport = require('passport'),
Post = require('../models/post'),
util = require('util'),
crypto = require('crypto'),
sgMail = require('@sendgrid/mail'),
 {cloudinary} = require('../cloudinary'),
 {deleteProfileImage} = require('../middleware');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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
            if(req.file){
                const { secure_url, public_id } = req.file;
                req.body.image = {
                    secure_url: secure_url,
                    public_id: public_id
                }
            }
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
            deleteProfileImage(req);
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
        if(req.file){
            if(user.image.public_id ){
                await cloudinary.v2.uploader.destroy(user.image.public_id);
            }
            console.log('WHAP');
            console.log(req.file);
            const { secure_url, public_id } = req.file;
            user.image = {
                secure_url: secure_url,
                public_id: public_id
            } 
        }
        await user.save();
        const login = util.promisify(req.login.bind(req));
        await login(user);
        console.log('profile has been updated');
        res.redirect('/profile');
    },

    getForgotPw(req,res,next){
        res.render('users/forgot');
    },

    async putForgotPassword(req,res,next){
        const token = await crypto.randomBytes(20).toString('hex');
        const user = await User.findOne({email: req.body.email});
        if(!user){
            console.log('No user with this email...');
            return res.redirect('/forgot-password');
        }
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now()+ 1200000;
        await user.save();
        const msg = {
            to: user.email,
            from: 'Surf Shop <dsi28@hotmail.com>',
            subject: 'Surf-Shop Password Reset',
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.
			Please click on the following link, or copy and paste it into your browser to complete the process:
			http://${req.headers.host}/reset/${user.resetPasswordToken}
			If you did not request this, please ignore this email and your password will remain unchanged.`.replace(/				/g, ''),
        }
        sgMail.send(msg);
        console.log('request email sent');
        res.redirect('/forgot-password');
    },

    async getReset(req,res,next){
        const user = await User.findOne({
            resetPasswordToken: req.params.token,
            resetPasswordExpires: { $gt: Date.now()}
        });
        if(!user){
            console.log('Password reset token or has expired');
            return res.redirect('/forgot-password');
        }
        res.render('users/reset', {token: req.params.token});
    },

    async putReset(req,res,next){
        const user = await User.findOne({
            resetPasswordToken: req.params.token,
            resetPasswordExpires: { $gt: Date.now()}
        });
        if(!user){
            console.log('Password reset token or has expired');
            return res.redirect('/forgot-password');
        }

        if(req.body.password === req.body.confirm){
            await user.setPassword(req.body.password);
            user.resetPasswordToken = null;
            user.resetPasswordExpires = null;
            await user.save();
            const login = util.promisify(req.login.bind(req));
            await login(user);
        } else{
            console.log('passwords do not match');
            return res.redirect(`/reset/${req.params.token}`);
        }
        const msg = {
            to: user.email,
            from: 'Surf Shop Admin <dsi28@hotmail.com>',
            subject: 'Surf Shop - Password Changed',
            text: `Hello,
                  This email is to confirm that the password for your account has just been changed.
                  If you did not make this change, please hit reply and notify us at once.`.replace(/		  	/g, '')
          };
          await sgMail.send(msg);
          console.log('Password successfully updated!');
          res.redirect('/');
    }
}