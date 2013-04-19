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
	},

	add: function (req,res) {
		return res.view({
			trivia_id: req.param('id')
		});
	},

	create: function (req,res) {

		Question.create({
			question: req.param('question'),
			trivia_id: req.param('trivia_id')
		}).done(function(err, question) {

			// Error handling
			if (err) {
				return console.log(err);

			// The Question was created successfully!
			}else {
				console.log("Question created:", question.question);

				answer = req.param('answer');

				for (var i = 0; i < answer.length; i++) {
					Answer.create({
						answer: answer[i],
						question_id: question.id
					}).done(function(err, answer) {
						if (err) {
							return console.log(err);
						}else {
							console.log("Answer created:", answer.answer);
						}
					});
				}
			}
		});
	}

};
module.exports = QuestionController;
