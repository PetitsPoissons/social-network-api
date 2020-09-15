const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
    required: 'username is required'
  },
  email: {
    type: String,
    unique: true,
    required: 'email is required',
    match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
  },
  userCreated: {
    type: Date,
    default: Date.now
  },
  thoughts: [],
  friends: []
});

const User = model('User', UserSchema);

module.exports = User;