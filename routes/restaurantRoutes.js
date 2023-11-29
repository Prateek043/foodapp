const express = require('express');
const {
  createRestaurant,
  getAllRestaurant,
  getRestaurant,
} = require('../controllers/restaurantController');
const verifyUser = require('../middleware/verifyUser');

const router = express.Router();

router.route('/').post(verifyUser, createRestaurant);
router.route('/getAllRestraunt').get(getAllRestaurant);
router.route('/:id').get(getRestaurant);

module.exports = router;
