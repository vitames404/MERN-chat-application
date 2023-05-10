const express = require('express')

const router = express.Router();
const {registerUser, authUser, allUsers} = require("../controllers/userControllers");

// Route to login page
router.post('/login', authUser);

// Route to register a new user
// Route for the user searching API endpoint
router.route('/').post(registerUser).get(allUsers);

module.exports = router;
