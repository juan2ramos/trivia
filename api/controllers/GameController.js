/*---------------------
	:: Game
	-> controller
---------------------*/
var GameController = {

	index: function (req,res) {
		var id = req.param('id');

		User.findByID(1, function (user) {
			Trivia.findByID(id, function (trivia) {
				Question.getCount(trivia.id, function (total) {
					Game.gamesPlayed(user.id, trivia.id, function (answered) {
						return res.view({
							user: user,
							trivia: trivia,
							total: total,
							answered: answered
						});
					});
				});
			});
		});
	},

	question: function (req,res) {
		var trivia_id = req.param('id');

		var reduceAnswer = function (answer) {
			return {
				id: answer.id,
				answer: answer.answer
			};
		};

		Question.getRandom(trivia_id, function(question) {
			Answer.findByQuestion(question[0].id, function (answers) {
				var reduced_answers = answers.map(reduceAnswer);

				return res.send({
					question: question,
					answers: reduced_answers
				});
			});
		});
	}

};
module.exports = GameController;
