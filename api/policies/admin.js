/**
* Allow admin users.
*/
module.exports = function (req,res,ok) {

	if (req.isAuthenticated()) {
		if (req.user.admin == 1) {
			return ok();
		} else {
			res.redirect('/');
		}
	} else {
		res.redirect('/login');
	}
};
