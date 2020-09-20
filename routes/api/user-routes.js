const router = require("express").Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/user-controller");

// set up GET and POST at /api/users
router.route("/").get(getAllUsers).post(createUser);

// set GET one, PUT, and DELETE at /api/users/:id
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

// set PUT at /api/users/:userId/friends/:friendsId
router.route("/:userId/friends/:friendId").put(addFriend).delete(deleteFriend);

module.exports = router;
