const { Thought, User } = require('../models');

const thoughtController = {

  // add thought to user
  addThought({ params, body }, res) {
    Thought.create(body)
    .then(({ _id }) => {        // pass the _id of the newly created thought
      return User.findOneAndUpdate(   // and update the array of thoughts of the associated user
        { _id: params.userId },
        { $push: { thoughts: _id } },
        { new: true }   // b/c we want to return the updated user data
      );
    })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => res.json(err));
  },

  // remove thought
  removeThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })   // delete thought in Thought collection
    .then(deletedThought => {   // pass out the deleted thought to be able to update the array of thoughts of the associated user
      if (!deletedThought) {
        return res.status(404).json({ message: 'No thought found with this id' });
      }
      return User.findOneAndUpdate(
        { _id: params.userId },
        { $pull: { thoughts: params.thoughtId } },
        { new: true }
      );
    })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => res.json(err));
  }
};

module.exports = thoughtController;