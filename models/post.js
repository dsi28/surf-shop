const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: String,
    price: Number,
    desc: String,
    images: [ {url: String, public_id:String} ],
    location: String,
    lat: Number,
    lng: Number,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

module.exports = mongoose.model('Post', PostSchema);