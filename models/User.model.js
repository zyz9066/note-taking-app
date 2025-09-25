const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    auth0Id: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
