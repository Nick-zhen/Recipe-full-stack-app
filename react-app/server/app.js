const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const indexRouter = require('./routes/index');
const userRouter = require('./routes/users');
const recipeRouter = require('./routes/recipes');
const colors = require('colors');
const app = express();
require("dotenv").config()

//initialize DB connection
const connectDB = require('./config/db');
connectDB();
// init middleware
app.use(cors());
app.use(logger('dev'));
// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//set static folder
app.use(express.static(path.join(__dirname, 'public')));
// homepage router
app.use('/', indexRouter);
// users Routes
app.use('/users', userRouter);
// recipes Routes
app.use('/recipes', recipeRouter);

module.exports = app;