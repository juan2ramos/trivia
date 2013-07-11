/*---------------------
	:: Question
	-> controller
---------------------*/
var QuestionController = {

	edit: function (req,res) {
		var id = req.param('id');
		Question.findByID(id, function (question) {
			Answer.findByQuestion(question.id, function (answers) {
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
				return res.send(err,500);
			}

			// The Question was created successfully!
			console.log("Question created:", question.question);

			var i = 1;
			var answer;
			var correct;
			while (typeof req.param('answer_'+i) === 'string') {
				answer = req.param('answer_'+i);
				if (answer.length > 0) {
					//is it the correct answer?
					correct = (i == req.param('correct')) ? true : false;

					Answer.create({
						answer: answer,
						question_id: question.id,
						correct: correct
					}).done(function(err, answer) {
						if (err) {
							return res.send(err,500);
						}
						console.log("Answer created:", answer.answer);
					});
				}
				i++;
			}

			console.log('...redirecting...');
			return res.redirect('/trivia/detail/'+question.trivia_id);
		});
	},

	update: function (req,res) {

		Question.update({id: req.param('id')}, {question: req.param('question')}, function(err, question) {
			// Error handling
			if (err) {
				return res.send(err,500);
			}
		});

		Answer.findByQuestion(req.param('id'), function (answers) {
			answers.forEach(function logArrayElements(old_answer, index) {
				var answer_id = old_answer.id;
				var correct = (answer_id == req.param('correct')) ? true : false;

				var new_answer = {
					answer: req.param('answer_'+answer_id),
					question_id: req.param('id'),
					correct: correct
				};

				Answer.update({id: answer_id}, new_answer, function(err, answer) {
					if (err) {
						return res.send(err,500);
					}
				});
			});
		});

		console.log('...redirecting...');
		return res.redirect('/trivia/detail/'+req.param('trivia_id'));
	}
};
module.exports = QuestionController;
