/*---------------------
	:: User
	-> controller
---------------------*/
var UserController = {

	create: function (req,res) {

		User.create({
			name: req.param('name'),
			password: req.param('password')
		}).done(function(err, question) {
			req.flash('message', 'Tu cuenta ha sido creada existosamente!');
			return res.redirect('/');
		});
	}

};
module.exports = UserController;
