const router = require("express").Router();
const {
  getAllThoughts,
  getThoughtById,
  addThought,
  updateThought,
  removeThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thought-controller");

// set up GET at /api/thoughts
router.route("/").get(getAllThoughts).post(addThought);

// set up GET one and PUT at /api/thoughts/:id
router.route("/:id").get(getThoughtById).put(updateThought);

// set up route to remove a particular thought associated with a particular user - DELETE /api/thoughts/:userId/:thoughtId
router.route("/:userId/:thoughtId").delete(removeThought);

// set up route to create a reaction associated with a particular thought - POST /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").put(addReaction);

// set up route to delete a reaction associated with a particular thought - DELETE /api/thoughts/:thoughtId/reactions/:reactionId
router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

module.exports = router;
