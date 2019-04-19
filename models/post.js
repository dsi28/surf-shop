const mongoose = require('mongoose'),
Review = require('./review');

const PostSchema = new mongoose.Schema({
    title: String,
    price: Number,
    desc: String,
    images: [ {url: String, public_id:String} ],
    location: String,
    coordinates:Array,
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

PostSchema.pre('remove', async function(){
    await Review.remove({
        _id:{
            $in: this.reviews
        }
    });
});

module.exports = mongoose.model('Post', PostSchema);