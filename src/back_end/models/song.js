const mongoose = require(`mongoose`);

const songSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  artist: {
    type: String,
    required: true,
    default: "Unknown"
  },
  album: {
    type: String,
    required: true,
    default: "Unknown"
  },
  image: {
    type: String,
    required: true
  },
  lengthS: {
    type: Number,
    required: true
  },
  source: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model(`Song`, songSchema);
