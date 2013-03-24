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
	}

};
module.exports = TriviaController;
