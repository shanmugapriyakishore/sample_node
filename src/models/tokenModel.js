const mongoose = require("mongoose")
const tokenSchema = new mongoose.Schema({
    userId: {
      type: String,
      ref: 'registers',
      required: true
    },
    token: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 3600 // 1 hour
    }
  });
const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;