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

	detail: function (req,res) {
		var id = req.param('id');
		Trivia.find(id).done(function (err, trivia) {
			if (err) {
				return res.send(err,500);
			}

			Question.findAll({ trivia_id: trivia.id }).done(function (err, questions) {
				if (err) {
					return res.send(err,500);
				}

				return res.view({
					trivia: trivia,
					questions: questions
				});
			});
		});
	}

};
module.exports = TriviaController;
