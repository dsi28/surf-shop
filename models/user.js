const mongoose = require('mongoose'),
passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    image: {
        secure_url: { type: String, default: '/images/default-profile.jpg'},
        public_id: String
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);