var passwordHash = require('password-hash');

var UserController = {

	create: function (req,res) {

	    var hashedPassword = passwordHash.generate(req.param('password'));

		User.create({
			name: req.param('name'),
			password: hashedPassword
		}).done(function(err, question) {
			req.flash('message', 'Tu cuenta ha sido creada existosamente!');
			return res.redirect('/');
		});
	}

};
module.exports = UserController;
