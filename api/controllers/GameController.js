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
		var answer_id = req.param('answer_id');
		var points;
		var msg;

		var calculatePoints = function (seconds) {
			return seconds;
		}

		Answer.findByID(answer_id, function (answer) {

			if (answer.correct != 1) {
				points = 0;
			}

			var question_id = req.param('question_id');

			Game.alreadyPlayed(1, question_id, function (already_played) {
				if (already_played) {
					points = 0;
					msg = 'Ya habías respondido esta pregunta';
				}

				if (points !== 0) {
					var seconds = req.param('seconds');
					points = calculatePoints(seconds);
					return res.send({
						answer: answer,
						points: points,
						msg: msg
					});
				}else{
					Answer.findCorrect(question_id, function (answer) {
						return res.send({
							answer: answer,
							points: 0,
							msg: msg
						});
					});
				}
			});
		});
	}

};
module.exports = GameController;
