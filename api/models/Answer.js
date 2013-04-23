/*---------------------
	:: Answer
	-> model
---------------------*/
module.exports = {

	attributes	: {

		answer: 'STRING',
		question_id: 'INTEGER',
		correct: 'BOOLEAN'

	},

	findByID: function (id, cb) {
		this.find(id).done(function (err, answer) {
			if (err) {
				return res.send(err,500);
			} else {
				cb(answer);
			}
		});
	},

	findByQuestion: function (question_id, cb) {
		this.findAll({ question_id: question_id }).done(function (err, answers) {
			if (err) {
				return res.send(err, 500);
			} else {
				cb(answers);
			}
		});
	},

	findCorrect: function (question_id, cb) {
		this.findAll({ question_id: question_id, correct: 1 }).done(function (err, answers) {
			if (err) {
				return res.send(err, 500);
			} else {
				cb(answers[0]);
			}
		});
	}

};
