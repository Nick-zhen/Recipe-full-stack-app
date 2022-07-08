const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc    Register new user
// @route   POST /users
// @access  Public
const registerUser = asyncHandler(async function (req, res) {
    if (!req.body.name) {
        return res.status(400).send({ message: 'User must have a name!' })
    }
    if (!req.body.password) {
        return res.status(400).send({ message: 'User must have a password!' })
    }
    // check if user exists
    const userExists = await User.findOne({name: req.body.name});

    if (userExists) {
        res.status(400)
        throw new Error('User already existed');
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create User
    const user = await User.create({
        name: req.body.name, 
        password: hashedPassword,
    })

    if (user) {
        res.status(201).send({
            _id: user._id,
            name: user.name,
            token: generateToken(user._id),
        });
    } else {
        res.status(400)
        throw new Error('Invalid user data');
    }
})

// @desc    Authenticate a user
// @route   POST /users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { name, password } = req.body
  
    // Check for user name
    const user = await User.findOne({ name })
  
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        name: user.name,
        token: generateToken(user._id),
      })
    } else {
      res.status(400)
      throw new Error('Invalid credentials')
    }
  })
  
// @desc    Get user data
// @route   GET /users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
})

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, 'abc123', {
        expiresIn: '30d',
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
}