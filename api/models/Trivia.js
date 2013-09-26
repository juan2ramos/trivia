/*---------------------
	:: Trivia
	-> model
---------------------*/
module.exports = {

	attributes	: {

		// Simple attribute:
		name: 'STRING',

		// Or for more flexibility:
		// phoneNumber: {
		//	type: 'STRING',
		//	defaultValue: '555-555-5555'
		// }

	},

	findByID: function (id, cb) {
		this.findOne(id).done(function (err, trivia) {
			if (err) {
				return res.send(err,500);
			} else {
				cb(trivia);
			}
		});
	}

};
