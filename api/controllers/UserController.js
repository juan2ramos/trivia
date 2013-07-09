var UserController = {

	create: function (req,res) {

		var name = req.param('name');
		var email = req.param('email');

		User.findAll({ or: [{name: name}, {email: email}] }).done(function(err, users) {

			if (users.length > 0) {
				if (users[0].name == name) {
					var msg = 'Ya existe un usuario registrado con el nombre '+name+'. Por favor ingresa otro nombre de usuario.';
				} else {
					var msg = 'Ya existe un usuario registrado con el email '+email+'. Por favor ingresa otro email.';
				}
				req.flash('message', msg);
				return res.redirect('/auth/signup');
			}

			User.create({
				name: req.param('name'),
				email: req.param('email'),
				password: req.param('password')
			}).done(function(err, user) {
				req.flash('message', 'Tu cuenta ha sido creada exitosamente!');
				return res.redirect('/');
			});
		});
	}

};
module.exports = UserController;
