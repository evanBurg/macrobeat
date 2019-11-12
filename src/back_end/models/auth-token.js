const mongoose = require(`mongoose`);

const authTokenSchema = new mongoose.Schema({
	serviceName: {
		type: String,
		required: true,
		unique: true,
		maxlength: 100
	},
	authToken: {
		type: String,
		required: false
	},
	refreshToken: {
		type: String,
		required: false
	}
});

module.exports = mongoose.model(`AuthToken`, authTokenSchema);
