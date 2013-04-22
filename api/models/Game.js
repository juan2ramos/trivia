/*---------------------
	:: Game
	-> model
---------------------*/
module.exports = {

	attributes	: {

		user_id: 'INTEGER',
		question_id: 'INTEGER',
		answer_id: 'INTEGER',
		timeleft: 'FLOAT'

	},

	gamesPlayed: function (user_id, trivia_id, cb) {
		var sql_query = 'SELECT COUNT(game.id) as total ';
		sql_query += ' FROM question, game WHERE question.id = game.question_id AND game.user_id ='+user_id;
		sql_query += ' AND question.trivia_id = '+trivia_id;

		this.query(sql_query, function(err, data) {
			if (err) {
				return res.send(err, 500);
			} else {
				cb(data[0].total);
			}
		});
	}

};
