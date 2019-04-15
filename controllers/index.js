//this is the controller for the index routes
const User = require('../models/user');

//this makes is to that everything inside the object will be exported.
module.exports = {
    postRegister(req,res,next){
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            image: req.body.image
        });
        User.register(newUser, req.body.password, (err)=> {
          if (err) {
            console.log('error while user register!', err);
            return next(err);
          }
          console.log('user registered!');
          res.redirect('/');
      });


    }
}