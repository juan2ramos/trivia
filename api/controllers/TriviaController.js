/*---------------------
	:: Trivia
	-> controller
---------------------*/
var TriviaController = {

	index: function(req, res) {
		Trivia.find().done(function (err, trivias) {
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

				Question.find({ trivia_id: trivia.id }).done(function (err, questions) {
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
					Answer.find().done(function (err, answers) {
						if (err) {
							return res.send(err,500);
						}

						for (var j = 0; j < answers.length; j++) {

							var question_id = answers[j].question_id;

							if (typeof questions_by_id[question_id] !== "undefined") {

								questions_by_id[question_id].answers.push(answers[j]);
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
	},

	edit: function (req, res) {
		var id = req.param('id');
		Trivia.findByID(id, function (trivia) {
			if (trivia) {
				return res.view({ trivia: trivia });
			} else {
				res.redirect('/trivia');
			}
		});
	}

};
module.exports = TriviaController;
