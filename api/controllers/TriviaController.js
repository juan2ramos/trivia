/*---------------------
	:: Trivia
	-> controller
---------------------*/
var TriviaController = {

	index: function(req, res) {
		Trivia.findAll().done(function (err, trivias) {
			if (err) {
				return res.send(err,500);
			}

			return res.view({
				trivias: trivias
			});
		});
	},

	detail: function (req, res) {
		var id = req.param('id');
		Trivia.findByID(id, function (trivia) {

			if (trivia) {

				Question.findAll({ trivia_id: trivia.id }).done(function (err, questions) {
					if (err) {
						return res.send(err,500);
					}

					var questions_by_id = [];

					//array of questions with ids as keys
					for (var i = 0; i < questions.length; i++) {

						questions_by_id[questions[i].id] = questions[i];
						questions_by_id[questions[i].id].answers = [];
					}

					//get all answers and assign them to the corresponding question...ugly
					Answer.findAll().done(function (err, answers) {
						if (err) {
							return res.send(err,500);
						}

						var current_question;

						for (var j = 0; j < answers.length; j++) {

							current_question = answers[j].question_id;

							if (typeof questions_by_id[current_question] !== "undefined") {

								questions_by_id[current_question].answers.push(answers[j]);
							}
						}

						return res.view({
							trivia: trivia,
							questions: questions_by_id
						});

					});

				});
			} else {
				res.redirect('/trivia');
			}
		});
	}

};
module.exports = TriviaController;
