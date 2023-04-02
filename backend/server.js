const path = require('path');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const COIN = require('./models/COIN');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static('dist'));
app.get('/', (req, res, next) => {
  res.sendFile(path.join(path.resolve(), 'dist', 'index.html'));
});
app.get('/api/coins', async (req, res, next) => {
  const coins = await COIN.find({});
  res.send(coins);
});

mongoose
  .connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, async () => {
      console.log('Server is running on port ', PORT);

      await COIN.deleteMany({}); // dev only

      //

      const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
      const data = response.data;

      // data is an objects containing many objects, get the first 10 objects and save them to the database
      const coins = Object.values(data).slice(0, 10);
      for (let coin of coins) {
        const newCoin = new COIN({
          name: coin.name,
          last: coin.last,
          buy: coin.buy,
          sell: coin.sell,
          volume: coin.volume,
          base_unit: coin.base_unit
        });

        await newCoin.save();
      }
    });
  })
  .catch((err) => {
    console.log(err);
  });
