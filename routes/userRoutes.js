const express = require('express');
const {
  registerUser,
  loginUser,
  changePassword,
  logoutUser,
} = require('../controllers/userController.js');
const verifyUser = require('../middleware/verifyUser.js');

const router = express.Router();

// Public
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);

// // Private
router.route('/change-password').post(verifyUser, changePassword);

module.exports = router;
