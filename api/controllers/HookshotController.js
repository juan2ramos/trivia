var hookshot = require('hookshot');

var HookshotController = {
	index: function (req,res) {

		var branch = 'epa';
		//hookshot('refs/heads/'+branch, 'git pull origin '+branch+' && forever restart .app.js');

		hookshot().on('push', function(info) {
			console.log('ref ' + info.ref + ' was pushed.');
			if (info.ref == 'refs/heads/'+branch) {
				console.log('hookshot pull and restart');
			}
		});

		res.send(200);
	}
};
module.exports = HookshotController;
