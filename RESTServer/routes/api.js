var express = require('express');
var router = express.Router();

var posts = require('./api/post');
var users = require('./api/user');
var auth = require('./api/auth');

/* Posts routes */
router.route('/posts')
	.post(function(req,res) { posts.addPost(req,res) })
	.get(function(req,res) { posts.getAllPosts(req,res) });

/* Single post routes */
router.route('/posts/:post_id')
	.get(function(req, res) { posts.getSinglePost(req, res, req.params.post_id) })
	.put(function(req, res) { posts.updatePost(req, res, req.params.post_id) })
	.delete(function(req, res) { posts.deletePost(req, res, req.params.post_id) });


router.route('/signup')
	.get(function(req, res) { users.signUp(req, res) });
	
/* User Routes */
router.route('/users')
	.get(function(req, res) { users.getAllUsers(req, res) })
	.post(function(req, res) { users.postUsers(req, res) });

/* Sign in route */
router.route('/login')
	.get(function(req, res) { users.signIn(req, res) })
	.post(function(req, res) { auth.signInPost(req, res) });

/* Single user routes */
router.route('/users/:user_id')
	.get(function(req, res) {users.getSingleUser(req, res, req.params.user_id)});

module.exports = router;