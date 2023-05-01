const express = require('express')

const router = express.Router();
const {registerUser, authUser} = require("../controllers/userControllers");


router.route('/login', authUser);
router.route('/').post(registerUser);

module.exports = router;
