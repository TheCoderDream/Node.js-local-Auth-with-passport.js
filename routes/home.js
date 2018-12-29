const express = require('express');
const router = express.Router();

const {
    getHomePage,
    getDashboardPage
} = require('../controllers/home');

router.get('/', getHomePage );

router.get('/dashboard', getDashboardPage);