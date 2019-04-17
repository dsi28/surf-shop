const Post = require('../models/post'),
cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUDNAME,
    api_key: process.env.CLOUDINARY_APIKEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

module.exports =  {
    
    //Posts index
    postIndex: async (req,res,next)=>{
        let posts = await Post.find({});
        res.render('posts/index', {posts: posts});    
    },

    //Post new
    postNew: (req,res,next)=>{
        res.render('posts/new');
    },

    //Posts create  //since upload middleware is in the routes/post/create route uploaded files can be handeled here with req.files (array)
    async postCreate (req,res,next){
        req.body.post.images=[];
        for (const file of req.files) {
            let image = await cloudinary.v2.uploader.upload(file.path);
            req.body.post.images.push({
                url: image.secure_url,
                public_id: image.public_id
            });
        }
        let post = await Post.create(req.body.post);
        res.redirect(`/posts/${post.id}`);
    },

    //Posts show
    async postShow(req,res,next){
        let post = await Post.findById(req.params.id);
        res.render('posts/show', {post:  post});
    },

    //Post edit
    async postEdit(req,res,next){
        let post = await Post.findById(req.params.id);
        res.render('posts/edit', {post: post});
    },

    //Post update
    async postUpdate(req,res,next){
        let post = await Post.findByIdAndUpdate(req.params.id, req.body.post);
        res.redirect(`/posts/${post.id}`);
    },

    //Post delete
    async postDelete(req,res,next){
        await Post.findByIdAndDelete(req.params.id);
        res.redirect('/posts');
    }
}