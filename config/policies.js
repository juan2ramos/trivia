/**
* Policy defines middleware that is run before each controller/controller.
* Any policy dropped into the /middleware directory is made globally available through sails.middleware
* Below, use the string name of the middleware
*/
module.exports.policies = {

	// Anything can be accessed by admins
	'*': 'admin',

	// game can be accessed by all users
	'game':
	{
		'*': 'authenticated'
	},

	// whitelist the auth controller
	'auth':
	{
		'*': true
	},

	// whitelist the home controller
	'home':
	{
		'*': true
	},

	// whitelist the hookshot controller
	'hookshot':
	{
		'*': true
	},

	// whitelist the user create
	'user':
	{
		'create': true
	}

};
