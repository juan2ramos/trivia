/**
* Allow any authenticated user.
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
				req.flash('message', err.toString());
				res.redirect('/');
				return;
			}

			return ok();
		});
	})(req, res);
};
