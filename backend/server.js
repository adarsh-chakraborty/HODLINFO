const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const COIN = require('./models/COIN');
const app = express();

app.use(cors());
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
    app.listen(3000, async () => {
      console.log('Server is running on port 3000');

      await COIN.deleteMany({}); // dev only

      //

      const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
      const data = response.data;

      // data is an objects containing many objects, get the first 10 objects and save them to the database
      const coins = Object.values(data).slice(0, 10);
      console.log(coins);
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
