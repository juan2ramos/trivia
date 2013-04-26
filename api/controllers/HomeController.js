/*---------------------
	:: Answer
	-> controller
---------------------*/
var AnswerController = {
	index: function (req,res) {
		res.view({ message: req.flash('message') });
	}
};
module.exports = AnswerController;
