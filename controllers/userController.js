const bcrypt = require('bcrypt');
const User = require('../model/userModel');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      status: 'fail',
      message: 'Name, Email, Password and Confirm password required!',
    });
  }
  try {
    const duplicateEmail = await User.findOne({ email: email });
    if (duplicateEmail) {
      return res.status(400).json({
        status: 'fail',
        message: 'Email already exists',
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
    });

    res.status(201).json({
      status: 'success',
      data: {
        user: {
          name: newUser.name,
          email: newUser.email,
          id: newUser._id,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: 'Something went wrong!',
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  // console.log(req.body);
  if (!email || !password) {
    return res.status(400).json({
      status: 'fail',
      message: 'Email & Password required!',
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'User not found',
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(403).json({
        status: 'fail',
        message: 'Incorrect email or password',
      });
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.JWT_TOKEN_EXPIRES_IN }
    );

    res.status(200).json({
      status: 'success',
      data: {
        user: {
          token: accessToken,
          _id: user._id,
          name: user.name,
          email: user.email,
          address: user.address,
          isVerified: user.isVerified,
          isAdmin: user.isAdmin,
          payments: user.payments,
          orderList: user.orderList,
          cartList: user.cartList,
          createdAt: user.createdAt,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: 'Something went wrong!',
    });
  }
};


const changePassword = async (req, res) => {
  const { id, password, confirmPassword } = req.body;

  if (!password || !confirmPassword) {
    return res.status(400).json({
      status: 'fail',
      message: 'All fields are required!',
    });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({
      status: 'fail',
      message: 'Password and Confirm password not match!',
    });
  }
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    await User.findOneAndUpdate(
      { _id: id },
      { $set: { password: hashPassword } }
    );
    res.status(200).json({
      status: 'success',
      message: 'Password changed successfully!',
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: 'Something went wrong!',
    });
  }
};

const logoutUser = async (req, res) => {
  // console.log(req.cookies.token);
  res.clearCookie('token').status(200).json({
    status: 'success',
    message: 'Logout successfully!',
  });
};


module.exports = {
  registerUser,
  loginUser,
  changePassword,
  logoutUser,
};
