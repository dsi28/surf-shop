const Post = require('../models/post');

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

    //Posts create
    async postCreate (req,res,next){
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