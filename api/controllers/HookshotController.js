var hookshot = require('hookshot');

var HookshotController = {
	index: function (req,res) {

		console.log('hookshot pull and restart');

		var branch = 'epa';
		hookshot('refs/heads/'+branch, 'git pull origin '+branch+' && forever restart .app.js');
		res.send(200);
	}
};
module.exports = HookshotController;
