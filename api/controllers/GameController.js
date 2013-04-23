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

		Question.getRandom(res, trivia_id, function(question) {
			Answer.findByQuestion(question[0].id, function (answers) {
				var reduced_answers = answers.map(reduceAnswer);

				return res.send({
					question: question[0],
					answers: reduced_answers
				});
			});
		});
	},

	answer: function (req,res) {
		var points;
		var msg;

		var calculatePoints = function (seconds) {
			return seconds;
		}

		var question_id = req.param('question_id');

		Answer.findCorrect(question_id, function (answer) {

			Game.alreadyPlayed(1, question_id, function (already_played) {
				//if had already played that question, doesn't even check if it was right
				if (already_played) {
					msg = 'Ya habías respondido esta pregunta';
				}

				var answer_id = req.param('answer_id');
				if (answer_id == answer.id && already_played == 0) {
					var seconds = req.param('seconds');
					points = calculatePoints(seconds);
				} else {
					points = 0;
				}

				return res.send({
					answer: answer.id,
					points: points,
					msg: msg
				});
			});
		});
	}

};
module.exports = GameController;
