/*---------------------
	:: Question
	-> controller
---------------------*/
var QuestionController = {

	detail: function (req,res) {
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
					if (i == req.param('correct')) {
						correct = true;
					}else{
						correct = false;
					}

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
	}

};
module.exports = QuestionController;
