const express = require('express')

const router = express.Router();
const {registerUser, authUser} = require("../controllers/userControllers");

// Route to login page
router.post('/login', authUser);

// Route to register a new user
router.route('/').post(registerUser);

module.exports = router;
