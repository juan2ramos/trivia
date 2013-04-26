/*---------------------
	:: Game
	-> controller
---------------------*/
var GameController = {

	index: function (req,res) {
		var id = req.param('id');

		Trivia.findByID(id, function (trivia) {
			Question.getCount(trivia.id, function (total) {
				Game.gamesPlayed(req.user.id, trivia.id, function (answered) {
					return res.view({
						user: req.user,
						trivia: trivia,
						total: total,
						answered: answered,
						message: req.flash('message')
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

		Question.getRandom(req.user.id, trivia_id, function(question) {

			if (question.length == 0) {
				return res.send({msg: 'No hay preguntas'});
			}

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

		var sendAnswer = function (answer) {
			return res.send({
				answer: answer.id,
				points: points,
				msg: msg
			});
		}

		var question_id = req.param('question_id');

		Answer.findCorrect(question_id, function (right_answer) {

			Game.alreadyPlayed(req.user.id, question_id, function (already_played) {
				//if had already played that question, doesn't even check if it was right
				if (already_played) {
					msg = 'Ya habías respondido esta pregunta';
					return sendAnswer(right_answer);
				}

				var answer_id = req.param('answer_id');
				if (answer_id == right_answer.id) {
					var seconds = req.param('seconds');
					points = calculatePoints(seconds);
				} else {
					points = 0;
				}

				Game.create({
					user_id: req.user.id,
					question_id: question_id,
					answer_id: answer_id,
					timeleft: seconds
				}).done(function(err, question) {

					// Error handling
					if (err) {
						return res.send(err,500);
					}

					if (points == 0){
						return sendAnswer(right_answer);
					}

					User.addPoints(req.user.id, points, function (output) {
						return sendAnswer(right_answer);
					});
				});
			});
		});
	}

};
module.exports = GameController;
