const mongoose = require('mongoose'),
Review = require('./review'),
mongoosePaginate = require('mongoose-paginate');

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
    ],
    avgRating: {type: Number, default:0}
});

PostSchema.pre('remove', async function(){
    await Review.remove({
        _id:{
            $in: this.reviews
        }
    });
});

//instance method
PostSchema.methods.calculateAvgRating = function(){
    let ratingsTotal= 0;
    if(this.reviews.length){
        this.reviews.forEach(review =>{
            ratingsTotal += review.rating;
        });
        this.avgRating = Math.round((ratingsTotal/ this.reviews.length)*10)/10;
    }else{
        this.avgRating = ratingsTotal;
    }
    const floorRating = Math.floor(this.avgRating);
    this.save();
    return floorRating;
}

PostSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Post', PostSchema);