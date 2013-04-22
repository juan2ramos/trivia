/*---------------------
	:: Game
	-> controller
---------------------*/
var GameController = {

	question: function (req,res) {
		var trivia_id = req.param('id');

		var reduceAnswer = function (answer) {
			return {
				id: answer.id,
				answer: answer.answer
			};
		};

		var sql_query = 'SELECT question.id, question.question';
		sql_query += ' FROM question, game WHERE question.id != game.question_id AND game.user_id = 1 AND question.trivia_id = '+trivia_id;
		sql_query += ' ORDER BY RAND() LIMIT 1';

		Question.query(sql_query, function(err, question) {
			if (err) {
				return res.send(err, 500);
			} else {
				Answer.findAll({ question_id: question[0].id }).done(function (err, answers) {
					if (err) {
						return res.send(err, 500);
					} else {
						var reduced_answers = answers.map(reduceAnswer);

						return res.send({
							question: question,
							answers: reduced_answers
						});
					}
				});
			}
		});
	}

};
module.exports = GameController;
