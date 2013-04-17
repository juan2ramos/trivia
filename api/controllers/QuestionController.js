/*---------------------
	:: Question
	-> controller
---------------------*/
var QuestionController = {

	detail: function (req,res) {
		var id = req.param('id');
		Question.find(id).done(function (err, question) {
			if (err) {
				return res.send(err,500);
			}

			Answer.findAll({ question_id: question.id }).done(function (err, answers) {
				if (err) {
					return res.send(err,500);
				}

				return res.view({
					question: question,
					answers: answers
				});
			});
		});
	}

};
module.exports = QuestionController;
