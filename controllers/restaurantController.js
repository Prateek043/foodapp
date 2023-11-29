const fs = require('fs');
const Restaurant = require('../model/restaurantModel');
const User = require('../model/userModel');

const createRestaurant = async (req, res) => {
  try {
    const user = await User.findById(req.body.id);
    if (!user.isAdmin) {
      return res.status(403).json({
        status: 'fail',
        message: 'Only admin can add restaurants',
      });
    }
    const {id,
    location,
    info,
    avgRatingString,
    sla,
    availability,
     badges,
    isOpen,
    type,
    badgesV2,
    aggregatedDiscountInfoV3,
    orderabilityCommunication,
    differentiatedUi,
    reviewsSummary,
    restaurantOfferPresentationInfo}=req.body;
    const restaurant = await Restaurant.create({
      id,
    location,
    info,
    avgRatingString,
    sla,
    availability,
     badges,
    isOpen,
    type,
    badgesV2,
    aggregatedDiscountInfoV3,
    orderabilityCommunication,
    differentiatedUi,
    reviewsSummary,
    restaurantOfferPresentationInfo
    });
    res.status(201).json({
      status: 'success',
      data: restaurant,
    });
  } catch (e) {
    res.status(500).json({
      status: 'fail',
      message: 'Something went wrong!',
    });
  }
};

const getRestaurant = async (req, res) => {
  const { id } = req.params;
  try {
    const restaurant = await Restaurant.findById(id);
    res.status(200).json({
      status: 'success',
      data: restaurant,
    });
  } catch (e) {
    res.status(500).json({
      status: 'fail',
      message: 'Something went wrong!',
    });
  }
};

const getAllRestaurant = async (req, res) => {
  try {
    const total = await Restaurant.find();
    const totaldata=total.length;
    res.status(200).json({
      status: 'success',
      totaldata,
      data: total,
    });
  } catch (e) {
    res.status(500).json({
      status: 'fail',
      message: 'Something went wrong!',
    });
  }
};



module.exports = {
  getRestaurant,
  getAllRestaurant,
  createRestaurant,
};
