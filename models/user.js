const mongoose = require('mongoose'),
passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
    email: String,
    image: String,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);