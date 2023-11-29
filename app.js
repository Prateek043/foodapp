const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
dotenv.config();

// Databse Url from .env file
const DB_URI = process.env.MONGO_URL;


const connectDB = async () => {
  try {
    const conn = await mongoose.connect(DB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const port = process.env.PORT || 2727;

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is listining at ${port}`);
  });
});

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/order', orderRoutes);
app.use('/api/v1/restaurant', restaurantRoutes);

app.all('*', (req, res) => {
  res.status(400).json({
    status: 'error',
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

module.exports = app;
