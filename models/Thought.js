const  { Schema, model } = require('mongoose');

const ThoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: [1, 'at least one character is required'],
    maxlength: [280, 'maximum of 280 characters allowed']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  username: {
    type: String,
    required: true
  },
  reactions: []
})