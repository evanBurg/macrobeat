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
    required: false,
    unique: false,
    maxlength: 100
  },
  profilePicBase64: {
    type: String,
    unique: false,
    required: false
  },
  accountType: {
    type: String,
    enum: [`admin`, `mod`, `user`],
    required: true,
    default: `user`
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
