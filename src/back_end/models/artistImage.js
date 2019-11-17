const mongoose = require(`mongoose`);

const artistImageSchema = new mongoose.Schema({
  spotifyId: {
    type: String,
    required: false,
    unique: true,
    maxlength: 100
  },
  stringName: {
    type: String,
    required: true,
    unique: true,
    maxlength: 100
  },
  imageLink: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model(`artistImage`, artistImageSchema);
