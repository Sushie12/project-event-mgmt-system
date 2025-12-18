// const express = require('express');
// const router = express.Router();
// const { registerUser, loginUser } = require('../controllers/authController');

// router.post('/register', registerUser);
// router.post('/login', loginUser);

// module.exports = router;

// const express = require('express');
// const router = express.Router();

// // temporary controller functions to test route
// router.post('/register', (req, res) => {
//   res.json({ msg: 'Register route working ' });
// });

// router.post('/login', (req, res) => {
//   res.json({ msg: 'Login route working ' });
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
