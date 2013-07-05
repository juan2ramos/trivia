/**
* Allow admin users.
*/
module.exports = function (req,res,ok) {

	if (req.isAuthenticated()) {
		if (req.user.admin == 1) {
			return ok();
		} else {
			req.flash('message', 'Not enough permissions to access this area.');
			res.redirect('/');
		}
	}
};
