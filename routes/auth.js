const express = require('express');
const router = express.Router();
const bycrpty = require('bcryptjs');
const passport = require('passport');

const User = require('../models/User');

const {
    getLoginPage,
    getRegisterPage,
    registerPost,
    loginPost,
    logout
} = require('../controllers/auth');

router.get('/login', getLoginPage);

router.get('/register', getRegisterPage);

router.post('/register', registerPost);

router.post('/login', loginPost);

router.get('/logout', logout);