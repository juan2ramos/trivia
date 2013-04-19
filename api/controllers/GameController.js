/*---------------------
	:: Game
	-> controller
---------------------*/
var GameController = {

	question: function (req,res) {
		var sql_query = 'SELECT question.id, question.question FROM question, game WHERE question.id != game.question_id AND game.user_id = 1 AND question.trivia_id = 1 ORDER BY RAND() LIMIT 1';

		Question.query(sql_query, function(err, data) {
			console.log(data);
			return res.send(200);
		});
	},

};
module.exports = GameController;
