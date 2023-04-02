const COIN = require('../models/COIN');
const getCoins = async (req, res, next) => {
  const coins = await COIN.find({});
  res.send(coins);
};

module.exports = { getCoins };
