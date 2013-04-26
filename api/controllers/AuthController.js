var passport = require('passport');

var AuthController = {

	login: function (req,res) {
		if (typeof req.user === "undefined"){
			res.view();
		} else {
			res.redirect('/');
		}
	},

	process: function(req, res) {
		passport.authenticate('local', function(err, user, info)
		{
			if ((err) || (!user))
			{
				console.log(err);
				console.log(info);
				res.redirect('/login');
				return;
			}

			req.logIn(user, function(err)
			{
				if (err)
				{
					res.view();
					return;
				}

				res.redirect('/game');
				return;
			});
		})(req, res);
	},

	logout: function (req,res) {
		req.logout();
		res.redirect('/');
	},

	signup: function (req,res) {
		if (typeof req.user === "undefined"){
			res.view();
		} else {
			res.redirect('/');
		}
	}

};

module.exports = AuthController;
