const router = require('express').Router();
const { route } = require('./user-routes');
const userRoutes = require('./user-routes');

// add prefix of '/api/users' to routes created in 'user-routes.js'
router.use('/api/users', userRoutes);

router.use((req, res) => {
  res.status(404).json({ message: 'Wrong route' });
});

module.exports = router;