var hookshot = require('hookshot');
var passport = require('passport');
var flash = require('connect-flash');

module.exports.express = {
	customMiddleware: function (app) {
		var branch = 'epa';
		app.use('/hookshot', hookshot('refs/heads/'+branch, 'git pull origin '+branch+' && forever restart .app.js'));

		app.use(passport.initialize());

		app.use(flash());
	}
};
