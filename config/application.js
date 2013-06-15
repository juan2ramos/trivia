// config/application.js
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var passwordHash = require('password-hash');

// Passport session setup.
// To support persistent login sessions, Passport needs to be able to
// serialize users into and deserialize users out of the session. Typically,
// this will be as simple as storing the user ID when serializing, and finding
// the user by ID when deserializing.
passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id, function (err, user) {
		done(err, user);
	});
});

// Use the LocalStrategy within Passport.
// Strategies in passport require a `verify` function, which accept
// credentials (in this case, a username and password), and invoke a callback
// with a user object.
passport.use(new LocalStrategy(
	function(username, password, done) {
		// asynchronous verification, for effect...
		process.nextTick(function () {

			// Find the user by username. If there is no user with the given
			// username, or the password is not correct, set the user to `false` to
			// indicate failure and set a flash message. Otherwise, return the
			// authenticated `user`.
			User.findByName(username, function(err, user) {
				if (err) { return done(err); }
				if (!user) {
					return done(null, false, { message: 'Unknown user ' + username });
				}
				if ( ! passwordHash.verify(password, user.password) ) {
					return done(null, false, { message: 'Invalid password' });
				}
				return done(null, user);
			})
		});
	}
));

module.exports = {

	// Name of the application (used as default <title>)
	appName: "Sails Application",

	// Port this Sails application will live on
	port: process.env.VMC_APP_PORT || 1337,

	// The environment the app is deployed in
	// (`development` or `production`)
	//
	// In `production` mode, all css and js are bundled up and minified
	// And your views and templates are cached in-memory.  Gzip is also used.
	// The downside?  Harder to debug, and the server takes longer to start.
	environment: 'development',

	// Logger
	// Valid `level` configs:
	//
	// - error
	// - warn
	// - debug
	// - info
	// - verbose
	//
	log: {
		level: process.env.LOG_LEVEL || 'debug'
	},

	// Custom express middleware - we use this to register the passport middleware
	express: {
		customMiddleware: function(app)
		{
			app.use(passport.initialize());
			app.use(passport.session());
		}
	}

};
