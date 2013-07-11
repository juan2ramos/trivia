/*---------------------
	:: Home
	-> controller
---------------------*/
var HomeController = {
	index: function (req,res) {
		res.view({ message: req.flash('message') });
	}
};
module.exports = HomeController;
