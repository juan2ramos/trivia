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

	findByQuestion: function (question_id, cb) {
		this.findAll({ question_id: question_id }).done(function (err, answers) {
			if (err) {
				return res.send(err, 500);
			} else {
				cb(answers);
			}
		});
	}

};
