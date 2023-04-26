const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
  },
  pwd: {
    type: String,
    required: true,
    minlength: 3,
  },
});

userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('pwd')) {
      return next();
    }
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(this.pwd, salt);
    this.pwd = hash;
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('User', userSchema);