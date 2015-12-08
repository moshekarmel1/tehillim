var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Event = mongoose.model('Event');
var Assignment = mongoose.model('Assignment');
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
    user.setPassword(req.body.password);
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
router.get('/browse', function(req, res, next) {
    Event.find(function(err, events){
        if(err){
            return next(err);
        }
        res.json(events);
    });
});
//route to post a post!
router.post('/browse', auth, function(req, res, next) {
    var event = new Event(req.body);
    event.author = req.payload._id;
    event.createdBy = req.payload.username;
    event.save(function(err, event){
        if(err){
            return next(err);
        }
        res.json(event);
    });
});
//post param
router.param('event', function(req, res, next, id) {
    var query = Event.findById(id);
    query.exec(function (err, event){
        if (err) {
            return next(err);
        }
        if (!event) {
            return next(new Error('can\'t find event'));
        }
        req.event = event;
        return next();
    });
});
//get post with param id
router.get('/browse/:event', function(req, res, next) {
    req.event.populate('assignments', function(err, event) {
        if (err) {
            return next(err);
        }
        res.json(event);
    });
});
//route to update post
router.put('/browse/:event', function(req, res, next) {
    req.event.save(function(err, event) {
        if (err) {
            return next(err);
        }
        res.json(event);
    });
});

/*
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
Assignments SECTION
*/
//post assignments
router.post('/browse/:event/assignments', auth, function(req, res, next) {
    var assignment = new Assignment(req.body);
    assignment.event = req.event;
    assignment.assignedTo = req.payload.username;
    assignment.assignee = req.payload._id;
    assignment.save(function(err, assignment){
        if(err){
            return next(err);
        }
        req.event.assignments.push(assignment);
        req.event.save(function(err, event) {
            if(err){
                return next(err);
            }
            res.json(assignment);
        });
    });
});
//comment param
router.param('assignment', function(req, res, next, id) {
    var query = Assignment.findById(id);
    query.exec(function (err, assignment){
        if (err) {
            return next(err);
        }
        if (!assignment) {
            return next(new Error('can\'t find assignment'));
        }
        req.assignment = assignment;
        return next();
    });
});

/*
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
