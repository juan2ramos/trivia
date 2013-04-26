/*---------------------
	:: Question
	-> model
---------------------*/
module.exports = {

	attributes	: {

		question: 'STRING',
		//correct: 'INTEGER',//id of the answer model
		trivia_id: 'INTEGER'

	},

	findByID: function (id, cb) {
		this.find(id).done(function (err, question) {
			if (err) {
				return res.send(err,500);
			} else {
				cb(question);
			}
		});
	},

	getRandom: function (user_id, trivia_id, cb) {
		var sql_query = 'SELECT id, question FROM question';
		sql_query += ' WHERE trivia_id = '+trivia_id;
		sql_query += ' AND id NOT IN (SELECT question_id FROM game WHERE user_id = '+user_id+')';
		sql_query += ' ORDER BY RAND() LIMIT 1';

		this.query(sql_query, function(err, question) {
			if (err) {
				return res.send(err, 500);
			} else {
				cb(question);
			}
		});
	},

	getCount: function (trivia_id, cb) {
		var sql_query = 'SELECT COUNT(id) as total FROM question WHERE trivia_id ='+trivia_id;

		this.query(sql_query, function(err, data) {
			if (err) {
				return res.send(err, 500);
			} else {
				cb(data[0].total);
			}
		});
	}

};
