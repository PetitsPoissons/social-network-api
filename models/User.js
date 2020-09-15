const { Schema, model } = require('mongoose');
const moment = require('moment');

const UserSchema = new Schema(
  {
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
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true
    },
    id: false   // we don't need mongoose to automatically assign an id to the virtuals we are creating
  }
);

// get total count of friends on retrieval
UserSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;