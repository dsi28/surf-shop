const Post = require('../models/post'),
 {cloudinary} = require('../cloudinary'),
mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding'),
geocodingClient = mbxGeocoding({ accessToken: process.env.MAPBOX_SURF_SHOP_TOKEN });

module.exports =  {
    
    //Posts index
    postIndex: async (req,res,next)=>{
        //gets all post without paginate
        //let posts = await Post.find({});

        //gets postss with paginate
        let posts = await Post.paginate({}, {
            page: req.query.page || 1,
            limit: 10,
            sort: {'_id': -1}
        });
        res.render('posts/index', {posts: posts, mapBoxToken: process.env.MAPBOX_MAIN_TOKEN});    
    },

    //Post new
    postNew: (req,res,next)=>{
        res.render('posts/new');
    },

    //Posts create  //since upload middleware is in the routes/post/create route uploaded files can be handeled here with req.files (array)
    async postCreate (req,res,next){
        req.body.post.images=[];
        for (const file of req.files) {
            req.body.post.images.push({
                url: file.secure_url,
                public_id: file.public_id
            });
        }
        const response = await geocodingClient.forwardGeocode({ 
            query: req.body.post.location,
            limit: 1
        }).send();
        req.body.post.geometry = response.body.features[0].geometry;
        let post = new Post(req.body.post);
		post.properties.description = `<strong><a href="/posts/${post._id}">${post.title}</a></strong><p>${post.location}</p><p>${post.desc.substring(0, 20)}...</p>`;
		post.save();
        res.redirect(`/posts/${post.id}`);
    },

    //Posts show
    async postShow(req,res,next){
        let post = await Post.findById(req.params.id)
        .populate({
            path: 'reviews',
            options: {sort : {'_id': -1}},
            populate: {
                path: 'author',
                model: 'User'
            }
        });
        const floorRating = post.calculateAvgRating();
        res.render('posts/show', {
            post:  post, 
            MAPBOX_API_KEY : process.env.MAPBOX_MAIN_TOKEN,
            floorRating});
    },

    //Post edit
    async postEdit(req,res,next){
        let post = await Post.findById(req.params.id);
        res.render('posts/edit', {post: post});
    },

    //Post update
    async postUpdate(req,res,next){
        let post = await Post.findById(req.params.id);
        if(req.body.deleteImages && req.body.deleteImages.length){
            let deletedImages = req.body.deleteImages;
            for (const public_id of deletedImages) {
                await cloudinary.v2.uploader.destroy(public_id);
                post.images = post.images.filter((image)=>{
                    return image.public_id != public_id;
                });
            }
        }
        if(req.files){
            for (const file of req.files) {
                post.images.push({
                    url: file.secure_url,
                    public_id: file.public_id
                });
            }
        }
        //check if location was updated. coordinates will be updated
        if(req.body.post.location != post.location){
            const response = await geocodingClient.forwardGeocode({ 
                query: req.body.post.location,
                limit: 1
            }).send();
            post.geometry = response.body.features[0].geometry;
            post.location = req.body.post.location;
        }
        post.title = req.body.post.title;
        post.desc = req.body.post.desc;
        post.price = req.body.post.price;
        post.properties.description = `<strong><a href="/posts/${post._id}">${post.title}</a></strong><p>${post.location}</p><p>${post.desc.substring(0, 20)}...</p>`;
        post.save();
        res.redirect(`/posts/${post.id}`);
    },

    //Post delete
    async postDelete(req,res,next){
        let post = await Post.findById(req.params.id);
        if(post.images && post.images.length){
            for (const image of post.images) {
                await cloudinary.v2.uploader.destroy(image.public_id);
            }
        }
        await post.remove();
        res.redirect('/posts');
    }
}