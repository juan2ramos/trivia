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
			return res.redirect('/');
		});
	}

};
module.exports = UserController;
