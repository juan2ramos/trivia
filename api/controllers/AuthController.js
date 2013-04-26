var passport = require('passport');

var AuthController = {

	login: function (req,res) {
		if (typeof req.user === "undefined"){
			res.view({ message: req.flash('message') });
		} else {
			res.redirect('/');
		}
	},

	process: function(req, res) {
		passport.authenticate('local', function(err, user, info)
		{
			if ((err) || (!user))
			{
				req.flash('message', info.message);
				res.redirect('/login');
				return;
			}

			req.logIn(user, function(err)
			{
				if (err)
				{
					req.flash('message', info.message);
					res.redirect('/login');
					return;
				}

				req.flash('message', 'Has ingresado correctamente!');
				res.redirect('/game');
				return;
			});
		})(req, res);
	},

	logout: function (req,res) {
		req.logout();
		req.flash('message', 'Sesión cerrada exitosamente.');
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
