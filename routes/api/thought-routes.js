const router = require('express').Router();
const { addThought, removeThought } = require('../../controllers/thought-controller');

// set up route to create a thought associated with a particular user - POST /api/thoughts/:userId
router.route('/:userId').post(addThought);

// set up route to remove a particular thought associated with a particular user - DELETE /api/thoughts/:userId/:thoughtId
router.route('/:userId/:thoughtId').delete(removeThought);

module.exports = router;