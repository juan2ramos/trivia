/**
* Allow admin users.
*/
var passport = require('passport');

module.exports = function (req,res,ok) {

	passport.authenticate('cookie', { session: false }, function(err, user, info)
	{
		if (err || ! user) {
			req.flash('message', info.message);
			res.redirect('/');
			return;
		}

		req.login(user, function(err) {
			if (err) {
				req.flash('message', err);
				res.redirect('/');
				return;
			} else if (user.admin != 1) {
				req.flash('message', 'Not enough permissions to access this area.');
				res.redirect('/');
				return;
			}

			return ok();
		});
	})(req, res);
};
