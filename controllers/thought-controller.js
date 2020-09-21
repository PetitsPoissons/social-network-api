const { Thought, User } = require('../models');

const thoughtController = {
  // get all thoughts - GET /api/thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .select('-__v')
      .sort({ _id: -1 }) // sort by most date of creation, descending
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // get one thought by id - GET /api/thoughts/:id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .select('-__v')
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // create thought and add it to a user - POST /api/thoughts/:userId
  addThought({ body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        // pass the _id of the newly created thought
        return User.findOneAndUpdate(
          // and update the array of thoughts of the associated user
          { _id: body.userId },
          { $push: { thoughts: _id } },
          { new: true, runValidators: true } // b/c we want to return the updated user data
        ).select('-__v');
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  // update a thought with a newly created reaction - POST /api/thoughts/:thoughtId/reactions
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .select('-__v')
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },

  // update a thought with a newly deleted reaction - DELETE /api/thoughts/:thoughtId/reactions/:reactionId
  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true, runValidators: true }
    )
      .select('-__v')
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.json(err));
  },

  // update thought - PUT /api/thoughts/:id
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .select('-__v')
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // remove thought
  removeThought({ params, body }, res) {
    Thought.findOneAndDelete({ _id: params.id }) // delete thought in Thought collection
      .then((deletedThought) => {
        // pass out the deleted thought to be able to update the array of thoughts of the associated user
        if (!deletedThought) {
          return res
            .status(404)
            .json({ message: 'No thought found with this id' });
        }
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $pull: { thoughts: params.id } },
          { new: true, runValidators: true }
        ).select('-__v');
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtController;
