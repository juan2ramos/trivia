/*---------------------
	:: User
	-> model
---------------------*/
module.exports = {

	attributes	: {

		name: 'STRING',
		password: 'STRING',
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
	},

	addPoints: function (points, cb) {
		var sql_query = 'UPDATE `user` SET points = points+'+points+' WHERE id = 1';

		this.query(sql_query, function(err, data) {
			if (err) {
				return res.send(err, 500);
			} else {
				cb(data);
			}
		});
	}

};
