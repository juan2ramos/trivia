/*---------------------
	:: User
	-> model
---------------------*/
module.exports = {

	attributes	: {

		name: 'STRING',
		points: 'INTEGER'

	},

	findByID: function (id, cb) {
		this.find(id).done(function (err, user) {
			if (err) {
				return res.send(err,500);
			} else {
				cb(user);
			}
		});
	}

};
