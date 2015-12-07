var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Event = mongoose.model('Event');
//var Comment = mongoose.model('Comment');
var passport = require('passport');
var User = mongoose.model('User');
var jwt = require('express-jwt');
//authentication middleware
var auth = jwt({
    secret: process.env.SECRET, userProperty: 'payload'
});
//route to register new user
router.post('/register', function(req, res, next){
    if(!req.body.username || !req.body.password){
        return res.status(400).json({message: 'Please fill out all fields'});
    }
    var user = new User();
    user.username = req.body.username;
    user.setPassword(req.body.password)
    user.save(function (err){
    if(err){ return next(err); }
        return res.json({
            token: user.generateJWT()
        });
    });
});
//login route
router.post('/login', function(req, res, next){
    if(!req.body.username || !req.body.password){
        return res.status(400).json({message: 'Please fill out all fields'});
    }
    passport.authenticate('local', function(err, user, info){
        if(err){ return next(err); }
        if(user){
            return res.json({
                token: user.generateJWT()
            });
        } else {
            return res.status(401).json(info);
        }
    })(req, res, next);
});

//route to get all posts
router.get('/events', function(req, res, next) {
    Event.find(function(err, events){
        if(err){
            return next(err);
        }
        res.json(events);
    });
});
//route to post a post!
/*
router.post('/posts', auth, function(req, res, next) {
    var post = new Post(req.body);
    post.author = req.payload.username;
    post.save(function(err, post){
        if(err){
            return next(err);
        }
        res.json(post);
    });
});
//post param
router.param('post', function(req, res, next, id) {
    var query = Post.findById(id);
    query.exec(function (err, post){
        if (err) {
            return next(err);
        }
        if (!post) {
            return next(new Error('can\'t find post'));
        }
        req.post = post;
        return next();
    });
});
//get post with param id
router.get('/posts/:post', function(req, res, next) {
    req.post.populate('comments', function(err, post) {
        if (err) {
            return next(err);
        }
        res.json(post);
    });
});
//route to update post
router.put('/posts/:post', function(req, res, next) {
    req.post.postBody = req.body.postBody;
    req.post.save(function(err, post) {
        if (err) {
            return next(err);
        }
        res.json(post);
    });
});
//post upvote w/ put
router.put('/posts/:post/upvote', auth, function(req, res, next) {
    req.post.upvote(req.payload.username, function(err, post){
        if (err) {
            return next(err);
        }
        if(post === 'ERROR'){
            res.status(400).json({message: 'You cannot vote on this...'});
        }else{
            res.json(post);
        }


    });
});
/*
COMMENTS SECTION
*/
//post comment
/*router.post('/posts/:post/comments', auth, function(req, res, next) {
    var comment = new Comment(req.body);
    comment.post = req.post;
    comment.author = req.payload.username;
    comment.save(function(err, comment){
        if(err){
            return next(err);
        }
        req.post.comments.push(comment);
        req.post.save(function(err, post) {
            if(err){
                return next(err);
            }
            res.json(comment);
        });
    });
});
//comment param
router.param('comment', function(req, res, next, id) {
    var query = Comment.findById(id);
    query.exec(function (err, comment){
        if (err) {
            return next(err);
        }
        if (!comment) {
            return next(new Error('can\'t find comment'));
        }
        req.comment = comment;
        return next();
    });
});
//post comment upvote
router.put('/posts/:post/comments/:comment/upvote', auth, function(req, res, next) {
    req.comment.upvote(req.payload.username, function(err, comment){
        if (err) {
            return next(err);
        }
        if(comment === 'ERROR'){
            res.status(400).json({message: 'You cannot vote on this...'});
        }else{
            res.json(comment);
        }
    });
});
*/
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

module.exports = router;
