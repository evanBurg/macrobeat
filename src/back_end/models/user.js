const mongoose = require(`mongoose`);

const userSchema = new mongoose.Schema({
	uniqueId: {
		type: String,
		required: true,
		unique: true,
		maxlength: 100
	},
	userName: {
		type: String,
		required: true,
		unique: true,
		maxlength: 100
	},
	accountType: {
		type: String,
		enum: [`admin`, `mod`, `guest`],
		required: true,
		default: `guest`
	},
	dateCreated: {
		type: Date,
		required: true,
		default: Date.now
	},
	limited: {
		type: Boolean,
		required: true,
		default: false
	},
	banned: {
		type: Boolean,
		required: true,
		default: false
	}
});

module.exports = mongoose.model(`User`, userSchema);
