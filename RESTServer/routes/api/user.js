var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
var jwt = require("jsonwebtoken");

var User = require('../../models/user');
var auth = require('./auth');

// sign up
// POST
module.exports.postUsers = function(req, res) {

	var user = req.body;

   var usernamePromise = null;
   usernamePromise = new User.User({username: user.user.username}).fetch();


   return usernamePromise.then(function(model) {
      // return console.log(model);
      if(model) {
         res.json({ error: 'username already exists.'});
      } else {
         //****************************************************//
         // MORE VALIDATION GOES HERE(E.G. PASSWORD VALIDATION)
         //****************************************************//
         var password = user.user.password;
         var hash = bcrypt.hashSync(password);

         var signUpUser = new User.User({username: user.user.username, password: hash});

         signUpUser.save().then(function(model) {

            res.json({ user: model }); // is it ok to send everything including the encrypted pw?
         });	
      }
   });
};

module.exports.index = function(req, res) {

};

// sign in
// GET
module.exports.signIn = function(req, res) {

};


// sign in
// GET
module.exports.signUp = function(req, res) {};

// sign in
// POST
module.exports.signUpPost = function(req, res) {

};

// sign out
module.exports.signOut = function(req, res) {};

// get all users
// GET
module.exports.getAllUsers = function(req, res) {};

module.exports.getSingleUser = function(req, res, id) {
   
   new User.User({userId: id}).fetch().then(function(user) {

      if (user) {
         res.json({user: user});
      } else {
         res.send('no user from server find');
      }
   });
};

// 404 not found
module.exports.notFound404 = function(req, res) {};

// var error = function(req, res) {};