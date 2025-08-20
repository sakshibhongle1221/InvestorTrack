const express = require('express');
const router = express.Router();
//“From the userController.js file, find and extract the signupUser function, and store it in a variable called signupUser so I can use it here.”
const { signupUser,loginUser} = require('../controllers/userController');

//“When someone sends a POST request to the URL /signup, call the signupUser function to handle that request.”
router.post('/signup', signupUser);
router.post('/login',loginUser);

module.exports = router;