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
    required: false
  },
  lengthS: {
    type: Number,
    required: true
  },
  source: {
    type: String,
    enum: [`youtube`, `spotify`, `soundcloud`],
    required: true
  },
  artistImage: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model(`Song`, songSchema);
