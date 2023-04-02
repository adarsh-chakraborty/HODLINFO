const express = require('express');
const Router = express.Router();

const { getCoins } = require('../controllers/coinController');

// GET /api/coins
Router.get('/coins', getCoins);

module.exports = Router;
