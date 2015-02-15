var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var jwt = require("jsonwebtoken");
var bcrypt = require('bcrypt-nodejs');

var User = require('../../models/user');



passport.use(new LocalStrategy(
	function(username, password, done) {
		new User.User({username: username}).fetch().then(function(data) {
			var user = data;

			if(user === null) {
	        	return done(null, false, {message: 'Invalid username or password'});
			} else {
	        	user = data.toJSON();

	        	if(!bcrypt.compareSync(password, user.password)) {
	            	return done(null, false, {message: 'Invalid username or password'});
	        	} else {
	            	return done(null, user);
	         	}
	    	}
		});
	}
));


// sign in
// POST
module.exports.signInPost = function(req, res) {

	if (req.body.user) {
		req.body = req.body.user;
		console.log(req.body);
	};

	passport.authenticate('local', {session : false}, function(err, user, info) {

	    if (err) { return next(err) }
	    if (!user) {
	      return res.status(401).json({ error: info });
	    }
	    console.log(user)
	    //user has authenticated correctly thus we create a JWT token 
	    var token = jwt.sign(user, "blahblahblahblahblah");
	    res.json({ token : token, user_id : user.userId });


	})(req, res);
};























