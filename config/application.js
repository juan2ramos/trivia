// config/application.js
var passport = require('passport')
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
	User.findById(id, function (err, user) {
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
		// asynchronous verification, for effect...
		process.nextTick(function () {

			User.find(userid, function(err, user) {
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
			})
		});
	}
));

module.exports = {

	// Name of the application (used as default <title>)
	appName: "Sails Application",

	host: process.env.VCAP_APP_HOST || 'trivia.epa.8manos.in',

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
