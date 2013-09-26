// App bootstrap
// Code to run before launching the app
//
// Make sure you call cb() when you're finished.
module.exports.bootstrap = function (cb) {
	var passport = require('passport');
	var CookieStrategy = require('passport-cookie').Strategy;

	// Passport session setup.
	// To support persistent login sessions, Passport needs to be able to
	// serialize users into and deserialize users out of the session. Typically,
	// this will be as simple as storing the user ID when serializing, and finding
	// the user by ID when deserializing.
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findOne(id, function (err, user) {
			done(err, user);
		});
	});

	// Use the CookieStrategy within Passport.
	// Strategies in passport require a `verify` function, which accept
	// credentials (in this case, a username and userid), and invoke a callback
	// with a user object.
	passport.use(new CookieStrategy({
			usernameCookie: 'exp__screen_name',
			useridCookie: 'exp__member_id',
			passReqToCallback: true
		},
		function(req, username, userid, done) {

			User.findOne(userid, function(err, user) {
				if (err) {
					return done(err);
				}

				if (user) {
					//todo: if email or username have changed, update user in trivia db
					return done(null, user);
				} else {
					var ee_group = req.cookies.exp__group_title;
					var admin = ee_group.search(/admin/i) == -1 ? 0 : 1;//check if it's an admin

					User.create({
						id: userid,
						name: username,
						email: req.cookies.exp__email,
						admin: admin
					}).done(function(err, user) {
						return done(null, user);
					});
				}
			});
		}
	));

	cb();
};
