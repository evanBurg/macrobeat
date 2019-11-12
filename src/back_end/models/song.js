const mongoose = require(`mongoose`);

const songSchema = new mongoose.Schema({
	uniqueId: {
		type: String,
		required: true,
	},
	title: {
		type: String,
		required: true,
		unique: true,
		maxlength: 100
	},
	artist: {
		type: String,
        required: true,
        default: "Unknown"
	},
	album: {
		type: String,
		required: true,
		default: 'Unknown'
	},
	image: {
		type: String,
		required: true,
		default: false
	},
	source: {
		type: String,
		required: true,
		default: false
	}
});

module.exports = mongoose.model(`Song`, songSchema);
