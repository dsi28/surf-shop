//this is the controller for the index routes
const User = require('../models/user');

//this makes is to that everything inside the object will be exported.
module.exports = {
    async postRegister(req,res,next){
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            image: req.body.image
        });
        
        await User.register(newUser, req.body.password);
        res.redirect('/');
    }
}