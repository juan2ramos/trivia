/*---------------------
	:: User
	-> model
---------------------*/
module.exports = {

	attributes	: {

		name: 'STRING',
		password: 'STRING',
		email: 'STRING',
		points:  {
			type: 'INTEGER',
			defaultsTo: '0'
		},
		admin:  {
			type: 'INTEGER',
			defaultsTo: '0'
		}

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

	addPoints: function (id, points, cb) {
		var sql_query = 'UPDATE user SET points = points+'+points+' WHERE id = '+id;

		this.query(sql_query, function(err, data) {
			if (err) {
				return res.send(err, 500);
			} else {
				cb(data);
			}
		});
	}

};
