const router = require('express').Router();
const { getAllThoughts, getThoughtById, addThought, updateThought, removeThought } = require('../../controllers/thought-controller');

// set up GET at /api/thoughts
router.route('/').get(getAllThoughts);

// set up GET one and PUT at /api/thoughts/:id
router.route('/:id').get(getThoughtById).put(updateThought);

// set up route to create a thought associated with a particular user - POST /api/thoughts/:userId
router.route('/:userId').post(addThought);

// set up route to remove a particular thought associated with a particular user - DELETE /api/thoughts/:userId/:thoughtId
router.route('/:userId/:thoughtId').delete(removeThought);

module.exports = router;